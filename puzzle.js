var puzzle1 = new Array ("puzzle1/img1-1.jpg", "puzzle1/img1-2.jpg", "puzzle1/img1-3.jpg", "puzzle1/img1-4.jpg", "puzzle1/img1-5.jpg", "puzzle1/img1-6.jpg",
"puzzle1/img1-7.jpg", "puzzle1/img1-8.jpg", "puzzle1/img1-9.jpg", "puzzle1/img1-10.jpg", "puzzle1/img1-11.jpg", "puzzle1/img1-12.jpg",);

var puzzle2 = new Array ("puzzle2/img2-1.jpg", "puzzle2/img2-2.jpg", "puzzle2/img2-3.jpg", "puzzle2/img2-4.jpg", "puzzle2/img2-5.jpg", "puzzle2/img2-6.jpg",
"puzzle2/img2-7.jpg", "puzzle2/img2-8.jpg", "puzzle2/img2-9.jpg", "puzzle2/img2-10.jpg", "puzzle2/img2-11.jpg", "puzzle2/img2-12.jpg",);

var puzzle3 = new Array ("puzzle3/img3-1.jpg", "puzzle3/img3-2.jpg", "puzzle3/img3-3.jpg", "puzzle3/img3-4.jpg", "puzzle3/img3-5.jpg", "puzzle3/img3-6.jpg",
"puzzle3/img3-7.jpg", "puzzle3/img3-8.jpg", "puzzle3/img3-9.jpg", "puzzle3/img3-10.jpg", "puzzle3/img3-11.jpg", "puzzle3/img3-12.jpg",);

var pick_puzzle = new Array (puzzle1, puzzle2, puzzle3);
var puzzle;
var grid = document.getElementById("grid");
var grid_left = parseInt(grid.style.left);
var grid_top = parseInt(grid.style.top);
let minute = 00;
let second = 00;
let count = 00;
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let startBtn = document.getElementById('start');
let doneBtn = document.getElementById('done');
var timer = true;
var message = "";

// Now register the event handlers for moving and dropping the word
document.addEventListener("mousemove", mover, true);
document.addEventListener("mouseup", dropper, true);

function get_img () {
    var rnd_idx = Math.trunc (Math.random() * pick_puzzle.length);
    puzzle = pick_puzzle[rnd_idx];
    for (i = 0; i < puzzle.length; i++) {
        var element = document.getElementById(i);
        element.style.left = (105 * (Math.floor(Math.random() * 12))) + "px";
        element.style.top = (450 + Math.floor(Math.random() * 100)) + "px";
        element.style.position = "absolute";
        document.getElementById(i).src = puzzle[i];
    }
}

function grabber(event) {
    if (timer == false) {
        timer = true;
        stopWatch();
        startBtn.disabled = true;
        resetBtn.disabled = true;
    }
    // Set the global variable for the element to be moved
    theElement = event.currentTarget;
    // Determine the position of the word to be grabbed, first removing the units from left and top
    posX = parseInt(theElement.style.left);
    posY = parseInt(theElement.style.top);
    // Compute the difference between where it is and where the mouse click occurred
    diffX = event.clientX - posX;
    diffY = event.clientY - posY;
}
 
// The event handler function for moving the word
function mover(event) {
    if (theElement == null) {
        return;
    }
    // Compute the new position, add the units, and move the image
    theElement.style.left = (event.clientX - diffX) + "px";
    theElement.style.top = (event.clientY - diffY) + "px";
}
 
// The event handler function for dropping the word
function dropper(event) {
    // convert screen coordinates to page coordinates if scrolling occurs
    var x = event.clientX + document.documentElement.scrollLeft;
    var y = event.clientY + document.documentElement.scrollTop;
    // check that the cursor is inside the grid during drop, if outside the grid dont snap
    if(
        x >= grid_left && x <= (grid_left + 400) &&
        y >= grid_top && y <= (grid_top + 300)
    )
    {
        // get the column # and row # of the cursor relative to the grid
        var column = Math.floor((x - grid_left) / 100);
        var row = Math.floor((y - grid_top) / 100);
        // Compute the new position, add the units, and place the image
        theElement.style.left = (grid_left + (column * 100)) + "px";
        theElement.style.top = (grid_top + (row * 100)) + "px";
    }
    theElement = null;
}

startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
    startBtn.disabled = true;
    resetBtn.disabled = true;
});

stopBtn.addEventListener('click', function () {
    timer = false;
    startBtn.disabled = false;
    resetBtn.disabled = false;
});
  
resetBtn.addEventListener('click', function () {
    get_img();
    timer = true;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    stopWatch();
    resetBtn.disabled = true;
    startBtn.disabled = true;
});

function stopWatch() {
    if (timer) {
        count++;
        if (count == 100) {
            second++;
            count = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        let minString = minute;
        let secString = second;
        if (minute < 10) {
            minString = "0" + minString;
        }
        if (second < 10) {
            secString = "0" + secString;
        }
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        setTimeout(stopWatch, 10);
    }
}

doneBtn.addEventListener('click', function () {
    timer = false;
    validate()
    document.getElementById('doneText').innerHTML = message;
    startBtn.disabled = false;
    resetBtn.disabled = false;
})

function validate() {  
    var score = 0;
    for (i = 0; i < puzzle.length; i++) {
        var piece = document.getElementById(i);
        var actual_column = (parseInt(piece.style.left) - grid_left) / 100;
        var actual_row = (parseInt(piece.style.top) - grid_top) / 100;
        
        if (actual_column == i % 4) {
            if (actual_row == Math.floor(i / 4)) {
                score ++;
            }
        }
    }
    if (score == 12) {
        message = "Congratulations! You got it!" + "<br><br>" + "Refresh the page to do another puzzle.";
    }
    else {
        message = "Incorrect! Try again.";
    }
}
