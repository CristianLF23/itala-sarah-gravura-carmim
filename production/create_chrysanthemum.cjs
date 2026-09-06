// Original botanical line work. Deterministic curved, folded petals, not a stock icon.
const fs=require('node:fs'),path=require('node:path');
const petals=[];
for(let ring=0;ring<6;ring++){
 const count=25-ring*3,len=174-ring*25,base=28-ring*3;
 for(let i=0;i<count;i++){
  const a=360*i/count+ring*13,w=13-ring*.8,bend=15*Math.sin(i*2.4+ring),reach=len+8*Math.sin(i*1.7);
  petals.push('<g transform="rotate('+a+' 300 270)"><path d="M '+(300-base*.12)+' '+(270-base)+' C '+(300-w-bend)+' '+(250-reach*.48)+' '+(300-w*1.5+bend)+' '+(270-reach)+' '+(300+bend)+' '+(260-reach)+' C '+(300+w*1.5+bend)+' '+(247-reach)+' '+(300+w)+' '+(259-reach*.3)+' '+(300+base*.12)+' '+(270-base)+'" fill="#100b0c"/><path d="M 300 '+(265-base)+' Q '+(305+bend)+' '+(260-reach*.65)+' '+(300+bend)+' '+(268-reach)+'" fill="none" stroke-width=".65"/></g>');
 }
}
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" fill="none" stroke="#b33c49" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><g><path d="M300 287 C280 392 372 483 286 677 M307 428 C265 443 226 435 186 409 M321 502 C355 504 394 478 429 455"/><path d="M302 430 C257 362 228 406 182 366 L192 395 L154 386 L178 409 L150 420 C202 450 249 466 302 430 M322 500 C352 445 387 462 420 415 L418 446 L449 431 L435 458 L465 454 C427 496 386 524 322 500" fill="#100b0c"/><path d="M185 409 Q241 436 290 432 M334 498 Q389 478 429 455" stroke-width=".8"/></g><g>'+petals.join('')+'</g><g stroke-width=".8"><path d="M293 264 q13 -20 21 -1 q-1 21 -18 15 q-15 -8 -3 -22 q13 -8 16 7 q-1 10 -9 5 q-5 -5 0 -9"/></g></svg>';
fs.writeFileSync(path.join(__dirname,'../assets/crisantemo.svg'),svg);
console.log('Original chrysanthemum: '+Buffer.byteLength(svg)+' bytes');
