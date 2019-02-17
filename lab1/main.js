const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

function getRandomPoint(a, b) {
    const res = {
        x: Math.ceil((a  * Math.random())),
        y: Math.ceil((b  * Math.random())),
    }
    return res;
}

function createObjectPoint(x, y) {
    return {x, y};
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

function checkLocation(point1, point2, point) {
    const message = document.getElementById('message1');
    const res = buildEquotion(point1, point2, point);
    if (res > 0) message.innerHTML = `The point is lie to the right`;
    else if (res < 0) message.innerHTML = `The point is lie to the left`;
    else message.innerHTML = `The point is belong to line`;
}

function checkLocationn(point1, point2, point) {
    const res = buildEquotion(point1, point2, point);
    if (res > 0) message.innerHTML = `The point is lie to the right`;
    else if (res < 0) message.innerHTML = `The point is lie to the left`;
    else message.innerHTML = `The point is belong to line`;
}

function checkIntersection(p) {
    const message = document.getElementById('message2');
    const d = {
        d1: buildEquotion(p.point1, p.point2, p.point3),
        d2: buildEquotion(p.point1, p.point2, p.point4),
        d3: buildEquotion(p.point3, p.point4, p.point1),
        d4: buildEquotion(p.point3, p.point4, p.point2)
    }
    if ((d.d1 * d.d2 <= 0) && (d.d3 * d.d4 <= 0)) message.innerHTML = `These lines are intersect`;
    else if (d.d1 === d.d2 === d.d3 === d.d4) message.innerHTML = `These lines are match up`;
    else message.innerHTML = `These lines aren't intersect`;
}

function checkIntersectionn(p) {
    var c = 0;
    const d = {
        d1: buildEquotion(p.point1, p.point2, p.point3),
        d2: buildEquotion(p.point1, p.point2, p.point4),
        d3: buildEquotion(p.point3, p.point4, p.point1),
        d4: buildEquotion(p.point3, p.point4, p.point2)
    }
    if ((d.d1 * d.d2 <= 0) && (d.d3 * d.d4 <= 0)) c++;
    return c;
}

function drawPolygon(ctx, p) {
    for (let i = 0; i < p.length; i++) {
        if (i === p.length - 1 ) drawLine(ctx, p[i], p[0], `p${i + 1}`, `p1`)
        else drawLine(ctx, p[i], p[i + 1], `p${i + 1}`, `p${i + 2}`)
    }
}
function checkPolygon(p) {
    var p1;
    var d = 0;
    outer: for (let i = 0; i < p.length - 1; i++) {
        d++;
        for (let j = i + 2; j < p.length; j++) {
            p1 = {
                point1: p[i],
                point2: p[i + 1],
                point3: p[j],
                point4: p[j + 1],
            }
            if (j === p.length - 1) {
                // console.log(j);
                // console.log(p[0]);
                p1.point4 = p[0];
            }
              
            if (checkIntersectionn(p1) === 1) {
                // console.log('not simple');
                // console.log(d);
                break outer;
            }
        }
    }
}

function checkConvex(p) {
    const arr = [];
    for (let i = 0; i < p.length; i++) {
        for (let j = i + 2; j < p.length; j++) {
            console.log(j);
            const res = buildEquotion(p[i], p[i + 1], p[j]);
            console.log(res);
            arr.push(res);
        }
        for (let j = 0; j < i + 2; j++) {
            console.log(j);
            const res = buildEquotion(p[i], p[i + 1], p[j]);
            console.log(res);
            arr.push(res);
        }
    }
    console.log(arr);
    if (arr.every(elem  => elem > 0) || arr.every(elem  => elem < 0)) return true;
    else return false;
}

function task1() {
    const point1 = getRandomPoint(canvas1.width, canvas1.height);
    const point2 = getRandomPoint(canvas1.width, canvas1.height);
    const point = getRandomPoint(canvas1.width, canvas1.height);
    drawLine(ctx1, point1, point2, 'p1', 'p2');
    drawPoint(ctx1, point, 'p0');
    checkLocation(point1, point2, point);
}

function task2() {
    const p = {
        point1: getRandomPoint(canvas2.width, canvas2.height),
        point2: getRandomPoint(canvas2.width, canvas2.height),
        point3: getRandomPoint(canvas2.width, canvas2.height),
        point4: getRandomPoint(canvas2.width, canvas2.height)
    }
    drawLine(ctx2, p.point1, p.point2, 'p1', 'p2');
    drawLine(ctx2, p.point3, p.point4, 'p3', 'p4');
    checkIntersection(p); 
}

function task3() {
    const p = [];
    for (let i = 0; i < 5; i++) p.push(getRandomPoint(canvas3.width, canvas3.height));
    drawPolygon(ctx3, p);
    checkPolygon(p);
}

function task4() {
    const message = document.getElementById('message4');
    const p = [];
    for (let i = 0; i < 5; i++) p.push(getRandomPoint(canvas4.width, canvas4.height));
    drawPolygon(ctx4, p);
    if(checkConvex(p)) message.innerHTML = `This is a convex polygon`;
    else message.innerHTML = `This isn't a convex polygon`;
}


task1();
task2();
task3();
task4();