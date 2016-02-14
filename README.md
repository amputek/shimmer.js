# shimmer effect for canvas

Interactive shimmer-type effect based on monochrome image input.

[See Live Demo Here via GitHub Pages](http://amputek.github.io/shimmer.js/)


![alt text](https://github.com/amputek/shimmer.js/blob/master/img/github.png "Reference")

![alt text](https://github.com/amputek/shimmer.js/blob/master/img/shimmer.png "Refernece")


---

## How to Use

Reference shimmer.js in your html file.
Use ```SHIMMER.init()``` in ```window.onload```. The function takes 3 parameters:

| Parameter | Example |
|-----------|---------|
| wrapper DOM element | ``` document.getElementById("wrapper")``` |
| reference image file for particles locations | ```'img/myImage.jpg'``` |
| optional parameters for changing the shimmer | {} |

#### Options

| Option                     | Type        | Default                 |
|----------------------------|-------------|-------------------------|
| color                      | rgba string | 'rgba(255,150,50,0.05)' |
| particleSize               | integer     | 25                      |
| particleSizeRandomness     | integer     | 5                       |
| particleDensity            | integer     | 30                      |
| particleLocationRandomness | integer     | 15                      |
| shimmerRate                | float       | 0.1                     |
| returnSpeed                | float       | 0.25                    |
