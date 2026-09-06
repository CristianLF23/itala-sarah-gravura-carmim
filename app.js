(() => {
 'use strict';document.documentElement.classList.add('js');
 const header=document.querySelector('.header'),chapters=[...document.querySelectorAll('.chapter')],nav=[...document.querySelectorAll('.header nav a')];let raf=0;
 function scroll(){raf=0;header.classList.toggle('is-scrolled',scrollY>45);let active='';for(const chapter of chapters)if(chapter.getBoundingClientRect().top<innerHeight*.4)active=chapter.id;nav.forEach(a=>{if(a.hash==='#'+active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(scroll);},{passive:true});scroll();
 const box=document.querySelector('#lightbox'),works=[...document.querySelectorAll('.work')];let selected=0,trigger=null;
 function show(index){selected=(index+works.length)%works.length;const work=works[selected];document.querySelector('#lightbox-title').textContent=work.dataset.title;document.querySelector('#lightbox-style').textContent=work.dataset.style;const img=document.querySelector('#lightbox-image');img.src=work.href;img.alt=work.querySelector('img').alt;document.querySelector('#lightbox-counter').textContent=`${selected+1} de ${works.length}`;}
 works.forEach((work,index)=>work.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();trigger=work;show(index);box.showModal();document.body.classList.add('modal-open');document.dispatchEvent(new Event('ink-modal'));}));
 document.querySelector('.close-lightbox').addEventListener('click',()=>box.close());document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>show(selected+Number(button.dataset.step))));
 box.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(selected+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(selected-1);}});
 box.addEventListener('close',()=>{document.body.classList.remove('modal-open');trigger?.focus({preventScroll:true});document.dispatchEvent(new Event('ink-modal'));});
 document.querySelector('.lightbox-contact').addEventListener('click',()=>{box.close();setTimeout(()=>{document.querySelector('[name="ideia"]').focus();},0);});
 const form=document.querySelector('form'),result=document.querySelector('.form-result');
 form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form),name=data.get('nome').trim();const message=`Olá, Ítala! ${name?'Meu nome é '+name+'. ':''}Gostaria de conversar sobre uma tatuagem.\n\nIdeia: ${data.get('ideia').trim()}\nRegião do corpo: ${data.get('regiao').trim()}\nTamanho aproximado: ${data.get('tamanho').trim()}\nCidade: ${data.get('cidade')}.`;const link=document.querySelector('#whatsapp-message');link.href='https://wa.me/5562993227097?text='+encodeURIComponent(message);result.hidden=false;link.focus();});
 form.addEventListener('input',()=>result.hidden=true);
})();
