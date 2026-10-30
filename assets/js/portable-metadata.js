/* Portable metadata: adapts to any hostname, custom domain, or repository subpath. */
(function(){
  'use strict';
  const locales=['en','es','ru','fr','de','uk','it','pt','hi','ja','bn','id','zh','ar'];
  const segments=location.pathname.split('/').filter(Boolean);
  const localeIndex=segments.findIndex(s=>locales.includes(s));
  if(localeIndex<0) return;
  const prefix='/' + segments.slice(0,localeIndex).join('/') + (localeIndex ? '/' : '');
  const file=segments[localeIndex+1]||'index.html';
  const root=location.origin + prefix;
  const canonical=location.href.split('#')[0].split('?')[0];
  const head=document.head;
  let can=head.querySelector('link[rel="canonical"]');
  if(!can){can=document.createElement('link');can.rel='canonical';head.appendChild(can)}
  can.href=canonical;
  locales.concat('x-default').forEach(code=>{
    let link=head.querySelector('link[rel="alternate"][hreflang="'+code+'"]');
    if(!link){link=document.createElement('link');link.rel='alternate';link.hreflang=code;head.appendChild(link)}
    link.href=root+(code==='x-default'?'en':code)+'/'+file;
  });
  const meta=(attr,key,url)=>{
    const tag=head.querySelector('meta['+attr+'="'+key+'"]');
    if(tag) tag.content=url;
  };
  meta('property','og:url',canonical);
  ['og:image','twitter:image'].forEach(key=>{
    const attr=key==='og:image'?'property':'name';
    const tag=head.querySelector('meta['+attr+'="'+key+'"]');
    if(!tag)return;
    const match=(tag.getAttribute('content')||'').match(/assets\/(?:og|img)\/[^?#]+/);
    if(match)tag.content=root+match[0];
  });
  head.querySelectorAll('script[type="application/ld+json"]').forEach(tag=>{
    try{
      const data=JSON.parse(tag.textContent);
      const walk=(o)=>{
        if(!o || typeof o!=='object')return;
        if(Array.isArray(o)){o.forEach(walk);return}
        for(const key of Object.keys(o)){
          let val=o[key];
          if(key==='url' && typeof val==='string')o[key]=o['@type']==='WebSite'?root:canonical;
          else if(key==='image'&&typeof val==='string'){
            const m=val.match(/assets\/(?:og|img)\/[^?#]+/);
            if(m)o[key]=root+m[0];
          }else walk(val);
        }
      };walk(data);tag.textContent=JSON.stringify(data);
    }catch(err){}
  });
})();
