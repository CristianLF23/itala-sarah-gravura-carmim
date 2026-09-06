const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 fs.stat(file,(error,stat)=>{
  if(error||!stat.isFile()){res.writeHead(404);return res.end();}
  const mime=types[path.extname(file)]||'application/octet-stream';
  const match=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(match){
   const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),stat.size-1):stat.size-1;
   if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':'bytes */'+stat.size});return res.end();}
   res.writeHead(206,{'Content-Type':mime,'Accept-Ranges':'bytes','Content-Range':'bytes '+start+'-'+end+'/'+stat.size,'Content-Length':end-start+1});
   fs.createReadStream(file,{start,end}).pipe(res);
  }else{res.writeHead(200,{'Content-Type':mime,'Content-Length':stat.size,'Accept-Ranges':'bytes'});fs.createReadStream(file).pipe(res);}
 });
});
server.listen(4182,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4182'));
