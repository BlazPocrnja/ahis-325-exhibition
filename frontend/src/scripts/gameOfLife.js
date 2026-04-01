var canvas = document.getElementById("golCanvas");
var ctx = canvas.getContext("2d");

// Ensure canvas matches its display size
var WIDTH = canvas.width = canvas.offsetWidth;
var HEIGHT = canvas.height = canvas.offsetHeight;

var LEN = 10;
var cols = Math.floor(WIDTH / LEN);
var rows = Math.floor(HEIGHT / LEN);
var myGol = [];

function initMatrix() {
    myGol = new Array(cols + 2);
    for (var i = 0; i < cols + 2; i++) {
        myGol[i] = new Array(rows + 2).fill(0);
        for (var j = 0; j < rows + 2; j++) {
            // Seed with random life
            myGol[i][j] = Math.random() > 0.8 ? 1 : 0; 
        }
    }
}

function draw(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * LEN, y * LEN, LEN, LEN);
}

function nextStep() {
    // 1. CLEAR THE CANVAS instead of filling it with a solid color
    // This makes the "dark pixels" transparent
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    var golTmp = new Array(cols + 2);
    for (var i = 0; i < cols + 2; i++) {
        golTmp[i] = new Array(rows + 2).fill(0);
    }

    for (var xVal = 1; xVal <= cols; xVal++) {
        for (var yVal = 1; yVal <= rows; yVal++) {
            var neighbors = 
                myGol[xVal-1][yVal-1] + myGol[xVal][yVal-1] + myGol[xVal+1][yVal-1] +
                myGol[xVal-1][yVal]                         + myGol[xVal+1][yVal] +
                myGol[xVal-1][yVal+1] + myGol[xVal][yVal+1] + myGol[xVal+1][yVal+1];

            if (myGol[xVal][yVal] === 1) {
                if (neighbors === 2 || neighbors === 3) {
                    golTmp[xVal][yVal] = 1;
                    draw(xVal - 1, yVal - 1, "rgba(0, 0, 0, 0.4)"); // White glyphs
                }
            } else {
                if (neighbors === 3) {
                    golTmp[xVal][yVal] = 1;
                    draw(xVal - 1, yVal - 1, "rgba(0, 0, 0, 0.2)"); // Faded new life
                }
            }
        }
    }
    
    // Use map to create a deep copy of the 2D array
    myGol = golTmp.map(row => [...row]);
}

initMatrix();
setInterval(nextStep, 100);