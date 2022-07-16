//Global elements
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext("2d");

var rows = 10;
var columns = 10;
var rowLength = canvas.height / rows;
var columnLength = canvas.width / columns;


var xAxis = columns/2;
var yAxis = rows/2;

var vecXCoord = 0;
var vecYCoord = 0;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridExplicit(rows, columns);
    drawVector(vecXCoord, vecYCoord);
}


function drawGrid(){

    drawGridExplicit(rows, columns);

}


//will always start at [0, 0]
function drawVector(xCoord, yCoord){

    var canvasCoords = getCanvasCoordsOfActualCoords(xCoord, yCoord);

    ctx.strokeStyle = "Yellow";
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvasCoords[0], canvasCoords[1]);
    ctx.stroke();

    console.log("xCoord: " + xCoord);
    console.log("yCoord: " + yCoord);

    console.log("canvasCoords[0]:" + canvasCoords[0]);
    console.log("canvasCoords[1]:" + canvasCoords[1]);






}


function drawVectorPreparedPoint(xCoord, yCoord){

    var canvasCoords = getCanvasCoordsOfActualCoordsPreparedPoint(xCoord, yCoord);

    ctx.strokeStyle = "Yellow";
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvasCoords[0], canvasCoords[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvasCoords[0], canvasCoords[1], 4, 0, 2*Math.PI, false);
    ctx.fillStyle = 'lawngreen';
    ctx.strokeStyle = 'lawngreen';
    ctx.fill();
    ctx.stroke();






}


function drawVectorPreparedPointTranslated(xCoord, yCoord){

    var canvasCoords = getCanvasCoordsOfActualCoordsPreparedPoint(xCoord, yCoord);

    ctx.strokeStyle = "Blue";
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvasCoords[0], canvasCoords[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvasCoords[0], canvasCoords[1], 4, 0, 2*Math.PI, false);
    ctx.fillStyle = 'Blue';
    ctx.strokeStyle = 'Blue';
    ctx.fill();
    ctx.stroke();






}





//START OF ACTION FUNCTIONS

//will increment the xCoord of the vector by one unit
function incrementXCoord(){

    vecXCoord = vecXCoord + 1;
    draw();

}

function decrementXCoord(){

    vecXCoord = vecXCoord - 1;
    draw();
}

function incrementYCoord(){

    vecYCoord = vecYCoord + 1;
    draw();
}

function decrementYCoord(){

    vecYCoord = vecYCoord - 1;
    draw();
}


//END OF ACTION FUNCTIONS


//START OF DRAW PREPARED POINT FUNCTIONS

function drawPreparedPoint(pointToDraw){

    console.log("pointToDraw: " + pointToDraw);

    var xCoordTargetBox;
    var yCoordTargetBox;

    switch (pointToDraw){

        case "P1": xCoordTargetBox = document.getElementById("P1XCoord").value;
                   yCoordTargetBox = document.getElementById("P1YCoord").value;
                   break;

        case "P2": xCoordTargetBox = document.getElementById("P2XCoord").value;
                   yCoordTargetBox = document.getElementById("P2YCoord").value;
                   break;

        case "P3": xCoordTargetBox = document.getElementById("P3XCoord").value;
                   yCoordTargetBox = document.getElementById("P3YCoord").value;
                   break;

        case "P4": xCoordTargetBox = document.getElementById("P4XCoord").value;
                   yCoordTargetBox = document.getElementById("P4YCoord").value;
                   break;

        default: break;

    }


   // var convertedCoords = getCanvasCoordsOfActualCoords(xCoordTargetBox, yCoordTargetBox);

    drawVectorPreparedPoint(xCoordTargetBox, yCoordTargetBox);

}



function rotatePreparedPoint(pointName){

    var xCoordTargetBox;
    var yCoordTargetBox;
    var rotateAmount;

    switch(pointName){

        case "P1": xCoordTargetBox = document.getElementById("P1XCoord").value;
            yCoordTargetBox = document.getElementById("P1YCoord").value;
            rotateAmount = document.getElementById("P1RotateCCAngle").value;
            break;

        case "P2": xCoordTargetBox = document.getElementById("P2XCoord").value;
            yCoordTargetBox = document.getElementById("P2YCoord").value;
            rotateAmount = document.getElementById("P2RotateCCAngle").value;
            break;

        case "P3": xCoordTargetBox = document.getElementById("P3XCoord").value;
            yCoordTargetBox = document.getElementById("P3YCoord").value;
            rotateAmount = document.getElementById("P3RotateCCAngle").value;
            break;

        case "P4": xCoordTargetBox = document.getElementById("P4XCoord").value;
            yCoordTargetBox = document.getElementById("P4YCoord").value;
            rotateAmount = document.getElementById("P4RotateCCAngle").value;
            break;

        default: break;
    }


    var iHat = [Math.cos(rotateAmount), Math.sin(rotateAmount)];
    var jHat = [(-Math.sin(rotateAmount)), Math.cos(rotateAmount)];

    var translatedX = (xCoordTargetBox * iHat[0]) + (yCoordTargetBox * jHat[0]);
    var translatedY = (xCoordTargetBox * iHat[1]) + (yCoordTargetBox * jHat[1]);


    drawVectorPreparedPointTranslated(translatedX, translatedY);

}

function connectPointsSquare(p1Coords, p2Coords, p3Coords, p4Coords){

    console.log("CPS called");
   // console.log("p1Coords[0]: " + p1Coords[0] + " ; p1Coords[1]: " + p1Coords[1]);

    var p1, p2, p3, p4;

    p1 = getCanvasCoordsOfActualCoords(p1Coords[0], p1Coords[1]);

    p2 = getCanvasCoordsOfActualCoords(p2Coords[0], p2Coords[1]);

    p3 = getCanvasCoordsOfActualCoords(p3Coords[0], p3Coords[1]);

    p4 = getCanvasCoordsOfActualCoords(p4Coords[0], p4Coords[1]);





    //p1 to p2
    ctx.beginPath();
    ctx.strokeStyle = "Red";
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();


    //p2 to p3
    ctx.beginPath();
    ctx.strokeStyle = "Red";
    ctx.moveTo(p2[0], p2[1]);
    ctx.lineTo(p3[0], p3[1]);
    ctx.stroke();

    //p3 to p4
    ctx.beginPath();
    ctx.strokeStyle = "Red";
    ctx.moveTo(p3[0], p3[1]);
    ctx.lineTo(p4[0], p4[1]);
    ctx.stroke();


    //p4 to p1
    ctx.beginPath();
    ctx.strokeStyle = "Red";
    ctx.moveTo(p4[0], p4[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.stroke();






}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}







//will rotate all points 180 degrees CC in an animation
async function rotateShapeAnimated(){

    //initial starting coords
    var p1XCoord = document.getElementById("P1XCoord").value;
    var p1YCoord = document.getElementById("P1YCoord").value;

    var p2XCoord = document.getElementById("P2XCoord").value;
    var p2YCoord = document.getElementById("P2YCoord").value;

    var p3XCoord = document.getElementById("P3XCoord").value;
    var p3YCoord = document.getElementById("P3YCoord").value;

    var p4XCoord = document.getElementById("P4XCoord").value;
    var p4YCoord = document.getElementById("P4YCoord").value;

    var rotateAmount = 0;

    var iHat;
    var jHat;

    var translatedP1XCoord, translatedP1YCoord, translatedP2XCoord, translatedP2YCoord, translatedP3XCoord, translatedP3YCoord, translatedP4XCoord, translatedP4YCoord;

    //RA = Rotate Amount
    for(var RA=0; RA<=180; RA=RA+0.01){

        console.log("RA: " + RA);

        iHat = [Math.cos(RA), Math.sin(RA)];
        jHat = [(-Math.sin(RA)), Math.cos(RA)];


        translatedP1XCoord = (p1XCoord * iHat[0]) + (p1YCoord * jHat[0]);
        translatedP1YCoord = (p1XCoord * iHat[1]) + (p1YCoord * jHat[1]);

        translatedP2XCoord = (p2XCoord * iHat[0]) + (p2YCoord * jHat[0]);
        translatedP2YCoord = (p2XCoord * iHat[1]) + (p2YCoord * jHat[1]);

        translatedP3XCoord = (p3XCoord * iHat[0]) + (p3YCoord * jHat[0]);
        translatedP3YCoord = (p3XCoord * iHat[1]) + (p3YCoord * jHat[1]);

        translatedP4XCoord = (p4XCoord * iHat[0]) + (p4YCoord * jHat[0]);
        translatedP4YCoord = (p4XCoord * iHat[1]) + (p4YCoord * jHat[1]);


        await sleep(10);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        drawVectorPreparedPointTranslated(translatedP1XCoord, translatedP1YCoord);
        drawVectorPreparedPointTranslated(translatedP2XCoord, translatedP2YCoord);
        drawVectorPreparedPointTranslated(translatedP3XCoord, translatedP3YCoord);
        drawVectorPreparedPointTranslated(translatedP4XCoord, translatedP4YCoord);

        var p1Coords = [translatedP1XCoord, translatedP1YCoord];
        var p2Coords = [translatedP2XCoord, translatedP2YCoord];
        var p3Coords = [translatedP3XCoord, translatedP3YCoord];
        var p4Coords = [translatedP4XCoord, translatedP4YCoord];

        connectPointsSquare(p1Coords, p2Coords, p3Coords, p4Coords);

    }


}


async function rotateShapeXZAnimated(rotateSpan){

    //initial starting coords
    var p1XCoord = document.getElementById("P1XCoord").value;
    var p1YCoord = document.getElementById("P1YCoord").value;
    var p1ZCoord = document.getElementById("P1ZCoord").value;

    var p2XCoord = document.getElementById("P2XCoord").value;
    var p2YCoord = document.getElementById("P2YCoord").value;
    var p2ZCoord = document.getElementById("P2ZCoord").value;

    var p3XCoord = document.getElementById("P3XCoord").value;
    var p3YCoord = document.getElementById("P3YCoord").value;
    var p3ZCoord = document.getElementById("P3ZCoord").value;

    var p4XCoord = document.getElementById("P4XCoord").value;
    var p4YCoord = document.getElementById("P4YCoord").value;
    var p4ZCoord = document.getElementById("P4ZCoord").value;

    var rotateAmount = 0;

    var iHat;
    var jHat;
    var zHat;

    var translatedP1XCoord, translatedP1YCoord, translatedP1ZCoord,
        translatedP2XCoord, translatedP2YCoord, translatedP2ZCoord,
        translatedP3XCoord, translatedP3YCoord, translatedP3ZCoord,
        translatedP4XCoord, translatedP4YCoord, translatedP4ZCoord;

    //RA = Rotate Amount

    for(var RA=0; RA<=180; RA=RA+0.01){

        iHat = [Math.cos(RA), 0, Math.sin(RA)];
        jHat = [0, 1, 0];
        zHat = [-(Math.sin(RA)), 0, Math.cos(RA)];

        translatedP1XCoord = (p1XCoord * iHat[0]) + (p1YCoord * jHat[0]) + (p1ZCoord * zHat[0]);
        translatedP1YCoord = (p1XCoord * iHat[1]) + (p1YCoord * jHat[1]) + (p1ZCoord * zHat[1]);
        translatedP1ZCoord = (p1XCoord * iHat[2]) + (p1YCoord * jHat[2]) + (p1ZCoord * zHat[2]);


        translatedP2XCoord = (p2XCoord * iHat[0]) + (p2YCoord * jHat[0]) + (p2ZCoord * zHat[0]);
        translatedP2YCoord = (p2XCoord * iHat[1]) + (p2YCoord * jHat[1]) + (p2ZCoord * zHat[1]);
        translatedP2ZCoord = (p2XCoord * iHat[2]) + (p2YCoord * jHat[2]) + (p2ZCoord * zHat[2]);

        translatedP3XCoord = (p3XCoord * iHat[0]) + (p3YCoord * jHat[0]) + (p3ZCoord * zHat[0]);
        translatedP3YCoord = (p3XCoord * iHat[1]) + (p3YCoord * jHat[1]) + (p3ZCoord * zHat[1]);
        translatedP3ZCoord = (p3XCoord * iHat[2]) + (p3YCoord * jHat[2]) + (p3ZCoord * zHat[2]);

        translatedP4XCoord = (p4XCoord * iHat[0]) + (p4YCoord * jHat[0]) + (p4ZCoord * zHat[0]);
        translatedP4YCoord = (p4XCoord * iHat[1]) + (p4YCoord * jHat[1]) + (p4ZCoord * zHat[1]);
        translatedP4ZCoord = (p4XCoord * iHat[2]) + (p4YCoord * jHat[2]) + (p4ZCoord * zHat[2]);

        await sleep(10);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid();

        drawVectorPreparedPointTranslated(translatedP1XCoord, translatedP1YCoord);
        drawVectorPreparedPointTranslated(translatedP2XCoord, translatedP2YCoord);
        drawVectorPreparedPointTranslated(translatedP3XCoord, translatedP3YCoord);
        drawVectorPreparedPointTranslated(translatedP4XCoord, translatedP4YCoord);

        var p1Coords = [translatedP1XCoord, translatedP1YCoord, translatedP1ZCoord];
        var p2Coords = [translatedP2XCoord, translatedP2YCoord, translatedP2ZCoord];
        var p3Coords = [translatedP3XCoord, translatedP3YCoord, translatedP3ZCoord];
        var p4Coords = [translatedP4XCoord, translatedP4YCoord, translatedP4ZCoord];

        connectPointsSquare(p1Coords, p2Coords, p3Coords, p4Coords);

    }

}


function rotateShapeXZAndXYAnimated(){


}







//END OF DRAW PREPARED POINT FUNCTIONS




//START OF MAINTENENCE FUNCTIONS
function drawGridExplicit(rows, columns){

    var columnUnitLength = canvas.width / columns;
    var rowUnitLength = canvas.height / rows;

    ctx.strokeStyle = "Grey";

    for(x=0; x<=canvas.width; x=x+columnUnitLength){

        if(x==canvas.width/2){x=x+columnUnitLength;}

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

    }


    for(y=0; y<=canvas.height; y=y+rowUnitLength){

        if(y==canvas.height/2){y=y+rowUnitLength;}

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();


    }

    //drawing the axis

    ctx.strokeStyle = "Red";

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();




}

//will take in formal coordinates (of where a point should be on the grid) and calculate the actual canvas coords position of that
function getCanvasCoordsOfActualCoords(formalXCoord, formalYCoord){

    var minXCoord = -(columns/2);
    var maxXCoord = (columns/2);

    var minYCoord = -(rows/2);
    var maxYCoord = (rows/2);


    //these are the coordinates according to the positive negative orientation
    var xCanvasCoord = Math.abs(minXCoord) + formalXCoord;
    var yCanvasCoord = Math.abs(minYCoord) - formalYCoord;


    //now we have to scale it to the actual size of the canvas
    //scaling by size of one grid square
    xCanvasCoord = xCanvasCoord * columnLength;
    yCanvasCoord = yCanvasCoord * rowLength;


    //now we have to flip it because HTML canvas is the other way around






    //console.log("FormalXCoord: " + formalXCoord);
    //console.log("xCanvasCoord: " + xCanvasCoord);



    var convertedCoords = [xCanvasCoord, yCanvasCoord];

    return convertedCoords;


}



function getCanvasCoordsOfActualCoordsPreparedPoint(formalXCoord, formalYCoord){

    var minXCoord = -(columns/2);
    var maxXCoord = (columns/2);

    var minYCoord = -(rows/2);
    var maxYCoord = (rows/2);

    formalXCoord = formalXCoord * -1;

    //these are the coordinates according to the positive negative orientation
    var xCanvasCoord = Math.abs(minXCoord) - formalXCoord;
    var yCanvasCoord = Math.abs(minYCoord) - formalYCoord;


    //now we have to scale it to the actual size of the canvas
    //scaling by size of one grid square
    xCanvasCoord = xCanvasCoord * columnLength;
    yCanvasCoord = yCanvasCoord * rowLength;

   // xCanvasCoord = xCanvasCoord * -1;


    //now we have to flip it because HTML canvas is the other way around






    //console.log("FormalXCoord: " + formalXCoord);
    //console.log("xCanvasCoord: " + xCanvasCoord);



    var convertedCoords = [xCanvasCoord, yCanvasCoord];

    return convertedCoords;


}

//END OF MAINTENENCE FUNCTIONS
