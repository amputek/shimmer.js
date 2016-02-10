
var fc = 0;
var blobs = [];
var shake = 0;
var canvas;
var context;
var updateLoop;
var background;
var touch = {down:false,x:0,y:0,time:0};
var image;

var text = true;


function Blob(x,y){
    this.hx = x;
    this.hy = y;
    this.x = random(0,1024);
    this.y = random(0,768);
    this.r = random(4,15)
    this.speed = random(0.015,0.03);

    this.minix = this.x*0.01;
    this.miniy = this.y*0.01;
    this.off = this.hx*0.01 + this.hy *0.01 + random(-1,1);
    this.halfr = this.r * 0.5;

    this.update = function(){
        this.x += (this.hx - this.x) * this.speed;
        this.y += (this.hy - this.y) * this.speed;
        var r = this.r + sin(this.off + fc) * this.halfr;
        solidRect(context, this.x-r/2, this.y-r/2, r,   r  );
    }
}

function update(){
    updateLoop = webkitRequestAnimationFrame(update);
    fc+=0.1;

    shake = random(-3,3);

    var removers = [];

    context.clearRect(0,0,1024,768);

    if(touch.down && touch.time < 59) touch.time += (60-touch.time) * 0.1;
    if(!touch.down) touch.time *= 0.9;

    for (var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        blob.update();
        if(touch.down == true){
            var d = distance(blob.x,blob.y,touch.x,touch.y)
            if(d < touch.time){
                var a = angle(blob.x,blob.y,touch.x,touch.y);
                blob.x -= cos(a) * (touch.time-d);
                blob.y -= sin(a) * (touch.time-d);
            }
        }
    };
}

function touchDown(e){
    e.preventDefault();
    touch.down = true;
    touchXY(e);
}

function touchXY(e){
    e.preventDefault();
    touch.x = e.pageX;
    touch.y = e.pageY;

}

function touchUp(e){
    e.preventDefault();
    touch.down = false;
}

function init(){
    background = element("background");

    canvas.width = 1024;
    canvas.height = 768;


    var imageWidth = text ? 1024 : image.width;
    var imageHeight = text ? 768 : image.height;



    var tempcanvas = document.createElement("canvas");
    tempcanvas.width = imageWidth;
    tempcanvas.height = imageHeight;


    var tempcontext = tempcanvas.getContext('2d');
    tempcontext.drawImage(image,0,0)


    //
    if( text ){
        tempcontext.fillStyle = "white";
        tempcontext.fillRect(0,0,imageWidth,imageHeight)
        tempcontext.font = "280px Arial Black"
        tempcontext.fillStyle = "black";
        tempcontext.fillText("hello",200,250);
    }

    var imageData = tempcontext.getImageData(0,0,imageWidth, imageHeight);




    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height)
    // blendFunction(context,"lighter");



    for(var i = 2; i < imageData.data.length; i+=4*round(random(25,50))){
        // if(i % (image.width*4) <= 7){
        //     // i += (image.width*4) * 8;
        // }
        //console.log(imageData.data[i])
        if(imageData.data[i] < 50){

            var x = Math.floor(i/4) % imageWidth;
            var y = Math.floor(i/4) / imageHeight;
            if(!text){
                x*=0.7;
                y*=0.25;
                x+=30;
                y+=200;
            }

            // x*=3.2;
            // y*=2;
            // x+=30;
            // y+=50;
            blobs.push(new Blob(x,y));
        }
    }

    console.log(blobs.length)
    blendFunction(context,"lighter")
    //context.fillStyle = 'rgba(255,150,50,0.6)'
    context.fillStyle = 'rgba(55,150,100,0.6)'

    canvas.addEventListener("mousedown",touchDown,false);
    canvas.addEventListener("mousemove",touchXY,true);
    canvas.addEventListener("mouseup",touchUp,false);

    update();

}

window.onload = function(){




    canvas = element("canvas");
    context = canvas.getContext('2d');

    //PIX.getColour('images/hey.jpg',150,105)

    image = new Image();
    image.src = 'images/liff.jpg';
    image.onload = init;

    // init();
}
