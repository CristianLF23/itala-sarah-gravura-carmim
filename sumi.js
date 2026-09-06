(() => {
 'use strict';
 const canvas=document.querySelector('#sumi'),host=document.querySelector('.sumi-stage'),button=document.querySelector('#ink-toggle');
 if(!canvas||!host)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=false,visible=false,lost=false,raf=0,last=0,elapsed=0,drawn=0,quality=1,slow=0;
 let gl,program,buffer,uniforms;
 const gesture={x:.5,y:.5,tx:.5,ty:.5,strength:0,target:0,until:0};
 let scrollBlend=0;
 const vertex=`attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}`;
 const fragment=`precision highp float;
 varying vec2 v_uv;uniform vec2 u_res;uniform float u_time;uniform vec3 u_gesture;uniform float u_scroll;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
 mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
 vec2 turn(vec2 p,vec2 c,float r,float angle){vec2 d=p-c;float w=exp(-dot(d,d)/(r*r));return c+rot(angle*w)*d;}
 void main(){
 vec2 p=(v_uv-.5)*vec2(u_res.x/u_res.y,1.);p*=2.6;
 vec2 hand=(u_gesture.xy-.5)*vec2(u_res.x/u_res.y,1.)*2.6;
 p=turn(p,hand,.62,u_gesture.z*1.35);
 p.y+=u_scroll*.7;
 float t=u_time*.22;
 p+=vec2(.12*sin(t*.7),.08+.12*(cos(t*.53)-1.));
 p=turn(p,vec2(.22,.52),.95,3.5+.60*sin(t*.63));
 p=turn(p,vec2(-.35,-.6),.85,-3.82+.50*(cos(t*.47)-1.));
 p=turn(p,vec2(.78,-.06),.55,3.+.44*sin(t*.71));
 p=turn(p,vec2(-.72,.28),.47,-2.22+.48*(cos(t*.8)-1.));
 p+=.11*vec2(sin(p.y*3.+t*.3),cos(p.x*3.2-t*.2));
 float field=p.x*.78+p.y*.36+.22*sin(p.y*2.9)+.12*cos(p.x*3.8)+.06*(noise(p*5.)-.5);
 float wave=field*19.;
 float broad=sin(wave+.8*sin(field*7.));
 float middle=sin(wave*3.05+.4*sin(p.y*2.));
 float fine=sin(wave*12.+noise(p*18.)*.45);
 float pigment=smoothstep(-.24,.32,broad+.16*middle);
 vec3 ink=vec3(.032,.028,.027),bone=vec3(.79,.755,.68),red=vec3(.53,.035,.08);
 float redZone=smoothstep(.15,.6,sin(field*6.8+1.4)+.25*cos(p.y*2.));
 vec3 dye=mix(bone,red,redZone);
 float fibers=smoothstep(.64,.92,fine)*.17;
 vec3 col=mix(ink,dye,pigment);
 col=mix(col,ink,fibers*mix(.3,1.,pigment));
 float thin=1.-smoothstep(.02,.10,abs(broad+.16*middle));
 col+=thin*vec3(.11,.09,.075);
 float grain=hash(gl_FragCoord.xy)*.045;
 col*=.9+.1*noise(p*34.);col+=grain-.022;
 float vignette=1.-.19*dot(v_uv-.5,v_uv-.5);
 gl_FragColor=vec4(col*vignette,1.);
 }`;
 function compile(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);throw Error('Ink shader compilation failed');}return shader;}
 function init(){
  if(gl)return true;
  try{gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});if(!gl)return false;
   const vert=compile(gl.VERTEX_SHADER,vertex),frag=compile(gl.FRAGMENT_SHADER,fragment);program=gl.createProgram();gl.attachShader(program,vert);gl.attachShader(program,frag);gl.bindAttribLocation(program,0,'a_position');gl.linkProgram(program);gl.deleteShader(vert);gl.deleteShader(frag);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Ink program link failed');
   gl.useProgram(program);buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);uniforms={res:gl.getUniformLocation(program,'u_res'),time:gl.getUniformLocation(program,'u_time'),gesture:gl.getUniformLocation(program,'u_gesture'),scroll:gl.getUniformLocation(program,'u_scroll')};resize();return true;
  }catch{host.dataset.render='fallback';if(gl&&program)gl.deleteProgram(program);gl=null;return false;}
 }
 function resize(){if(!gl||lost)return;const bounds=host.getBoundingClientRect();const dpr=Math.min(devicePixelRatio,1.25)*quality;const cap=Math.min(1,Math.sqrt(1000000/Math.max(1,bounds.width*bounds.height*dpr*dpr)));canvas.width=Math.max(1,Math.round(bounds.width*dpr*cap));canvas.height=Math.max(1,Math.round(bounds.height*dpr*cap));gl.viewport(0,0,canvas.width,canvas.height);draw();}
 function draw(){if(!gl||lost)return;if(reduced.matches||navigator.connection?.saveData){host.dataset.render='fallback';return;}gl.uniform2f(uniforms.res,canvas.width,canvas.height);gl.uniform1f(uniforms.time,elapsed);gl.uniform3f(uniforms.gesture,gesture.x,gesture.y,gesture.strength);gl.uniform1f(uniforms.scroll,scrollBlend);gl.drawArrays(gl.TRIANGLES,0,6);host.dataset.render='webgl';canvas.dataset.frames=String(++drawn);}
 function allowed(){return visible&&!paused&&!reduced.matches&&!navigator.connection?.saveData&&!document.hidden&&!document.querySelector('dialog[open]')&&!lost;}
 function tick(now){raf=0;if(!allowed()){sync();return;}if(!last)last=now;const delta=now-last;if(delta>=32){if(delta>50)slow++;else slow=Math.max(0,slow-1);elapsed+=Math.min(delta,75)/1000;last=now;if(now>gesture.until)gesture.target=0;gesture.x+=(gesture.tx-gesture.x)*.2;gesture.y+=(gesture.ty-gesture.y)*.2;gesture.strength+=(gesture.target-gesture.strength)*.13;const targetScroll=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);scrollBlend+=(targetScroll-scrollBlend)*.12;if(slow>50&&quality>.65){quality=.65;resize();slow=0;}draw();}raf=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(raf);raf=0;last=0;button.textContent=paused?'Retomar tinta':'Pausar tinta';button.setAttribute('aria-pressed',String(paused));if(reduced.matches||navigator.connection?.saveData){host.dataset.render='fallback';button.hidden=true;return;}button.hidden=!gl||lost;if(allowed()&&init()){button.hidden=false;raf=requestAnimationFrame(tick);}}
 button.addEventListener('click',()=>{paused=!paused;sync();});
 function touchInk(event){if(paused||reduced.matches||event.target.closest('a,button,input,textarea,select,summary,dialog'))return;if(event.type==='pointermove'&&event.pointerType!=='mouse'&&!event.buttons)return;const bounds=host.getBoundingClientRect();gesture.tx=Math.max(0,Math.min(1,(event.clientX-bounds.left)/bounds.width));gesture.ty=1-Math.max(0,Math.min(1,(event.clientY-bounds.top)/bounds.height));gesture.target=event.pointerType==='mouse'?.7:1;gesture.until=performance.now()+500;}
 addEventListener('pointerdown',touchInk,{passive:true});addEventListener('pointermove',touchInk,{passive:true});addEventListener('pointerup',()=>gesture.target=0,{passive:true});addEventListener('pointercancel',()=>gesture.target=0,{passive:true});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.01}).observe(host);
 new ResizeObserver(resize).observe(host);reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);document.addEventListener('ink-modal',sync);
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;cancelAnimationFrame(raf);host.dataset.render='fallback';button.hidden=true;});
 canvas.addEventListener('webglcontextrestored',()=>{lost=false;gl=null;program=null;sync();});
})();
