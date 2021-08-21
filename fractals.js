const myCanvas = document.getElementById("my_canvas");
const ctx = myCanvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

const colorChangeRate = 20;
const angleChangeRate = 15;
const branchLengthReductionRate = 0.8;
const branchWidthReductionRate = 0.8;

let iterations = 0;
let maxBranch = 0;

const draw = (startX, startY, len, angle, branchWidth, nextNum) => {
    ++iterations
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    const redValue = nextNum % 256;
    const blueValue = nextNum > 100 ? (nextNum % 256) : 0;
    const greenValue = 255 - ((colorChangeRate*(nextNum/colorChangeRate)) % 256);
    const colorString = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    ctx.strokeStyle = colorString;
    ctx.fillStyle = colorString;

    if ((nextNum/colorChangeRate) > maxBranch) {
        maxBranch++;
        console.log(`%c This is the color at stack level ${nextNum / colorChangeRate}. Color: ${colorString}`, `background: rgb(0,0,0); color: ${colorString};`);
    }

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,0.8)";

    if (len < 8) {
        ctx.restore();
        return;
    }

    draw(0, -len, len*branchLengthReductionRate, angle-angleChangeRate, branchWidth*branchWidthReductionRate, nextNum + colorChangeRate);
    draw(0, -len, len*branchLengthReductionRate, angle+angleChangeRate, branchWidth*branchWidthReductionRate, nextNum + colorChangeRate);

    ctx.restore();
}

draw(400, 600, 120, 0, 15, 0, true);
console.log(iterations);
