//Conway's Game of Life Implementation in JS
//Made with <3 by Shrey Ravi

//constants
const screenWidth = 640.0; //the fixed width/height of the grid
let dimensions = 64; //meaning a dimensions x dimensions grid
let gridLinesChecked = true;
let color = 'black';
let population_density = 0.45;
let FPS = 10;
var RUNNING;

//initiate 2D array to store universe
var universe = Array(dimensions).fill().map(() => Array(dimensions).fill(0));

//helper to change FPS
function changeFPS() {
    const newFPS = document.getElementById("fps-range").value;
    document.getElementById("fps-label").innerHTML = "FPS(" + newFPS + "): ";
    FPS = newFPS;
    clearInterval(RUNNING);
    startup();
}

//helper to change Population Density
function changePopulationDensity() {
    let newPopulationDensity = document.getElementById("pop-range").value;
    document.getElementById("pop-label").innerHTML = "Population Density(" + newPopulationDensity + "/100): ";
    population_density = (newPopulationDensity / 100);
}

//helper function to find the number of live neighbors for a given coordinate
function getNumNeighbors(x, y) {
    let n = 0;
    //Moore Neighborhood
    //NW - (-1, -1)
    if(((x - 1) >= 0) && ((y - 1) >= 0) && (universe[x - 1][y - 1] == 1)) {
        n++;
    }
    //N - (0, -1)
    if(((y - 1) >= 0) && (universe[x][y - 1] == 1)) {
        n++;
    }
    //NE - (1, -1)
    if(((x + 1) < dimensions) && ((y - 1) >= 0) && (universe[x + 1][y - 1] == 1)) {
        n++;
    }
    //W - (-1, 0)
    if(((x - 1) >= 0) && (universe[x - 1][y] == 1)) {
        n++;
    }
    //E - (1, 0)
    if(((x + 1) < dimensions) && (universe[x + 1][y] == 1)) {
        n++;
    }
    //SW - (-1, 1)
    if(((x - 1) >= 0) && ((y + 1) < dimensions) && (universe[x - 1][y + 1] == 1)) {
        n++;
    }
    //S - (0, 1)
    if(((y + 1) < dimensions) && (universe[x][y + 1] == 1)) {
        n++;
    }
    //SE - (1, 1)
    if(((x + 1) < dimensions) && ((y + 1) < dimensions) && (universe[x + 1][y + 1] == 1)) {
        n++;
    }
    //return count of neighbors
    return n;
}

//function to update the universe
function updateUniverse() {
    //here is where we put Conway's game into play
    var outer;
    var inner;

    var new_universe = JSON.parse(JSON.stringify(universe));

    for (outer = 0; outer < dimensions; outer++) {
        for (inner = 0; inner < dimensions; inner++) {
            let num_neighbors = getNumNeighbors(outer, inner);

            //RULE 1: Any live cell with 2/3 neighbors survives
            if ((universe[outer][inner] == true) && ((num_neighbors == 2) || (num_neighbors == 3))) {
                new_universe[outer][inner] = 1;
            }
            //RULE 2: Any dead cell with 3 living neighbors is born
            else if ((universe[outer][inner] == 0) && (num_neighbors == 3)) {
                new_universe[outer][inner] = 1;
            }
            //RULE 3: Any other living cells will die, dead cells will stay dead
            else {
                new_universe[outer][inner] = 0;
            }
        }
    }

    //deep copy
    for (outer = 0; outer < dimensions; outer++) {
        for (inner = 0; inner < dimensions; inner++) {
            universe[outer][inner] = new_universe[outer][inner];
        }
    }
}

//helper method to draw a blank grid, takes in screenWidth and dimensions
function draw(dim, wid) {
    document.getElementById("board").innerHTML = "";
    let widthOfSquares = Math.floor(wid / dim);
    document.getElementById("board").style.gridTemplateColumns = 'repeat(${dim}, 1fr)';
    document.getElementById("board").style.gridTemplateRows = 'repeat(${dim}, 1fr)';
    document.getElementById("board").style.padding = '0px';
    document.getElementById("board").style.margin = '0px';
    if (gridLinesChecked) {
        document.getElementById("board").style.border = "0px black solid";
    }
    else {
        document.getElementById("board").style.border = "1px black solid";
    }
    var inner_iter = 0;
    var outer_iter;
    var wrapperDiv;
    for (outer_iter = 0; outer_iter < dim; outer_iter++) {
        wrapperDiv = document.createElement("div");
        wrapperDiv.style.display = 'flex';
        wrapperDiv.style.flexDirection = 'row';
        wrapperDiv.style.margin = '0px';
        wrapperDiv.style.padding = '0px';
        wrapperDiv.style.maxWidth = '640px';
        for (inner_iter = 0; inner_iter < dim; inner_iter++) {

            let newDiv = document.createElement("div");
            newDiv.style.width = widthOfSquares.toString() + "px";
            newDiv.style.height = widthOfSquares.toString() + "px";

            if(universe[outer_iter][inner_iter] == 1)
                colorTile(newDiv);
            if (gridLinesChecked)
                newDiv.style.border = '0.02px black solid';
            newDiv.style.margin = '0px';
            newDiv.style.padding = '0px';
            wrapperDiv.appendChild(newDiv);
        }
        document.getElementById("board").appendChild(wrapperDiv);
    }
    updateUniverse();
}

//helper function to generate a random color
function getRandColor(possibleChars) {
    let color = "#";
    var iter;
    for (iter = 0; iter < 6; iter++) {
        color += possibleChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

//function to color each div when clicked
function colorTile(tileToColor) {
    //if (!isMouseDown){
        //return;
    //}
    if (color === "black") {
        tileToColor.style.background = "black";
    }
    else if (color === "random") {
        tileToColor.style.background = getRandColor("0123456789ABCDEF");
    }
    else {
        console.log("error: incorrect color setting");
    }
}

//called when the CGOL is first loaded
function startup() {
    clearScreen();
    randomize();
    RUNNING = setInterval(() => {clearScreen();}, Math.round(1000 / FPS));
}

//called when the resize button is clicked
function resize() {
    let newDim = prompt("Please enter the new dimensions (X by X grid, max 640): ");
    if (parseInt(newDim) > 640) {
        alert("Sorry, maximum dimensions are 640!");
        dimensions = 640;
    }
    else if (newDim === null) {
        alert("Error: incorrect or blank input!");
        return;
    }
    else {
        dimensions = parseInt(newDim);
    }
    document.getElementById("board").innerHTML = "";
    draw(dimensions, screenWidth);
}

//called when the clear button is clicked
function clearScreen() {
    document.getElementById("board").innerHTML = "";
    draw(dimensions, screenWidth);
}

//called when the color select is manipulated
function colorChange() {
    const currColor = document.getElementById("color-select").value;
    color = currColor;
}

//called when the grid lines checkbox is changed
function gridLinesChange() {
    gridLinesChecked = document.getElementById("grid-lines-checkbox").checked;
    document.getElementById("board").innerHTML = "";
    draw(dimensions, screenWidth);
}

//called when the starting seed needs to be randomized
function randomize() {
    var inner;
    var outer;
    for (outer = 0; outer < dimensions; outer++) {
        for (inner = 0; inner < dimensions; inner++) {
            universe[outer][inner] = 1 ? Math.random() <= population_density : 0;
        }
    }
}