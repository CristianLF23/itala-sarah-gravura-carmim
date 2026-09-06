(() => {
 'use strict';
 document.documentElement.classList.add('js');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const header=document.querySelector('.header'),art=document.querySelector('.hero-art'),hero=document.querySelector('.hero');
 let frame=0;
 function update(){frame=0;header.classList.toggle('is-scrolled',scrollY>45);art.style.transform=reduce.matches?'none':`translate3d(0,${Math.min(scrollY,hero.offsetHeight)*.09}px,0)`;}
 function schedule(){if(!frame)frame=requestAnimationFrame(update);}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener('change',schedule);update();
 const box=document.querySelector('#lightbox'),works=[...document.querySelectorAll('.work')];
 let selected=0,trigger=null;
 function show(index){selected=(index+works.length)%works.length;const work=works[selected];document.querySelector('#lightbox-title').textContent=work.dataset.title;const img=document.querySelector('#lightbox-image');img.src=work.href;img.alt=work.querySelector('img').alt;document.querySelector('#lightbox-counter').textContent=`${selected+1} de ${works.length}`;}
 works.forEach((work,index)=>work.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();trigger=work;show(index);box.showModal();document.body.classList.add('modal-open');}));
 document.querySelector('.close-lightbox').addEventListener('click',()=>box.close());
 document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>show(selected+Number(button.dataset.step))));
 box.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(selected+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(selected-1);}});
 box.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus({preventScroll:true});});
 const form=document.querySelector('form'),result=document.querySelector('.form-result');
 form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const message=`Olá, Ítala! Gostaria de conversar sobre uma tatuagem.\n\nIdeia: ${data.get('ideia').trim()}\nRegião do corpo: ${data.get('regiao').trim()}\nTamanho aproximado: ${data.get('tamanho').trim()}\nCidade: ${data.get('cidade')}.`;const link=document.querySelector('#whatsapp-message');link.href='https://wa.me/5562993227097?text='+encodeURIComponent(message);result.hidden=false;link.focus();});
 form.addEventListener('input',()=>result.hidden=true);
})();
