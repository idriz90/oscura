import { PDFDocument } from 'pdf-lib';
export function normalizedRect(a, b) { return { x: Math.min(a.x,b.x), y: Math.min(a.y,b.y), width: Math.abs(a.x-b.x), height: Math.abs(a.y-b.y) }; }
export function paint(ctx, marks, w, h) {
  ctx.save(); ctx.fillStyle='#000'; ctx.strokeStyle='#000'; ctx.lineCap='round'; ctx.lineJoin='round';
  for (const mark of marks) {
    if (mark.type === 'rect') ctx.fillRect(mark.x*w, mark.y*h, mark.width*w, mark.height*h);
    else { const pts=mark.points; if (!pts.length) continue; ctx.lineWidth=mark.width*Math.min(w,h); ctx.beginPath(); ctx.moveTo(pts[0].x*w,pts[0].y*h); for(const p of pts.slice(1)) ctx.lineTo(p.x*w,p.y*h); ctx.stroke(); }
  } ctx.restore();
}
export async function canvasesToPdf(canvases) {
  const pdf=await PDFDocument.create(); pdf.setTitle('Documento oscurato'); pdf.setCreator('Oscura by Idris Sinaj'); pdf.setProducer('Oscura');
  for(const canvas of canvases){ const png=await pdf.embedPng(canvas.toDataURL('image/png')); const page=pdf.addPage([canvas.width,canvas.height]); page.drawImage(png,{x:0,y:0,width:canvas.width,height:canvas.height}); }
  return pdf.save({useObjectStreams:true});
}
