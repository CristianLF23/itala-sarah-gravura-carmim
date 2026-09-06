// Original oriental chrysanthemum: broad recurved petals and inked folded undersides.
// References inform botanical structure; no tracing or reproduction of supplied tattoos.
const fs=require('node:fs'),path=require('node:path');
const parts=[];
const silhouettes=[
'M -13 -15 C -24 -56 -66 -91 -56 -135 C -50 -170 -12 -180 26 -194 C 2 -173 15 -151 41 -144 C 67 -135 65 -103 43 -80 C 21 -57 35 -27 8 -9 Z',
'M -12 -10 C -60 -54 -75 -80 -55 -125 C -42 -156 -16 -168 20 -207 C 7 -177 40 -172 52 -148 C 72 -105 5 -82 27 -44 C 36 -28 22 -14 6 -7 Z',
'M -13 -11 C -40 -55 -31 -95 -54 -124 C -76 -151 -25 -169 17 -183 C -2 -161 7 -148 35 -135 C 73 -116 47 -87 24 -67 C 11 -49 33 -23 7 -8 Z'
];
for(let ring=0;ring<3;ring++){
 const count=[12,10,8][ring],scale=[1,.70,.43][ring];
 for(let i=0;i<count;i++){
  const angle=i*360/count+ring*19+6*Math.sin(i*2.1);
  const sx=scale*(.83+.16*Math.sin(i*1.6+ring)),sy=scale*(.94+.12*Math.cos(i*1.3));
  const shape=silhouettes[(i+ring)%3];
  parts.push('<g transform="translate(300 302) rotate('+angle+') scale('+sx+' '+sy+')">'+
   '<path d="'+shape+'" fill="#84303d" stroke="#190d11" stroke-width="3.1"/>'+
   '<path d="M-12 -15 C-21 -60 -61 -91 -54 -129 C-36 -108 -22 -105 -11 -102 C7 -97 22 -113 26 -131 C42 -107 20 -83 13 -65 C5 -45 22 -22 6 -10Z" fill="#130c10" stroke-width="1.6"/>'+
   '<path d="M-54 -133 C-38 -150 -11 -145 5 -143 C25 -139 33 -150 26 -163 M-50 -125 C-32 -141 -12 -133 0 -128 C20 -121 30 -131 31 -143 M-8 -14 C-11 -43 -23 -60 -31 -76" fill="none" stroke="#c0737e" stroke-width="1.8"/>'+
   '<path d="M-46 -140 C-28 -154 -11 -154 9 -164 M-42 -146 Q-20 -162 13 -172 M-45 -114 Q-28 -100 -22 -88 M-42 -105 Q-30 -98 -20 -80 M-3 -15 Q4 -32 -1 -48 M1 -17 Q10 -34 5 -50 M6 -18 Q15 -32 12 -47" fill="none" stroke="#bb6873" stroke-width=".8"/>'+
   '</g>');
 }
}
let seeds='';
for(let i=0;i<24;i++){const a=i*2.399,r=3.2*Math.sqrt(i),x=300+Math.cos(a)*r,y=302+Math.sin(a)*r;seeds+='<path d="M'+x.toFixed(1)+' '+y.toFixed(1)+' q-4 -5 0 -9 q5 1 3 6" stroke-width="1.2"/>';}
const leaf='<path d="M0 0 C-27 -22 -58 -39 -51 -75 L-59 -89 -41 -84 C-48 -112 -31 -118 -19 -146 L-7 -132 8 -167 C13 -127 43 -110 28 -80 L42 -85 32 -64 C34 -30 8 -22 0 0Z" fill="#110c0e"/><path d="M0 -2 Q-9 -77 8 -161 M-5 -26 L-31 -48 M-8 -48 L-43 -71 M-8 -70 L-31 -99 M-5 -94 L-23 -127 M-5 -27 L21 -51 M-8 -52 L24 -80 M-6 -78 L22 -108" fill="none" stroke="#85414a" stroke-width="1.6"/>';
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" fill="none" stroke="#a95462" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+
'<path d="M299 330 C280 429 320 496 275 669" stroke="#6f2d3a" stroke-width="4"/>'+
'<g transform="translate(258 188) rotate(-27) scale(1.08)">'+leaf+'</g><g transform="translate(347 192) rotate(36) scale(1.12)">'+leaf+'</g>'+
'<g transform="translate(310 459) rotate(-126) scale(1.15)">'+leaf+'</g><g transform="translate(292 510) rotate(137) scale(1.12)">'+leaf+'</g><g transform="translate(281 595) rotate(-140) scale(.85)">'+leaf+'</g>'+
parts.join('')+'<ellipse cx="300" cy="302" rx="20" ry="23" fill="#100b0e"/>'+seeds+'</svg>';
fs.writeFileSync(path.join(__dirname,'../assets/crisantemo.svg'),svg);
console.log('Oriental chrysanthemum: '+Buffer.byteLength(svg)+' bytes');
