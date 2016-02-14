# shimmer effect for canvas

Interactive shimmer-type effect on custom text or monochrome image input.

---

## How to Use


Use ```SHIMMER.init()``` in your window.onload. The init function takes 3 parameters:

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
