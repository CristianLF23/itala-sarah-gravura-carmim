(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  const video = document.querySelector('.hero-video');
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');
  const motionButton = document.querySelector('.motion-control');
  const menu = document.querySelector('#menu-dialog');
  const box = document.querySelector('#lightbox');
  const menuButton = document.querySelector('.menu-toggle');
  const cards = [...document.querySelectorAll('[data-work]')];
  const ink = document.querySelector('.ink-layer');
  const media = document.querySelector('.hero-media');
  const spotlight = document.querySelector('.spotlight-frame');
  const photo = document.querySelector('.spotlight-photo');
  const ticker = document.querySelector('.ticker');
  const tickerTrack = document.querySelector('.ticker-track');
  let manualPaused = false;
  try { manualPaused = localStorage.getItem('itala-motion-paused') === 'true'; } catch {}
  let heroVisible = true, hasVideo = false, videoEnded = false, frame = 0;
  let selected = 0, returnFocus = null, currentFilter = 'todos';
  let motion = false;
  const clamp = (n, a, b) => Math.min(b, Math.max(a,n));
  const dataSaver = Boolean(navigator.connection?.saveData);
  const mediaPaused = () => !motion || !heroVisible || document.hidden || menu.open || box.open || videoEnded;

  function syncVideo() {
    if (mediaPaused()) { video.pause(); return; }
    if (hasVideo) video.play().catch(() => video.classList.remove('is-playing'));
  }
  function loadVideo() {
    if (hasVideo || !motion || dataSaver) return;
    hasVideo = true;
    video.src = 'assets/abertura.mp4';
    video.muted = true;
    video.load();
    syncVideo();
  }
  video.addEventListener('playing', () => video.classList.add('is-playing'));
  video.addEventListener('ended', () => { videoEnded=true; video.classList.remove('is-playing'); });
  video.addEventListener('error', () => video.classList.remove('is-playing'));
  function syncMotion() {
    motion = !manualPaused && !reduce.matches;
    doc.classList.toggle('motion-enabled', motion);
    doc.classList.toggle('motion-paused', !motion);
    motionButton.textContent = motion ? 'Pausar movimento' : 'Movimento pausado';
    motionButton.setAttribute('aria-pressed', String(!motion));
    if (!motion) {
      [ink,media,photo].forEach(el => el.style.transform='none');
      spotlight.style.clipPath='none';
      document.querySelectorAll('.pending').forEach(el=>el.classList.remove('pending'));
    }
    syncVideo();
    if (motion) loadVideo();
    scheduleFrame();
  }
  motionButton.addEventListener('click', () => {
    if (reduce.matches) { motionButton.textContent='Movimento reduzido no dispositivo'; return; }
    manualPaused = !manualPaused;
    try { localStorage.setItem('itala-motion-paused', String(manualPaused)); } catch {}
    syncMotion();
  });
  reduce.addEventListener('change', syncMotion);
  new IntersectionObserver(entries => { heroVisible=entries[0].isIntersecting; syncVideo(); }, {threshold:0}).observe(hero);
  let tickerVisible=false;
  function syncTicker(){ tickerTrack.style.animationPlayState=tickerVisible&&!document.hidden?'running':'paused'; }
  new IntersectionObserver(entries=>{tickerVisible=entries[0].isIntersecting;syncTicker();}).observe(ticker);
  document.addEventListener('visibilitychange', ()=>{syncVideo();syncTicker();scheduleFrame();});

  const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.remove('pending'); reveals.unobserve(entry.target); }
  }), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => { if(!reduce.matches && !manualPaused) el.classList.add('pending'); reveals.observe(el); });
  const chapters = [...document.querySelectorAll('[data-chapter]')];
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  let lastChapter = '';
  function updateFrame() {
    frame = 0;
    const y = scrollY;
    const vh = innerHeight;
    const full = Math.max(1,document.documentElement.scrollHeight-vh);
    header.classList.toggle('is-scrolled', y>55);
    document.querySelector('.reading-progress').style.transform = 'scaleX('+clamp(y/full,0,1)+')';
    let active=chapters[0];
    for(const section of chapters) if(section.getBoundingClientRect().top<vh*.42) active=section;
    if(lastChapter!==active.dataset.chapter){
      lastChapter=active.dataset.chapter;
      document.querySelector('.chapter-name').textContent=lastChapter;
      navLinks.forEach(link => { if(link.hash==='#'+active.id) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
    }
    if(!motion || document.hidden) return;
    ink.style.transform = 'translate3d(0,'+(-clamp(y/full,0,1)*90)+'px,0) rotate('+((y/full-.5)*3)+'deg)';
    if(heroVisible) media.style.transform='translate3d(0,'+Math.min(y*.16,130)+'px,0) scale('+(1+Math.min(y/Math.max(hero.offsetHeight,1),1)*.055)+')';
    const bounds=spotlight.getBoundingClientRect();
    if(bounds.top<vh && bounds.bottom>0) {
      const progress=clamp((vh-bounds.top)/(vh+bounds.height),0,1);
      const inset=Math.max(0, (0.45-progress)*12);
      spotlight.style.clipPath='inset(0 '+inset+'%)';
      photo.style.transform='translate3d(0,'+((progress-.5)*50)+'px,0) scale(1.03)';
    }
  }
  function scheduleFrame(){if(!frame) frame=requestAnimationFrame(updateFrame);}
  addEventListener('scroll',scheduleFrame,{passive:true});
  addEventListener('resize',scheduleFrame,{passive:true});
  document.fonts.ready.then(scheduleFrame);

  function updateModalState(){
    document.body.classList.toggle('modal-open',menu.open||box.open);
    syncVideo();
  }
  menuButton.addEventListener('click',()=>{
    returnFocus=menuButton; menu.showModal(); menuButton.setAttribute('aria-expanded','true'); updateModalState();
    if(motion) [...menu.querySelectorAll('nav a')].forEach((el,i)=>el.animate([{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,delay:i*55,fill:'backwards',easing:'ease-out'}));
  });
  document.querySelector('.close-menu').addEventListener('click',()=>menu.close());
  menu.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');updateModalState();menuButton.focus({preventScroll:true});});
  menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{
    menu.close();
    setTimeout(()=>{const target=document.querySelector(a.hash);target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:motion?'smooth':'instant'});},0);
  }));
  // Native modal dialogs contain focus, support Escape, and make the page inert.
  function visibleCards(){return cards.filter(el=>!el.hidden);}
  function displayWork(card){
    selected=cards.indexOf(card);
    const list=visibleCards();
    const lightImg=document.querySelector('#lightbox-image');
    lightImg.src=card.href;lightImg.alt=card.dataset.title;
    document.querySelector('#lightbox-title').textContent=card.dataset.title;
    document.querySelector('#lightbox-description').textContent=card.dataset.description;
    document.querySelector('#lightbox-counter').textContent=(list.indexOf(card)+1)+' de '+list.length;
    document.querySelectorAll('[data-lightbox-step]').forEach(b=>b.disabled=list.length<2);
  }
  cards.forEach(card=>card.addEventListener('click',event=>{
    event.preventDefault();returnFocus=card;displayWork(card);box.showModal();updateModalState();
  }));
  function stepWork(delta){const list=visibleCards();const index=list.indexOf(cards[selected]);displayWork(list[(index+delta+list.length)%list.length]);}
  document.querySelectorAll('[data-lightbox-step]').forEach(b=>b.addEventListener('click',()=>stepWork(Number(b.dataset.lightboxStep))));
  box.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();stepWork(-1);}if(event.key==='ArrowRight'){event.preventDefault();stepWork(1);}});
  document.querySelector('.close-lightbox').addEventListener('click',()=>box.close());
  box.addEventListener('close',()=>{updateModalState();returnFocus?.focus({preventScroll:true});});
  document.querySelector('#lightbox-project').addEventListener('click',()=>{
    box.close();setTimeout(()=>document.querySelector('#contato').scrollIntoView({behavior:motion?'smooth':'instant'}),0);
  });
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    currentFilter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    cards.forEach(card=>card.hidden=currentFilter!=='todos' && card.dataset.category!==currentFilter);
    const count=visibleCards().length;
    document.querySelector('.work-count').textContent=count+(count===1?' obra':' obras');
    if(motion) visibleCards().forEach((el,i)=>el.animate([{opacity:0},{opacity:1}],{duration:350,delay:i*30,fill:'backwards'}));
    scheduleFrame();
  }));
  const rail=document.querySelector('.living-rail');
  document.querySelectorAll('[data-rail]').forEach(b=>b.addEventListener('click',()=>{
    const distance=rail.querySelector('figure').getBoundingClientRect().width+parseFloat(getComputedStyle(rail).gap);
    rail.scrollBy({left:Number(b.dataset.rail)*distance,behavior:motion?'smooth':'instant'});
  }));
  function railState(){document.querySelector('[data-rail="-1"]').disabled=rail.scrollLeft<4;document.querySelector('[data-rail="1"]').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-4;}
  rail.addEventListener('scroll',railState,{passive:true});addEventListener('resize',railState);railState();
  document.querySelector('.project-form').addEventListener('submit',event=>{
    event.preventDefault();const form=event.currentTarget;
    const data=new FormData(form);
    const message='Olá, Ítala! Gostaria de conversar sobre uma tatuagem.\n\nIdeia: '+data.get('ideia').trim()+'\nRegião do corpo: '+data.get('regiao').trim()+'\nTamanho aproximado: '+data.get('tamanho').trim()+'\nCidade: '+data.get('cidade')+'.';
    document.querySelector('#whatsapp-message').href='https://wa.me/5562993227097?text='+encodeURIComponent(message);
    document.querySelector('.form-result').hidden=false;
    document.querySelector('#whatsapp-message').focus({preventScroll:true});
    document.querySelector('.form-result').scrollIntoView({behavior:motion?'smooth':'instant',block:'nearest'});
  });
  document.querySelector('.project-form').addEventListener('input',()=>document.querySelector('.form-result').hidden=true);
  syncMotion();
  if(motion){
    document.querySelectorAll('.title-line').forEach((el,i)=>el.animate(
      [{opacity:0,transform:'translateY(25px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:800,delay:100+i*110,fill:'backwards',easing:'cubic-bezier(.2,.8,.2,1)'}
    ));
  }
})();
