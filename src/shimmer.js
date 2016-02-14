var SHIMMER = (function( ){

    var frameCount = 0;
    var particles = [];
    var canvas;
    var context;
    var touch;
    var shimmer = {};
    var options = {};

    function extend(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

    function distance(a,b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    function random(a,b){
        return (Math.random() * (b-a)) + a;
    }

    function angle(a,b){
        return Math.atan2(b.y-a.y,b.x-a.x);
    }

    function solidRect(ctx,x,y,w,h){
        ctx.beginPath();
        ctx.fillRect(x,y,w,h);
    }

    function blendFunction(ctx, operator){
        ctx.globalCompositeOperation = operator;
    }

    function Touch( canvas ){
        this.down = false;
        this.x = 0;
        this.y = 0;
        this.time = 0;
        var vel = 0;

        this.update = function(){
            vel += ( (this.down ? 60 : 0) - this.time) * 0.05;
            this.time += vel;
            vel *= 0.8;
        }

        var _this = this;

        this.touchDown = function(e){
            e.preventDefault();
            touch.down = true;
            touch.touchXY(e);
        }

        this.touchXY = function(e){
            e.preventDefault();
            touch.x = e.pageX;
            touch.y = e.pageY;
        }

        this.touchUp = function(e){
            e.preventDefault();
            touch.down = false;
        }

        canvas.addEventListener("mousedown",_this.touchDown,false);
        canvas.addEventListener("mousemove",_this.touchXY,true);
        canvas.addEventListener("mouseup"  ,_this.touchUp,false);
    }

    function Particle(x,y,ax,ay){
        this.hx = x;
        this.hy = y;
        this.x = random(0,ax);
        this.y = random(0,ay);
        this.r = options.particleSize + random(-options.particleSizeRandomness,options.particleSizeRandomness);
        this.speed = random(0.015,0.03) * 2;

        this.off = this.hx * 0.01 + this.hy * 0.01 + random(-1,1);
        this.halfr = this.r * 0.5;

        this.update = function(){
            this.x += (this.hx - this.x) * this.speed;
            this.y += (this.hy - this.y) * this.speed;
            var r = this.r + Math.sin(this.off + frameCount) * this.halfr;
            var halfr = r / 2;
            solidRect(context, this.x-halfr, this.y-halfr, r,   r  );
        }
    }

    function update(){
        webkitRequestAnimationFrame(update);
        frameCount += options.shimmerRate;

        context.clearRect(0,0,canvas.width,canvas.height);

        touch.update();

        for (var i = 0; i < particles.length; i++) {
            var Particle = particles[i];
            Particle.update();
            var d = distance(Particle,touch)
            if(d < touch.time){
                var a = angle(Particle,touch);
                Particle.x -= Math.cos(a) * (touch.time-d);
                Particle.y -= Math.sin(a) * (touch.time-d);
            }
        };

    }

    shimmer.preset = {}
    shimmer.preset.straight = {
            color : 'rgba(255,150,50,0.08)',
            particleSize : 5,
            particleSizeRandomness : 0,
            particleDensity : 45,
            particleLocationRandomness : 0,
            shimmerRate : 0.05,
            returnSpeed : 0.25
        }

    shimmer.init = function( wrapper, imgSrc, customOptions ){

        var defaults = {
                color : 'rgba(255,150,50,0.08)',
                particleSize : 15,
                particleSizeRandomness : 5,
                particleDensity : 30,
                particleLocationRandomness : 15,
                shimmerRate : 0.1,
                returnSpeed : 0.25
            }
        options = extend({}, defaults, customOptions || {});

        canvas = document.createElement("canvas");
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        context = canvas.getContext('2d');
        blendFunction(context,"lighter")
        context.fillStyle = options.color;
        wrapper.appendChild(canvas);

        touch = new Touch(canvas);

        var image = new Image();
        image.src = imgSrc;
        image.onload = function(){ createParticles( image, image.width, image.height ) };


    }


    function createParticles( image, width, height ){

        var tempcanvas = document.createElement("canvas");
        tempcanvas.width = width;
        tempcanvas.height = height;
        var tempcontext = tempcanvas.getContext('2d');

        tempcontext.drawImage(image,0,0)

        var imageData = tempcontext.getImageData(0,0,width,height);

        var dw = canvas.width / width;
        var dh = (height / width) * dw;

        for(var i = 2; i < imageData.data.length; i += 4 * Math.round( options.particleDensity + random(-options.particleLocationRandomness,options.particleLocationRandomness) )){
            if(imageData.data[i] < 50){

                var x = Math.floor(i/4) % width;
                var y = Math.floor(i/4) / height;
                x *= dw;
                y *= dh;
                particles.push(new Particle(x,y,canvas.width,canvas.height));
            }
        }

        update();
    }

    return shimmer;

}());


// tempcontext.fillStyle = "white";
// tempcontext.fillRect(0,0,width,height)
// tempcontext.font = "280px Arial Black"
// tempcontext.fillStyle = "black";
// tempcontext.fillText("hello",200,250);
