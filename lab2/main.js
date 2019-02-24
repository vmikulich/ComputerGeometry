const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function getRandomPoint(a, b) {
    const res = {
        x: Math.ceil((a  * Math.random())),
        y: Math.ceil((b  * Math.random())),
    }
    return res;
}

function drawPoint(ctx, point, pName){
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI, true);
    ctx.strokeText(pName, point.x - 3, point.y - 3)
    ctx.fill();
}

function drawLine(ctx, point1, point2, p1Name, p2Name) {
    ctx.moveTo(point1.x, point1.y);
    ctx.strokeText(p1Name, point1.x - 3, point1.y - 3)
    ctx.lineTo(point2.x, point2.y);
    ctx.strokeText(p2Name, point2.x - 3, point2.y - 3)
    ctx.stroke();
}

function buildEquotion(point1, point2, point) {
    const vector = {
        x: point2.x - point1.x,
        y: point2.y - point1.y
    }
    const res = vector.y*(point1.x - point.x) + ((-1) * vector.x*(point1.y - point.y));
    return res;
}

function checkIntersection(p) {
    const d = {
        d1: buildEquotion(p.point1, p.point2, p.point3),
        d2: buildEquotion(p.point1, p.point2, p.point4),
        d3: buildEquotion(p.point3, p.point4, p.point1),
        d4: buildEquotion(p.point3, p.point4, p.point2)
    }
    if ((d.d1 * d.d2 <= 0) && (d.d3 * d.d4 <= 0)) {
        return 1;
    }
    else if (d.d1 === d.d2 === d.d3 === d.d4) {
        return 0;
    }
    else {
        return -1;
    }
}

function drawPolygon(ctx, p) {
    for (let i = 0; i < p.length; i++) {
        if (i === p.length - 1 ) drawLine(ctx, p[i], p[0], `p${i + 1}`, `p1`)
        else drawLine(ctx, p[i], p[i + 1], `p${i + 1}`, `p${i + 2}`)
    }
}

function isSimplePolygon(points) {
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            let point1 = points[i];
            let point2 = i === points.length - 1 ? points[0] : points[i + 1];
            let point3 = points[j];
            let point4 = j === points.length - 1 ? points[0] : points[j + 1];
            if (point1 === point3 || point2 === point4 || point1 === point4 || point2 === point3) continue;
            if (checkIntersection({ point1, point2, point3, point4 }) === 1) return false;
        }
    }
    return true;
}

function getSimplePolygon(size) {
    const points = Array(size)
                        .fill(0)
                        .map(point => getRandomPoint(canvas.width - 5, canvas.height - 5));
    return isSimplePolygon(points) ? points : getSimplePolygon(size);
}

function getRayToRightBorder(point) {
    return [point, {x: canvas.width - 5, y: point.y}]
}

function isPointBelongToPolygon(point, polyPoints) {
    const ray = getRayToRightBorder(point);
    let res = 0;
    for (let i = 0; i < polyPoints.length; i++) {
        const points = {
            point1: polyPoints[i],
            point2: i ===  polyPoints.length - 1 ? polyPoints[0] : polyPoints[i + 1],
            point3: ray[0],
            point4: ray[1]
        }
        if (checkIntersection(points) === 1) res++;
    }
    return res % 2 === 1;
}

function task() {
    const message = document.getElementById('message');
    const points = getSimplePolygon(5);
    const point = getRandomPoint(canvas.width, canvas.height);
    drawPolygon(ctx, points);
    drawPoint(ctx, point, 'p0');
    message.innerHTML = isPointBelongToPolygon(point, points) ? `Given point is belong to polygon` : `Given point isn't belong to polygon`;
}

task();