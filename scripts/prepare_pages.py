#!/usr/bin/env python3
'''Prepare static site for GitHub Pages. Standard library only.

Supports user sites https://OWNER.github.io/ and project sites
https://OWNER.github.io/REPOSITORY/.
'''
import argparse, html, json, os, re, shutil
from pathlib import Path
from urllib.parse import urlsplit

LANGS = ['en', 'es', 'ru', 'fr', 'de', 'uk', 'it', 'pt', 'hi', 'ja', 'bn', 'id', 'zh', 'ar']
LANG_CODES = set(LANGS)
ROOT_LINKS = {
    '/declaration': 'declaration.html',
    '/declaration/read': 'declaration_read.html',
    '/freedom': 'freedom.html',
    '/freedom/read': 'freedom_read.html',
}


def infer_site_url():
    repo = os.environ.get('GITHUB_REPOSITORY', '').strip()
    if '/' not in repo:
        raise SystemExit('Specify --site-url, or run inside a GitHub Actions workflow.')
    owner, name = repo.split('/', 1)
    if name.lower() == (owner + '.github.io').lower():
        return 'https://' + owner.lower() + '.github.io'
    return 'https://' + owner.lower() + '.github.io/' + name


def normalize(url):
    url=url.strip().rstrip('/')
    parts=urlsplit(url)
    if parts.scheme!='https' or not parts.netloc or parts.query or parts.fragment:
        raise SystemExit('--site-url must be HTTPS, e.g. https://username.github.io/my-site')
    return url


def replace_attribute(tag, key, value):
    pattern = r'\b' + re.escape(key) + r'=(["\']).*?\1'
    return re.sub(pattern, lambda m: key + '="' + html.escape(value, quote=True) + '"', tag, count=1, flags=re.I|re.S)


def set_metadata(text, relpath, site_url, site_files):
    path = relpath.as_posix()
    page_url = site_url+'/' + path
    if path == 'index.html':
        page_url = site_url+'/en/index.html'
    # Source links are root-absolute. Do not rewrite them to parent-directory paths.
    # Some language switcher options in the original English export still used
    # PHP-style root URLs. Rebuild every language URL from the .html file name.
    def fix_language_switch(m):
        try:
            old=json.loads(html.unescape(m.group(2)))
        except (ValueError, TypeError):
            return m.group(0)
        new={}
        for language_key in old:
            target_rel = Path(language_key) / relpath.name
            if target_rel in site_files:
                new[language_key] = '/'+target_rel.as_posix()
            else:
                new[language_key] = '/'+language_key+'/index.html'
        return 'data-language-urls="'+html.escape(json.dumps(new,ensure_ascii=False),quote=True)+'"'
    text=re.sub(r'data-language-urls=(["\'])(.*?)\1',fix_language_switch,text,flags=re.S)

    # Remove placeholder runtime tags; deploy time creates crawlable absolute SEO URLs.
    text=re.sub(r'<link\b[^>]*\brel=["\'](?:canonical|alternate)["\'][^>]*>', '', text, flags=re.I)
    seo_links='<link rel="canonical" href="'+html.escape(page_url,quote=True)+'"/>'
    for code in ['x-default'] + LANGS:
        langcode = 'en' if code == 'x-default' else code
        target_rel = Path(langcode) / relpath.name
        if target_rel in site_files:
            target = site_url+'/'+target_rel.as_posix()
            seo_links += '<link rel="alternate" hreflang="'+code+'" href="'+html.escape(target,quote=True)+'"/>'
    text=text.replace('</head>', seo_links+'</head>', 1)
    # Convert the metadata from a PHP origin to the actual static HTML files.
    def link_update(m):
        tag=m.group(0)
        if re.search(r'\brel=["\']canonical["\']',tag,re.I):
            return replace_attribute(tag,'href',page_url)
        if re.search(r'\brel=["\']alternate["\']',tag,re.I):
            hreflang = re.search(r'\bhreflang=(["\'])(.*?)\1', tag, re.I)
            if hreflang:
                l=hreflang.group(2)
                l='en' if l=='x-default' else l
                if l in LANG_CODES:
                    target = 'index.html' if path=='index.html' else relpath.name
                    target_rel = Path(l)/target
                    if target_rel in site_files:
                        return replace_attribute(tag,'href',site_url+'/'+target_rel.as_posix())
        return tag
    text=re.sub(r'<link\b[^>]*>',link_update,text,flags=re.I)

    def meta_update(m):
        tag=m.group(0)
        prop=re.search(r'\bproperty=(["\'])(.*?)\1',tag,re.I)
        name=re.search(r'\bname=(["\'])(.*?)\1',tag,re.I)
        kind=(prop.group(2) if prop else name.group(2) if name else '').lower()
        if kind=='og:url':
            return replace_attribute(tag,'content',page_url)
        if kind in ('og:image','twitter:image'):
            old=re.search(r'\bcontent=(["\'])(.*?)\1',tag,re.I)
            if old:
                old_url=html.unescape(old.group(2))
                suffix=urlsplit(old_url).path
                if '/assets/' in suffix:
                    asset=suffix[suffix.index('/assets/')+1:]
                    if Path(asset) not in site_files:
                        asset='assets/og/home.jpg'
                    return replace_attribute(tag,'content',site_url+'/'+asset)
        return tag
    text=re.sub(r'<meta\b[^>]*>',meta_update,text,flags=re.I)

    # Keep Schema.org URL and image fields in sync with canonical metadata.
    def jsonld_update(m):
        body=m.group(2)
        try:
            obj=json.loads(body)
        except Exception:
            return m.group(0)
        def visit(o):
            if isinstance(o,dict):
                for k,v in list(o.items()):
                    if k=='url' and isinstance(v,str):
                        if o.get('@type')=='WebSite':
                            o[k]=site_url+'/'
                        elif o is obj or v.endswith('github.io') or not v.startswith(('https://','http://')):
                            o[k]=page_url
                    elif k=='image' and isinstance(v,str) and '/assets/' in v:
                        seg=v[v.index('/assets/')+1:]
                        o[k]=site_url+'/'+(seg if Path(seg) in site_files else 'assets/og/home.jpg')
                    else: visit(v)
            elif isinstance(o,list):
                for v in o: visit(v)
        visit(obj)
        return m.group(1)+json.dumps(obj,ensure_ascii=False,separators=(',',':'))+m.group(3)
    text=re.sub(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)',jsonld_update,text,flags=re.I|re.S)
    # Dynamic year in footer: source script already updates data-current-year elements.
    text=re.sub(r'©\s*2026(?!\d)', '© <span data-current-year>2026</span>',text)
    return text


def add_deployment_prefix(text, prefix):
    """Prefix root-absolute paths for GitHub Pages project deployments.

    Source HTML always uses /en/ and /assets/. A project site needs
    /repo/en/ and /repo/assets/ on the published site. Absolute URLs
    to third-party services are never changed.
    """
    if not prefix: return text
    def attr_replacer(m):
        val=m.group(3)
        if val.startswith('/') and not val.startswith('//'):
            return m.group(1)+m.group(2)+prefix+val+m.group(2)
        return m.group(0)
    text=re.sub(r'(\b(?:href|src|poster|action|content)\s*=\s*)(["\'])(/[^"\']*)\2',attr_replacer,text,flags=re.I)
    def change_url(m):
        path=m.group(2).strip()
        if path.startswith('/') and not path.startswith('//'):
            return 'url('+m.group(1)+prefix+path+m.group(1)+')'
        return m.group(0)
    text=re.sub(r'url\(\s*(["\']?)([^)"\']+)\1\s*\)',change_url,text,flags=re.I)
    def switch(m):
        try:values=json.loads(html.unescape(m.group(2)))
        except Exception:return m.group(0)
        values={k:prefix+v if isinstance(v,str) and v.startswith('/') and not v.startswith('//') else v for k,v in values.items()}
        return 'data-language-urls="'+html.escape(json.dumps(values,ensure_ascii=False),quote=True)+'"'
    text=re.sub(r'data-language-urls=(["\'])(.*?)\1',switch,text,flags=re.S)
    return text


def main():
    parser=argparse.ArgumentParser(description='Build GitHub Pages ready site with SEO metadata.')
    parser.add_argument('--source',default='.',help='Original repository folder')
    parser.add_argument('--dest',default='_site',help='Public site output folder')
    parser.add_argument('--site-url',default='',help='Optional override, e.g. https://me.github.io/my-project')
    args=parser.parse_args()
    source=Path(args.source).resolve();dest=Path(args.dest).resolve()
    if dest == source or source in dest.parents and dest.name == '.':
        raise SystemExit('Destination must be separate from source')
    url=normalize(args.site_url or os.environ.get('CUSTOM_SITE_URL','') or infer_site_url())
    if dest.exists(): shutil.rmtree(dest)
    dest.mkdir(parents=True)
    for sub in ['en', 'es', 'ru', 'fr', 'de', 'uk', 'it', 'pt', 'hi', 'ja', 'bn', 'id', 'zh', 'ar', 'assets', 'Screenshots', 'art']:
        source_dir=source/sub
        if source_dir.exists():
            shutil.copytree(source_dir,dest/sub)
    site_files={p.relative_to(dest) for p in dest.rglob('*') if p.is_file()}
    # For project sites, CSS root-absolute /assets/... backgrounds must
    # resolve inside the published /repository/ path too.
    deployment_prefix=urlsplit(url).path.rstrip('/')
    if deployment_prefix:
        for sheet in (dest/'assets/css').glob('*.css'):
            css=sheet.read_text(encoding='utf-8')
            sheet.write_text(add_deployment_prefix(css, deployment_prefix),encoding='utf-8')
    # Root redirect points to the English homepage.
    root='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0; url={base}/en/index.html"><link rel="canonical" href="{url}/en/index.html"><title>After Death — The Right to Choose</title></head><body><p><a href="{base}/en/index.html">Open the website</a></p></body></html>'''
    (dest/'index.html').write_text(root.format(url=html.escape(url,quote=True),base=html.escape(deployment_prefix,quote=True)),encoding='utf-8')
    site_files.add(Path('index.html'))
    count=0
    for p in sorted(dest.rglob('*.html')):
        if p==dest/'index.html': continue
        rel=p.relative_to(dest)
        result=set_metadata(p.read_text(encoding='utf-8'), rel, url, site_files)
        result=add_deployment_prefix(result, urlsplit(url).path.rstrip('/'))
        p.write_text(result,encoding='utf-8');count+=1
    # Explicit URLs to .html files, which GitHub Pages actually serves without mod_rewrite.
    pages=sorted((p.relative_to(dest).as_posix() for p in dest.rglob('*.html') if p!=dest/'index.html'))
    sitemap='''<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'''
    for p in pages:
        sitemap+='  <url><loc>'+html.escape(url+'/'+p)+'</loc></url>\n'
    sitemap+='</urlset>\n'
    (dest/'sitemap.xml').write_text(sitemap,encoding='utf-8')
    # In project sites, /repo/robots.txt is not the domain-level robots file; sitemap remains useful.
    (dest/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+url+'/sitemap.xml\n',encoding='utf-8')
    (dest/'.nojekyll').write_text('',encoding='utf-8')
    not_found='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page Not Found — 404</title></head><body style="margin:0;background:#03101d;color:#f5e5c3;font:18px/1.5 Georgia,serif;display:grid;min-height:100vh;place-items:center"><main style="padding:24px;text-align:center"><h1>404 — Page Not Found</h1><p>Check the URL or return to the homepage.</p><p><a style="color:#edbf69" href="'''+url+'''/en/index.html">Go to the English homepage</a></p></main></body></html>'''
    (dest/'404.html').write_text(not_found,encoding='utf-8')
    print('Prepared', count, 'localized pages; public site:',url)

if __name__=='__main__':main()
