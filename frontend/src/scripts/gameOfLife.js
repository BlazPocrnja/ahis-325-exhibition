// This function runs every time the page finishes loading/navigating
document.addEventListener('astro:page-load', () => {
const canvas = document.getElementById("golCanvas");
if (!canvas) return; // Exit if the canvas isn't on this specific page

const ctx = canvas.getContext("2d");
const LEN = 10;
let WIDTH, HEIGHT, cols, rows, myGol;

function initMatrix() {
    myGol = new Array(cols + 2);
    for (let i = 0; i < cols + 2; i++) {
        myGol[i] = new Array(rows + 2).fill(0);
        for (let j = 0; j < rows + 2; j++) {
            myGol[i][j] = Math.random() > 0.8 ? 1 : 0; 
        }
    }
}

function setDimensions() {
    WIDTH = canvas.width = canvas.offsetWidth;
    HEIGHT = canvas.height = canvas.offsetHeight;
    cols = Math.floor(WIDTH / LEN);
    rows = Math.floor(HEIGHT / LEN);
    initMatrix(); // Re-seed the game so it fills the new space
}

setDimensions();

window.addEventListener('resize', setDimensions);

function draw(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * LEN, y * LEN, LEN, LEN);
}

function nextStep() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    let golTmp = Array.from({ length: cols + 2 }, () => new Array(rows + 2).fill(0));

    for (let xVal = 1; xVal <= cols; xVal++) {
        for (let yVal = 1; yVal <= rows; yVal++) {
            let neighbors = 
                myGol[xVal-1][yVal-1] + myGol[xVal][yVal-1] + myGol[xVal+1][yVal-1] +
                myGol[xVal-1][yVal]                         + myGol[xVal+1][yVal] +
                myGol[xVal-1][yVal+1] + myGol[xVal][yVal+1] + myGol[xVal+1][yVal+1];

            if (myGol[xVal][yVal] === 1) {
                if (neighbors === 2 || neighbors === 3) {
                    golTmp[xVal][yVal] = 1;
                    draw(xVal - 1, yVal - 1, "rgba(0, 0, 0, 0.4)");
                }
            } else if (neighbors === 3) {
                golTmp[xVal][yVal] = 1;
                draw(xVal - 1, yVal - 1, "rgba(0, 0, 0, 0.2)");
            }
        }
    }
    myGol = golTmp.map(row => [...row]);
}

// Store interval ID so we can clear it if needed
const interval = setInterval(nextStep, 100);

// CLEANUP: Prevent memory leaks when navigating away
document.addEventListener('astro:before-preparation', () => {
    clearInterval(interval);
    window.removeEventListener('resize', setDimensions);
}, { once: true });
});