import React, { useRef, useEffect } from 'react'
import {connect} from "react-redux";
import { fetchAddAttempts } from '../../redux/action.js'
import './Canvas.css'

const Canvas = ({props, attempts, r, addAttempt}) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        // if (window.innerWidth >= 1204) {
        //     canvas.width = 390
        //     canvas.height = 390
        // } else {
        //     canvas.width = 340
        //     canvas.height = 340
        // }
        const canvasR = canvas.width / 2.5
        const ctx = canvas.getContext("2d");

        drawGraph(ctx, canvasR, attempts, r);
        mouseMove(ctx, canvas, canvasR, attempts, r, addAttempt);
    });

    return <canvas ref={canvasRef} {...props}  width="390" height="390" alt="Graph" />
}

function drawMarks(ctx, canvas, canvasR) {
    const axesColor = '#8a7070';
    const markSize = canvas.height / 13;
    ctx.beginPath();
    ctx.fillStyle = axesColor;
    ctx.strokeStyle = axesColor;
    ctx.fillText('X', canvas.width - markSize / 2, canvas.height / 2 - markSize);
    ctx.fillText('Y', canvas.width / 2 + markSize, markSize / 2);
    ctx.fillText('-R', canvas.width / 2 - canvasR, canvas.height / 2 + markSize + markSize / 2);
    ctx.moveTo(canvas.width / 2 - canvasR, canvas.height / 2 + markSize);
    ctx.lineTo(canvas.width / 2 - canvasR, canvas.height / 2 - markSize);
    ctx.fillText('-R/2', canvas.width / 2 - canvasR / 2, canvas.height / 2 + markSize + markSize / 2);
    ctx.moveTo(canvas.width / 2 - canvasR / 2, canvas.height / 2 + markSize);
    ctx.lineTo(canvas.width / 2 - canvasR / 2, canvas.height / 2 - markSize);
    ctx.fillText('R/2', canvas.width / 2 + canvasR / 2, canvas.height / 2 + markSize + markSize / 2);
    ctx.moveTo(canvas.width / 2 + canvasR / 2, canvas.height / 2 + markSize);
    ctx.lineTo(canvas.width / 2 + canvasR / 2, canvas.height / 2 - markSize);
    ctx.fillText('R', canvas.width / 2 + canvasR, canvas.height / 2 + markSize + markSize / 2);
    ctx.moveTo(canvas.width / 2 + canvasR, canvas.height / 2 + markSize);
    ctx.lineTo(canvas.width / 2 + canvasR, canvas.height / 2 - markSize);
    ctx.fillText('R', canvas.width / 2 - markSize - markSize / 2, canvas.height / 2 - canvasR);
    ctx.moveTo(canvas.width / 2 - markSize, canvas.height / 2 - canvasR);
    ctx.lineTo(canvas.width / 2 + markSize, canvas.height / 2 - canvasR);
    ctx.fillText('R/2', canvas.width / 2 - markSize - markSize / 2, canvas.height / 2 - canvasR/ 2);
    ctx.moveTo(canvas.width / 2 - markSize, canvas.height / 2 - canvasR / 2);
    ctx.lineTo(canvas.width / 2 + markSize, canvas.height / 2 - canvasR / 2);
    ctx.fillText('-R/2', canvas.width / 2 - markSize - markSize / 2, canvas.height / 2 + canvasR / 2);
    ctx.moveTo(canvas.width / 2 - markSize, canvas.height / 2 + canvasR / 2);
    ctx.lineTo(canvas.width / 2 + markSize, canvas.height / 2 + canvasR / 2);
    ctx.fillText('-R', canvas.width / 2 - markSize - markSize / 2, canvas.height / 2 + canvasR);
    ctx.moveTo(canvas.width / 2 - markSize, canvas.height / 2 + canvasR);
    ctx.lineTo(canvas.width / 2 + markSize, canvas.height / 2 + canvasR);
    ctx.stroke();
}

function drawAxes(ctx, canvas, canvasR) {
    const arrowSize = canvas.height / 20;
    const axesColor = '#8a7070';
    ctx.beginPath();
    ctx.fillStyle = axesColor;
    ctx.strokeStyle = axesColor;
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2 - arrowSize, arrowSize);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2 + arrowSize, arrowSize);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width - arrowSize, canvas.height / 2 - arrowSize);
    ctx.moveTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width - arrowSize, canvas.height / 2 + arrowSize);
    ctx.stroke();
    drawMarks(ctx, canvas, canvasR);
}

function drawFigure(ctx, canvas, canvasR) {
    const figureColor = '#40495d';
    ctx.beginPath();
    ctx.fillStyle = figureColor;
    ctx.arc(canvas.width / 2, canvas.height / 2, canvasR / 2, 0,1.5*Math.PI, true);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    ctx.fillRect(canvas.width / 2 - canvasR, canvas.height / 2, canvasR, canvasR / 2);
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + canvasR, canvas.height / 2);
    ctx.lineTo(canvas.width / 2, canvas.height / 2 + canvasR / 2);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
}

function drawGraph(ctx, canvas, canvasR, attempts, r) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFigure(ctx, canvas, canvasR);
    drawAxes(ctx, canvas, canvasR);
    drawPoints(ctx, canvas, attempts, r);
}

function drawPoints(ctx, canvas, attempts, r) {
    for (let i = 0; i < attempts.length; i++) {
        // JS SUCKS
        const x = attempts[i].x;
        const y = attempts[i].y;
        const result = attempts[i].result;
        if (checkArea(x, y, r)) {
            ctx.fillStyle = '#708868';
        } else {
            ctx.fillStyle = '#986363';
        }

        const a = (5 * r / 2);
        //console.log(width, height);
        const b = x + 1.25 * r;
        //console.log(b, width, a);
        const x_position = b * canvas.width / a;
        const y_position = (5 / 4 * r - y) * canvas.height / a;
        //console.log(x_position, y_position);

        //console.log(x, y, a);
        ///console.log(result);
        // console.log(x_position, y_position, r);
        //console.log(width, height);

        ctx.beginPath();
        ctx.moveTo(x_position, y_position);
        ctx.arc(x_position, y_position, canvas.height / 78, 0, 2 * Math.PI);
        ctx.fill();

    }
}

function mouseMove(ctx, canvas, canvasR, attempts, r, addAttempt) {
    canvas.onmousemove = function (e) {
        drawGraph(ctx, canvas, canvasR, attempts, r);
        ctx.beginPath();
        ctx.fillStyle = '#78cbef';
        ctx.arc(e.offsetX, e.offsetY, canvas.height / 78, 0, 2 * Math.PI);
        ctx.fill();
    }
    canvas.onmouseleave = function () {
        drawGraph(ctx, canvas, canvasR, attempts, r);
    }
    canvas.onmousedown = function (e) {
        const x = ((e.offsetX / canvas.width) * (5 * r / 2) - (5 / 4) * r).toFixed(3)
        const y =  ((5 / 4) * r - (e.offsetY / canvas.width) * (5 * r / 2)).toFixed(3);
        addAttempt({x: x, y: y, r: r, result: checkArea(x, y, r)});
    }
}

function checkArea(x, y, r) {
    const res =  (x >= 0 && y >= 0 && x * x + y * y <= r * r / 4) ||
        (x <= 0 && y <= 0 && x >= -r  && y >= -r / 2) ||
        (x >= 0 && y <= 0 && y >= x / 2 - r / 2);
    return res;
}


function mapDispatchToGraphProps(dispatch) {
    return {
        addAttempt: (attempt) => dispatch(fetchAddAttempts(attempt)),
    }
}

function mapStateToGraphProps(state) {
    return {
        attempts: state.attempts,
        r: state.r
    }
}

export default connect(mapStateToGraphProps, mapDispatchToGraphProps)(Canvas);