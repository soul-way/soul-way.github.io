/* Soul Way: no jQuery required. Bootstrap 5.3.8 layout, plain JS image loader. */
(() => {
  'use strict';
  const LOCALES = {"en":{"name":"English","flag":"EN","art":"Light","dark":"Dark","language":"Language","heading":"THE JOURNEY OF THE SOUL","cards":"12 CARDS","card":"CARD","all":"ALL 12 CARDS","tap":"Choose a card or swipe to explore","meeting":"WHO MEETS THE SOUL","video":"Video","reptilians":"Reptilians & Archons","loading":"Loading card…","missing":"Image not found","full":"Enter fullscreen","exit":"Exit fullscreen","previous":"Previous card","next":"Next card"},"ru":{"name":"Русский","flag":"RU","art":"Светлые","dark":"Тёмные","language":"Язык","heading":"ПУТЬ ДУШИ","cards":"12 КАРТ","card":"КАРТА","all":"ВСЕ 12 КАРТ","tap":"Выберите карту или листайте свайпом","meeting":"КТО ВСТРЕЧАЕТ ДУШУ","video":"Видео","reptilians":"Рептилоиды и архонты","loading":"Загрузка карты…","missing":"Изображение не найдено","full":"На весь экран","exit":"Выйти из полноэкранного режима","previous":"Предыдущая карта","next":"Следующая карта"},"fr":{"name":"Français","flag":"FR","art":"Claires","dark":"Sombres","language":"Langue","heading":"LE VOYAGE DE L’ÂME","cards":"12 CARTES","card":"CARTE","all":"LES 12 CARTES","tap":"Choisissez une carte ou balayez","meeting":"QUI ACCUEILLE L’ÂME","video":"Vidéo","reptilians":"Reptiliens et archontes","loading":"Chargement…","missing":"Image introuvable","full":"Plein écran","exit":"Quitter le plein écran","previous":"Carte précédente","next":"Carte suivante"},"es":{"name":"Español","flag":"ES","art":"Claras","dark":"Oscuras","language":"Idioma","heading":"EL VIAJE DEL ALMA","cards":"12 CARTAS","card":"CARTA","all":"LAS 12 CARTAS","tap":"Elige una carta o desliza","meeting":"QUIÉN RECIBE AL ALMA","video":"Vídeo","reptilians":"Reptilianos y arcontes","loading":"Cargando…","missing":"Imagen no encontrada","full":"Pantalla completa","exit":"Salir de pantalla completa","previous":"Carta anterior","next":"Carta siguiente"},"pt":{"name":"Português","flag":"PT","art":"Claras","dark":"Escuras","language":"Idioma","heading":"A JORNADA DA ALMA","cards":"12 CARTAS","card":"CARTA","all":"AS 12 CARTAS","tap":"Escolha uma carta ou deslize","meeting":"QUEM RECEBE A ALMA","video":"Vídeo","reptilians":"Reptilianos e arcontes","loading":"Carregando…","missing":"Imagem não encontrada","full":"Tela cheia","exit":"Sair da tela cheia","previous":"Carta anterior","next":"Próxima carta"},"de":{"name":"Deutsch","flag":"DE","art":"Hell","dark":"Dunkel","language":"Sprache","heading":"DIE REISE DER SEELE","cards":"12 KARTEN","card":"KARTE","all":"ALLE 12 KARTEN","tap":"Karte wählen oder wischen","meeting":"WER EMPFÄNGT DIE SEELE","video":"Video","reptilians":"Reptiloide & Archonten","loading":"Lädt…","missing":"Bild nicht gefunden","full":"Vollbild","exit":"Vollbild beenden","previous":"Vorherige Karte","next":"Nächste Karte"},"it":{"name":"Italiano","flag":"IT","art":"Chiare","dark":"Scure","language":"Lingua","heading":"IL VIAGGIO DELL’ANIMA","cards":"12 CARTE","card":"CARTA","all":"TUTTE LE 12 CARTE","tap":"Scegli una carta o scorri","meeting":"CHI ACCOGLIE L’ANIMA","video":"Video","reptilians":"Rettiliani e arconti","loading":"Caricamento…","missing":"Immagine non trovata","full":"Schermo intero","exit":"Esci da schermo intero","previous":"Carta precedente","next":"Carta successiva"},"ar":{"name":"العربية","flag":"AR","art":"فاتحة","dark":"داكنة","language":"اللغة","heading":"رحلة الروح","cards":"١٢ بطاقة","card":"البطاقة","all":"جميع البطاقات الـ١٢","tap":"اختر بطاقة أو اسحب للتصفح","meeting":"من يستقبل الروح؟","video":"فيديو","reptilians":"الزواحف والأركونات","loading":"جارٍ التحميل…","missing":"الصورة غير موجودة","full":"ملء الشاشة","exit":"الخروج من ملء الشاشة","previous":"البطاقة السابقة","next":"البطاقة التالية"},"zh":{"name":"中文（简体）","flag":"ZH","art":"明亮","dark":"深色","language":"语言","heading":"灵魂之旅","cards":"12 张卡片","card":"卡片","all":"全部 12 张卡片","tap":"选择卡片或左右滑动","meeting":"谁迎接灵魂","video":"视频","reptilians":"爬虫人与执政官","loading":"正在加载…","missing":"找不到图片","full":"全屏","exit":"退出全屏","previous":"上一张","next":"下一张"},"ja":{"name":"日本語","flag":"JA","art":"ライト","dark":"ダーク","language":"言語","heading":"魂の旅","cards":"12 枚のカード","card":"カード","all":"全12枚","tap":"カードを選ぶかスワイプ","meeting":"魂を迎えるのは誰か","video":"動画","reptilians":"レプティリアンとアルコン","loading":"読み込み中…","missing":"画像が見つかりません","full":"全画面","exit":"全画面を終了","previous":"前のカード","next":"次のカード"},"hi":{"name":"हिन्दी","flag":"HI","art":"उजले","dark":"गहरे","language":"भाषा","heading":"आत्मा की यात्रा","cards":"12 कार्ड","card":"कार्ड","all":"सभी 12 कार्ड","tap":"कार्ड चुनें या स्वाइप करें","meeting":"आत्मा का स्वागत कौन करता है?","video":"वीडियो","reptilians":"रेप्टिलियन और आर्कॉन","loading":"लोड हो रहा है…","missing":"चित्र नहीं मिला","full":"पूर्ण स्क्रीन","exit":"पूर्ण स्क्रीन से बाहर","previous":"पिछला कार्ड","next":"अगला कार्ड"},"uk":{"name":"Українська","flag":"UK","art":"Світлі","dark":"Темні","language":"Мова","heading":"ШЛЯХ ДУШІ","cards":"12 КАРТ","card":"КАРТА","all":"УСІ 12 КАРТ","tap":"Оберіть карту або гортайте","meeting":"ХТО ЗУСТРІЧАЄ ДУШУ","video":"Відео","reptilians":"Рептилоїди й архонти","loading":"Завантаження…","missing":"Зображення не знайдено","full":"На весь екран","exit":"Вийти з повноекранного режиму","previous":"Попередня карта","next":"Наступна карта"},"bn":{"name":"বাংলা","flag":"BN","art":"উজ্জ্বল","dark":"গাঢ়","language":"ভাষা","heading":"আত্মার যাত্রা","cards":"১২টি কার্ড","card":"কার্ড","all":"সব ১২টি কার্ড","tap":"কার্ড বেছে নিন বা সোয়াইপ করুন","meeting":"আত্মাকে কে স্বাগত জানায়","video":"ভিডিও","reptilians":"রেপটিলিয়ান ও আর্কন","loading":"লোড হচ্ছে…","missing":"ছবি পাওয়া যায়নি","full":"পূর্ণ পর্দা","exit":"পূর্ণ পর্দা থেকে বের হন","previous":"আগের কার্ড","next":"পরের কার্ড"},"id":{"name":"Bahasa Indonesia","flag":"ID","art":"Terang","dark":"Gelap","language":"Bahasa","heading":"PERJALANAN JIWA","cards":"12 KARTU","card":"KARTU","all":"KE-12 KARTU","tap":"Pilih kartu atau geser","meeting":"SIAPA YANG MENYAMBUT JIWA","video":"Video","reptilians":"Reptilian dan Archon","loading":"Memuat…","missing":"Gambar tidak ditemukan","full":"Layar penuh","exit":"Keluar dari layar penuh","previous":"Kartu sebelumnya","next":"Kartu berikutnya"}};
  const N=12;
  const root=document.documentElement;
  const lang=Object.hasOwn(LOCALES,root.dataset.lang)?root.dataset.lang:'en';
  const t=LOCALES[lang];
  const theme=root.dataset.theme==='art'?'art':'artgold';
  const $=id=>document.getElementById(id);
  const player=$('player'),image=$('cardImage'),stage=$('stage'),status=$('imageStatus');
  const row=$('thumbnailRow'),sel=$('language'),counter=$('cardCounter'),cardLabel=$('cardLabel');
  const cache=new Map(),failures=new Set();
  const descriptions=window.SOUL_CARD_DESCRIPTIONS?.[lang]||window.SOUL_CARD_DESCRIPTIONS?.en||[];
  const actionLabels=window.SOUL_UI_ACTIONS?.[lang]||window.SOUL_UI_ACTIONS?.en||[];
  let current=Math.max(1,Math.min(12,Number.parseInt(new URLSearchParams(location.search).get('c')||new URLSearchParams(location.search).get('card')||'1',10)||1));
  let activeRequest=0, startedBackground=false, fakeFull=false;
  const fileName=(code,mode)=> (mode==='art'?'index2':'index')+(code==='en'?'':'-'+code)+'.html';
  const pageUrl=(code,mode)=>fileName(code,mode)+'?c='+current;
  // Theme links must track the LIVE card number, not only the initial URL.
  // This also keeps middle-click, Ctrl/Cmd-click, and Copy link address correct.
  function syncThemeLinks(){
    $('lightLink').href=pageUrl(lang,'artgold');
    $('darkLink').href=pageUrl(lang,'art');
  }
  const num=i=>String(i).padStart(2,'0');
  const possiblePaths=i=>{
    const f='soul'+num(i)+'.jpg';
    // Preferred user's site structure: /Screenshots/en/artgold/soul01.jpg
    return ['/Screenshots/'+lang+'/'+theme+'/'+f,'/Screenshots/'+theme+'/'+lang+'/'+f,'/Screenshots/'+theme+'/'+f];
  };
  function imageAttempt(url,priority){return new Promise((resolve,reject)=>{
    const img=new Image();img.decoding='async';
    if ('fetchPriority' in img) img.fetchPriority=priority?'high':'low';
    img.onload=()=>resolve(url);img.onerror=()=>reject(Error('Missing '+url));img.src=url;
  });}
  // Every JPG already contains its printed card number. Never add numeric badges over images.
  // Each card has a single shared promise, so thumbnails and slides reuse the same downloaded JPEG.
  function load(i,priority=false){
    if(cache.has(i))return cache.get(i);
    const promise=(async()=>{
      let err;
      for(const url of possiblePaths(i)){
        try {const ok=await imageAttempt(url,priority);updateThumb(i,ok);return ok;}
        catch(e){err=e;}
      }
      failures.add(i);markMissingThumb(i);throw err;
    })();
    cache.set(i,promise);return promise;
  }
  const thumbs=new Map();
  function buildThumbnails(){for(let i=1;i<=N;i++){
    const b=document.createElement('button');b.type='button';b.className='thumb';
    b.title=t.card+' '+i;b.setAttribute('aria-label',t.card+' '+i);
    b.innerHTML='<span class="thumb-placeholder" aria-hidden="true"></span>';
    b.addEventListener('click',()=>show(i));row.appendChild(b);thumbs.set(i,b);
  }updateThumbSelected();}
  function updateThumbSelected(){for(const [i,b] of thumbs){b.setAttribute('aria-current',i===current?'true':'false');}}
  function updateThumb(i,url){const b=thumbs.get(i);if(!b||b.querySelector('img'))return;
    const img=document.createElement('img');img.src=url;img.alt='';img.loading='lazy';img.decoding='async';
    b.querySelector('.thumb-placeholder')?.remove();b.prepend(img);
  }
  function markMissingThumb(i){const b=thumbs.get(i);if(b)b.title=t.missing+' — '+possiblePaths(i)[0];}
  function message(kind,path){status.hidden=false;
    if(kind==='loading')status.innerHTML='<span class="spinner-border" role="status" aria-hidden="true"></span><p>'+escapeText(t.loading)+'</p>';
    else status.innerHTML='<p>'+escapeText(t.missing)+'</p><small>'+escapeText(path)+'</small>';
  }
  function escapeText(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function updateCounter(){
    counter.textContent=num(current)+' / 12'; cardLabel.textContent=t.card+' '+num(current);
    const desc=descriptions[current-1]||'';
    $('cardDescription').textContent=desc;
    $('cardDescription').scrollTop=0;
    image.alt=t.card+' '+current+': '+desc;
    $('shareCard').title=actionLabels[0]||'Share';
    $('downloadCard').setAttribute('download','soul'+num(current)+'.jpg');
    updateThumbSelected();
  }
  function show(i,updateHistory=true){
    current=((i-1+N)%N)+1;const request=++activeRequest;updateCounter();syncThemeLinks();
    const params=new URLSearchParams(location.search);
    params.set('c',String(current));params.delete('card');
    history.replaceState(null,'',location.pathname+'?'+params.toString()+location.hash);
    image.classList.remove('is-ready');message('loading');
    load(current,true).then(url=>{
      if(request!==activeRequest)return;
      image.onload=()=>{if(request===activeRequest){image.classList.add('is-ready');status.hidden=true;startBackgroundPreload();}};
      image.onerror=()=>{if(request===activeRequest)message('error',url);};
      image.src=url;
      $('downloadCard').href=url;
      if(image.complete&&image.naturalWidth){image.classList.add('is-ready');status.hidden=true;startBackgroundPreload();}
      
    }).catch(()=>{if(request===activeRequest)message('error',possiblePaths(current)[0]);});
  }
  function startBackgroundPreload(){ if(startedBackground)return;startedBackground=true;setTimeout(backgroundLoads,90); }
  async function backgroundLoads(){
    // First render has finished. Neighbors first to make immediate arrow navigation feel quick.
    const order=[current%N+1,(current+N-2)%N+1];
    for(let i=1;i<=N;i++)if(i!==current&&!order.includes(i))order.push(i);
    let next=0;
    async function worker(){while(next<order.length){const i=order[next++];
      if(i!==current){try{await load(i,false);}catch(_){/* missing optional image */}}
      // Deliberately yield to rendering/user input between large JPG loads.
      await new Promise(r=>setTimeout(r,75));
    }}
    await Promise.all([worker(),worker()]);
  }
  // Image-first sizing: only reveal the two-line text when it fits *without* reducing
  // the square photo below its width-limited size. Short screens show no caption.
  const cardDescriptionBox=document.querySelector('.card-description');
  const captionHeight=()=>matchMedia('(max-width:600px)').matches?37:46;
  // The gold images are square 3000 × 3000; dark blue images are landscape 3000 × 2250.
  // Preserve these proportions in the stage, all thumbnails, grid view and fullscreen.
  const cardRatio=(theme==='art')?4/3:1;
  function setSize(){
    const p=player.getBoundingClientRect();
    if(!p.width||!p.height)return;
    const shown=cardDescriptionBox?.classList.contains('is-visible');
    const fullRoom=p.height+(shown?cardDescriptionBox.getBoundingClientRect().height:0);
    const maxW=(theme==='art'?1320:1100);
    const widthLimited=Math.min(maxW,Math.max(42,p.width-8));
    const shouldShow=!isFull() && fullRoom >= widthLimited/cardRatio+captionHeight()+12 && innerHeight>=520;
    if(cardDescriptionBox)cardDescriptionBox.classList.toggle('is-visible',shouldShow);
    const available=player.getBoundingClientRect();
    const width=Math.max(42,Math.min(maxW,available.width-4,(available.height-4)*cardRatio));
    const height=width/cardRatio;
    const arrowWidth=(innerWidth<=600?35:44);
    const roomEachSide=(available.width-width)/2;
    // Outside arrows whenever there is enough side clearance for the entire control.
    const arrowsOutside=roomEachSide>=arrowWidth+13;
    player.classList.toggle('arrows-outside',arrowsOutside);
    // The photo itself is an action ONLY when both arrows are OUTSIDE it.
    // If arrows overlap the graphic, tapping the photo does nothing.
    updatePhotoTapAffordance(arrowsOutside && !isFull());
    player.style.setProperty('--card-w',width+'px');
    player.style.setProperty('--card-h',height+'px');
    player.style.setProperty('--card-size',width+'px');
    player.style.setProperty('--arrow-width',arrowWidth+'px');
    updateBottomFullscreenVisibility();
  }
  function updatePhotoTapAffordance(enabled){
    // Make the accessible/keyboard semantics match touch and mouse behavior.
    stage.dataset.tapFullscreen=enabled?'true':'false';
    if(enabled){
      stage.setAttribute('role','button');
      stage.setAttribute('tabindex','0');
      stage.setAttribute('aria-label',t.full);
    } else {
      stage.removeAttribute('role');
      stage.removeAttribute('tabindex');
      stage.removeAttribute('aria-label');
    }
  }
  // Do not decide visibility by phone model or viewport height: the unfolded
  // screen has room for three actions, even if its CSS height is small.
  function updateBottomFullscreenVisibility(){
    const panel=document.querySelector('.action-panel');
    const full=$('fullBtnBottom');
    if(!panel||!full)return;
    const share=$('shareCard'),download=$('downloadCard');
    const style=getComputedStyle(panel);
    const gap=parseFloat(style.columnGap||style.gap)||0;
    const inset=(parseFloat(style.paddingLeft)||0)+(parseFloat(style.paddingRight)||0);
    const iconWidth=innerWidth<=600?36:40;
    const required=share.getBoundingClientRect().width+download.getBoundingClientRect().width+iconWidth+gap*2+inset;
    panel.classList.toggle('has-fullscreen-room',panel.clientWidth >= required-1);
  }
  function syncFullscreenUI(){
    const title=isFull()?t.exit:t.full;
    for(const id of ['fullBtn','fullBtnBottom']){
      const btn=$(id);if(btn){btn.title=title;btn.setAttribute('aria-label',title);}
    }
  }
  function scrollActiveThumb(){const b=thumbs.get(current);if(b)b.scrollIntoView({behavior:'smooth',inline:'nearest',block:'nearest'});}
  async function enterFull(){
    try {if(player.requestFullscreen){await player.requestFullscreen();setSize();syncFullscreenUI();return;}}
    catch(e){/* Some mobile browsers disallow the Fullscreen API */}
    fakeFull=true;document.body.classList.add('immersive');setSize();syncFullscreenUI();
  }
  async function exitFull(){if(document.fullscreenElement){try{await document.exitFullscreen();}catch(_){}}
    fakeFull=false;document.body.classList.remove('immersive');setSize();syncFullscreenUI();}
  function isFull(){return !!document.fullscreenElement||fakeFull;}
  function localizedButtons(){
    $('heroCaption').textContent=t.heading+' · '+t.cards;
    $('thumbnailsHeading').textContent=t.all;
    $('lightText').textContent=t.art;$('darkText').textContent=t.dark;
    // Theme labels may be hidden visually on the narrowest phones.
    // Keep full localized names available to screen readers and long-press tooltips.
    $('lightLink').setAttribute('aria-label',t.art);
    $('darkLink').setAttribute('aria-label',t.dark);
    $('lightLink').title=t.art;
    $('darkLink').title=t.dark;
    // Both wide desktop navigation and compact mobile shortcuts share these localized links.
    const navLabels=window.SOUL_NAV_LABELS?.[lang]||window.SOUL_NAV_LABELS?.en||{};
    const targets={home:'/',journey:`/${lang}/journey.html`,meeting:`/${lang}/meeting.html`,reptilians:`/${lang}/reptilians.html`,about:`/${lang}/about.html`};
    for(const el of document.querySelectorAll('[data-nav]')){
      const id=el.dataset.nav;
      if(targets[id])el.href=targets[id];
      const span=el.querySelector('[data-nav-label]');
      if(span)span.textContent=navLabels[id]||id;
    }
    const more=document.querySelector('.footer-more-trigger');
    if(more){more.setAttribute('aria-label',navLabels.more||'More pages');more.title=navLabels.more||'More pages';}

    $('fullBtn').title=t.full;$('fullBtn').setAttribute('aria-label',t.full);
    const bottomFull=$('fullBtnBottom');if(bottomFull){bottomFull.title=t.full;bottomFull.setAttribute('aria-label',t.full);}
    $('exitFull').title=t.exit;$('exitFull').setAttribute('aria-label',t.exit);
    $('prev').setAttribute('aria-label',t.previous);$('next').setAttribute('aria-label',t.next);
    document.title='Soul Way — '+t.heading;
    syncThemeLinks();
    for(const [id,mode] of [['lightLink','artgold'],['darkLink','art']]){
      const el=$(id);el.classList.toggle('active',theme===mode);
      if(theme===mode)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
    }
  }
  function setupLanguagePicker(){
    for(const [code,dict] of Object.entries(LOCALES)){
      const op=document.createElement('option');op.value=code;op.textContent=dict.name;op.selected=(code===lang);sel.appendChild(op);
    }
    sel.setAttribute('aria-label',t.language);
    sel.addEventListener('change',()=>{location.assign(pageUrl(sel.value,theme));});
  }
  $('shareCardLabel').textContent=actionLabels[0]||'Share';
  $('downloadCardLabel').textContent=actionLabels[1]||'Download JPG';
  $('descriptionHeading').textContent=actionLabels[4]||'About the card';
  const toast=$('actionFeedback'); let toastHandle=0;
  function feedback(message){ toast.textContent=message; toast.hidden=false; clearTimeout(toastHandle);toastHandle=setTimeout(()=>toast.hidden=true,2600); }
  function directUrl(){return new URL(location.pathname+'?c='+current,location.origin).href;}
  function previewUrl(){return new URL('/art/share/'+lang+'/'+theme+'/'+num(current)+'.html',location.origin).href;}
  $('shareCard').addEventListener('click',async()=>{
    // Share a static preview URL with an image per card. Visitors are redirected to ?c=N.
    const url=previewUrl(); const data={title:document.title+' — '+t.card+' '+current,text:descriptions[current-1]||'',url};
    if(navigator.share){
      try {await navigator.share(data);return;}catch(err){if(err?.name==='AbortError')return;}
    }
    try {await navigator.clipboard.writeText(url);feedback(actionLabels[2]||'Link copied');}
    catch(err){
      const promptText=actionLabels[3]||'Copy link';
      try{window.prompt(promptText,url);}catch(_){feedback(promptText+': '+url);}
    }
  });
  $('downloadCard').addEventListener('click',ev=>{
    if(!$('downloadCard').getAttribute('href')){ev.preventDefault();feedback(t.loading);}
  });
  $('prev').addEventListener('click' ,()=>{show(current-1);scrollActiveThumb();});
  $('next').addEventListener('click',()=>{show(current+1);scrollActiveThumb();});
  $('fullBtn').addEventListener('click',()=>{isFull()?exitFull():enterFull();});
  $('fullBtnBottom')?.addEventListener('click',()=>{isFull()?exitFull():enterFull();});
  // STRICT rule: only an OUTSIDE-arrows layout lets the photograph open
  // fullscreen. With INSIDE arrows, tapping the photograph has NO effect.
  // The fullscreen toolbar buttons work independently in either layout.
  let suppressTapUntil=0;
  stage.addEventListener('click',()=>{
    if(isFull()||overviewOpen||performance.now()<suppressTapUntil)return;
    if(stage.dataset.tapFullscreen==='true')enterFull();
  });
  stage.addEventListener('keydown',ev=>{
    if(stage.dataset.tapFullscreen==='true' && !isFull() && (ev.key==='Enter'||ev.key===' ')){
      ev.preventDefault();enterFull();
    }
  });
  $('exitFull').addEventListener('click',exitFull);
  document.addEventListener('fullscreenchange',()=>{setSize();syncFullscreenUI();});
  document.addEventListener('keydown',ev=>{
    if(ev.target?.matches?.('select,input,textarea,button,a')||ev.altKey||ev.ctrlKey||ev.metaKey)return;
    if(ev.key==='ArrowRight'){show(current+1);scrollActiveThumb();ev.preventDefault();}
    else if(ev.key==='ArrowLeft'){show(current-1);scrollActiveThumb();ev.preventDefault();}
    else if(ev.key==='Escape'&&fakeFull){exitFull();}
  });
  let x0=null,y0=null;
  stage.addEventListener('pointerdown',ev=>{if(ev.pointerType==='touch'||ev.pointerType==='pen'){x0=ev.clientX;y0=ev.clientY;}});
  stage.addEventListener('pointerup',ev=>{if(x0===null)return;const dx=ev.clientX-x0,dy=ev.clientY-y0;x0=y0=null;
    if(Math.abs(dx)>43&&Math.abs(dx)>Math.abs(dy)*1.25){
      suppressTapUntil=performance.now()+650;
      show(current+(dx<0?1:-1));scrollActiveThumb();
    }
  });
  window.addEventListener('popstate',()=>{const i=parseInt(new URLSearchParams(location.search).get('c')||new URLSearchParams(location.search).get('card'),10)||1;if(i!==current)show(i,false);});

  // Accessible full-grid "ALL 12 CARDS" mode. Use shared URL image cache for previews and full cards.
  const overview=$('allCardsView'),overviewGrid=$('allCardsGrid'),overviewViewport=$('allCardsViewport');
  let overviewOpen=false,overviewBuilt=false,overviewFocus=null;
  const overviewTiles=new Map();
  const OVERVIEW_LABELS={
    en:['ALL 12 CARDS','Back to card'],ru:['ВСЕ 12 КАРТ','К карте'],fr:['LES 12 CARTES','Voir la carte'],
    es:['LAS 12 CARTAS','Ver carta'],pt:['AS 12 CARTAS','Ver carta'],de:['ALLE 12 KARTEN','Zur Karte'],
    it:['TUTTE LE 12 CARTE','Alla carta'],ar:['جميع البطاقات الـ١٢','العودة للبطاقة'],
    zh:['全部 12 张卡片','返回卡片'],ja:['全12枚','カードへ戻る'],hi:['सभी 12 कार्ड','कार्ड पर लौटें'],
    uk:['УСІ 12 КАРТ','До карти'],bn:['সব ১২টি কার্ড','কার্ডে ফিরুন'],id:['KE-12 KARTU','Kembali ke kartu']
  };
  function buildOverview(){if(overviewBuilt)return;overviewBuilt=true;
    const labels=OVERVIEW_LABELS[lang]||OVERVIEW_LABELS.en;
    $('allCardsHeading').textContent=labels[0];$('allCardsCloseText').textContent=labels[1];
    $('closeAllCards').setAttribute('aria-label',labels[1]);
    for(let i=1;i<=N;i++){
      const b=document.createElement('button');b.type='button';b.className='all-cards-tile';
      b.setAttribute('aria-label',t.card+' '+num(i)+'. '+(descriptions[i-1]||''));
      b.innerHTML='<span class="all-cards-placeholder" aria-hidden="true"></span>';
      b.addEventListener('click',()=>{closeOverview();show(i);scrollActiveThumb();});
      overviewGrid.appendChild(b);overviewTiles.set(i,b);
    }
  }
  function overviewSizing(){if(!overviewOpen)return;
    const r=overviewViewport.getBoundingClientRect();if(r.width<1||r.height<1)return;
    const smallGap=r.width<520?6:r.width<850?9:12;
    const candidates=r.width>=1040?[4]:r.width>=720?[3,4]:[2,3];
    let best={size:0,cols:2};
    for(const cols of candidates){const rows=Math.ceil(12/cols);
      const usableW=Math.max(100,r.width-12);
      const usableH=Math.max(100,r.height-12);
      const size=Math.floor(Math.min(360,(usableW-(cols-1)*smallGap)/cols,((usableH-(rows-1)*smallGap)/rows)*cardRatio));
      if(size>best.size){best={size,cols};}
    }
    overviewGrid.style.setProperty('--all-cols',best.cols);
    overviewGrid.style.setProperty('--all-size',Math.max(30,best.size)+'px');
    overviewGrid.style.setProperty('--all-tile-h',Math.max(22,Math.floor(best.size/cardRatio))+'px');
    overviewGrid.style.setProperty('--all-gap',smallGap+'px');
    overview.dataset.layout=best.cols+'x'+Math.ceil(12/best.cols);
  }
  function openOverview(){if(isFull())exitFull();if(overviewOpen)return;
    overviewFocus=document.activeElement;buildOverview();overviewOpen=true;
    document.body.classList.add('all-cards-open');overview.hidden=false;
    $('thumbnailsHeading').setAttribute('aria-expanded','true');overviewSizing();
    $('closeAllCards').focus({preventScroll:true});
    // Reuse the exact same JPG URLs as large slides. Avoid a separate thumbnail download.
    for(let i=1;i<=N;i++)(i=>{load(i,false).then(url=>{
       const b=overviewTiles.get(i);if(!b||b.querySelector('img'))return;
       const img=new Image();img.decoding='async';img.alt='';
       img.onload=()=>{img.classList.add('is-loaded');b.querySelector('.all-cards-placeholder')?.remove();};
       img.onerror=()=>{};img.src=url;b.prepend(img);
       if(img.complete&&img.naturalWidth){img.classList.add('is-loaded');b.querySelector('.all-cards-placeholder')?.remove();}
      }).catch(()=>{});})(i);
  }
  function closeOverview(){if(!overviewOpen)return;overviewOpen=false;
    overview.hidden=true;document.body.classList.remove('all-cards-open');
    $('thumbnailsHeading').setAttribute('aria-expanded','false');
    requestAnimationFrame(()=>{setSize();overviewFocus?.focus?.({preventScroll:true});});
  }
  $('thumbnailsHeading').addEventListener('click',openOverview);
  $('closeAllCards').addEventListener('click',closeOverview);
  window.addEventListener('resize',overviewSizing,{passive:true});
  document.addEventListener('keydown',e=>{
    if(!overviewOpen)return;
    if(e.key==='Escape'){closeOverview();e.preventDefault();}
    // Keyboard focus stays in the grid. Arrow keys move among preview tiles.
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
      const currentTile=document.activeElement?.closest?.('.all-cards-tile');
      if(currentTile){const tiles=Array.from(overviewTiles.values()),ix=tiles.indexOf(currentTile);
        const cols=Number(overviewGrid.style.getPropertyValue('--all-cols'))||4;
        const delta=e.key==='ArrowLeft'?-1:e.key==='ArrowRight'?1:e.key==='ArrowUp'?-cols:cols;
        tiles[Math.max(0,Math.min(11,ix+delta))]?.focus();e.preventDefault();}
    }
  });

  // Recheck destination at activation (mouse, keyboard, touch).
  for(const [id,mode] of [['lightLink','artgold'],['darkLink','art']]){
    $(id).addEventListener('click',()=>{ $(id).href=pageUrl(lang,mode); });
  }
  setupLanguagePicker();localizedButtons();buildThumbnails();
  if('ResizeObserver'in window)new ResizeObserver(setSize).observe(player);
  else window.addEventListener('resize',setSize);
  window.addEventListener('resize',updateBottomFullscreenVisibility,{passive:true});
  setSize();show(current,false);
})();
