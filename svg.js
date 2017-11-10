//X2 + Y2 = R2
function getCoords(perc, path) {
    'use strict';
    var d = path.getAttribute('d'),
        params = d.trim().split(" "),
        x = parseFloat(params[1], 10),
        y = parseFloat(params[2], 10),
        r = parseFloat(params[4], 10),
        theta = perc / 100 * 2 * Math.PI,
        largeArc = theta >= (22 / 7) ? 1 : 0,
        x2 = x + r * Math.sin(theta),
        y2 = y + r - r * Math.cos(theta);
    if (perc < 100) {
        d = [
            "M", x, y,
            "A", r, r, 0, largeArc, 1, x2, y2
        ].join(" ");
    } else {
        d = [
            "M", x, y,
            "A", r, r, 0, 1, 1, x, y + (r * 2),
            "A", r, r, 0, 1, 1, x, y + (r * 2)
        ].join(" ");
    }
    return d;
}
function animate() {
    'use strict';
    var path = document.getElementsByTagName('path')[1],
        t = parseFloat(path.getAttribute('data-percent'), 10),
        time = Math.floor(1000 / t),
        i = 0,
        intv;
    intv = setInterval(function () {
        if (i === t) {
            clearInterval(intv);
        }
        path.setAttribute('d', getCoords(i, path));
        i = i + 1;
    }, time);
}
animate();
