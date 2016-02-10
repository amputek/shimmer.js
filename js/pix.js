var PIX = (function(){

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var my = {};

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function getLum(data){
        return 0.2126*data[0] + 0.7152*data[1] + 0.0722*data[2];
    }

    my.getColour = function( src, x, y ){

        var myImg = new Image();
        myImg.crossOrigin="anonymous";
        myImg.src = src;
        myImg.onload = function(){
            context.drawImage(myImg, 0, 0);
            var data = context.getImageData(x, y, 1, 1).data;
            var color = rgbToHex(data[0],data[1],data[2]);
            console.log(color);
        }
    }

    my.poop = function(){
        return "poop";
    }

    return my;

}());
