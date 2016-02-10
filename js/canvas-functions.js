
function rgb(r,g,b){
  return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ', 1.0)';
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function line(ctx, x1,y1,x2,y2){
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function element(id){
  return document.getElementById(id)
}

function create(id){
  return document.createElement(id)
}

function setPos(dom,x,y){
  dom.style.webkitTransform = "translate3d(" + x + "px," + y + "px,0)";
}

function setPosScale(dom,x,y,s){
  dom.style.webkitTransform = "translate3d(" + x + "px," + y + "px,0) scale(" + s + "," + s + ")";
}



function solidCircle(ctx, x, y, r) {
  if( r > 0){
   ctx.beginPath();
   ctx.arc(x, y, r, 0, 2 * Math.PI, false);
   ctx.fill();
  }
}

function strokedCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.stroke();
}

function strokedRect(ctx,x,y,w,h){
  ctx.beginPath();
  ctx.strokeRect(x,y,w,h);
}

function solidRect(ctx,x,y,w,h){
  ctx.beginPath();
  ctx.fillRect(x,y,w,h);
}

function sin(count,mult,offset){
  return Math.sin(count) * mult + offset;
}

function round(val){
  return Math.round(val);
}

function blendFunction(ctx, operator){
  ctx.globalCompositeOperation = operator;
}

function clearCanvas(ctx,h,w){
  ctx.clearRect(0,0,h,w)
}

function angle(x1,y1,x2,y2){
  return Math.atan2(y2-y1,x2-x1);
}

function sin(a){
  return Math.sin(a);
}
function cos(a){
  return Math.cos(a);
}
function abs(a){
  return Math.abs(a)
}

function random(a,b){
  return (Math.random() * (b-a)) + a;
}

function loadImage(url){
  var img = new Image();
  img.src = url;
  return img;
}
