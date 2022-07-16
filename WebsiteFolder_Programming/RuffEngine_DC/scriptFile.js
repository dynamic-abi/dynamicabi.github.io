//global elements
var pointsArr;

//Important note about trianglesArr: The points of a triangle have to be declared in counter clockwise order. Do NOT mix the order up.
var trianglesArr;

var worldIHat, worldJHat, worldKhat;
var camIHat, camJHat, camKHat;



var gridRows = 10;
var gridColumns = 10;


//array with 3 vals. This represents the centerpoint of the cam
var camCoords;

//the ROCompensatorHorz compensates for angle differences between origin and cam horizontally.
var camXPlaneToOriginAngle;

//To do watermelon : make sure you factor in camROCompensatorVert for vertical angle differences.
var camROCompensatorVert;


var camRO;
var camROVert;


//these represent the dimensions. If the width is 4, then the centerpoint is at 2. The measurement units are the standard ones for the grid (1 unit on the cam = 1 unit on the grid)
var camWidth = 10;
var camHeight = 10;

//this value is the angle at which all the points on the scene should shoot rays (it directly corresponds to the camRO). Might be useless, but just use it
var projectionRO

//cam screen displacement vector. Will be used to decide where to draw the points (how much to displace from original position)
//Note that this is a 2 value array that only represents where on the cam's POV the displacement should be. These coords do not track its position in the 3D space.
var camScreenDV;





//canvas elements
//TV canvas
var TVcanvas = document.getElementById('TVCanvas');
var TVCTX = TVcanvas.getContext('2d');

//CamV Canvas
var CamVCanvas = document.getElementById('CamCanvas');
var CamVCTX = CamVCanvas.getContext('2d');



//Toggle switches
var projectionRaysTVToggleSwitch = false;
var projectionRaysTVStrongToggleSwitch = false;





//will intialize the camera, worldHats, camHats, and all points. The camera will point direcly at the worldhats initially
function initializeScene(){

  camCoords = [0, 0, -3];
  camRO = 0;



  camROVert = 0;
  projectionRO = 0;

  worldIHat = [1, 0, 0];
  worldJHat = [0, 1, 0];
  worldKhat = [0, 0, 1];

  camIHat = [1, 0, 0];
  camJHat = [0, 1, 0];
  camKHat = [0, 0, 1];

  camScreenDV = [0, 0];

  pointsArr = [[1, 1, 1], [2, 1, 1], [2, 2, 1], [1, 2, 1],
               [1, 1, 2], [2, 1, 2], [2, 2, 2], [1, 2, 2]

  ];

  //points must be in counter clockwise order.
  trianglesArr = [
                  //front face
                  [[1, 1, 1], [2, 1, 1], [2, 2, 1]],
                  [[1, 1, 1], [2, 2, 1], [1, 2, 1]],

                   //eastside face
                  [[2, 1, 1], [2, 1, 2], [2, 2, 2]],
                  [[2, 1, 1], [2, 2, 2], [2, 2, 1]]


                  ];


}









function render(){

  renderTV();

  renderCamV();

 // renderSV();

  displayText();

}


function renderTV(){

  drawGridTV();

  drawCamTV();

  drawWorldHatsTV();

  drawCamHatsTV();

  drawCamDistToOrigin();

  drawCamNormalsTV();

  drawProjectionRaysTV();

  drawProjectionRaysTVStrong();


  displayText();

  /**
  drawCamROArcTV();







  */



}


function renderCamV(){

  //CamVCTX.clearRect(0, 0, CamVCanvas.width, CamVCanvas.height);

  drawCamScreenGridCamV();

  calculateCamScreenDV();

  drawCamScreenDVCamV();

  //temporarily commented out
  //old function. Use draw triangles CamV instead
  //drawPointsCamV();

  drawTrianglesCamV();

  drawCamHatsCamV();



}







//START OF TOGGLE FUNCTIONS

//start of TV toggle functions
//will draw projection rays at the "appropriate" length
function drawProjectionRaysTV(){
  //checking if switch is turned on
  if(projectionRaysTVToggleSwitch != true){

    //NOTE: If the shoot rays function is not working, then use this function below
    drawProjectionRaysWorldHatsTVImproved();
   //using the shoot rays function to shoot at the right angle according to camRO. Length is not being considered this moment, so just shooting beyond the canvas because ultimately its the intersection which needs to be checked

  //drawProjectionRaysWorldHatsTVRayShootMethod();


  }

  //inner function: will draw the camHats's projected rays
  function drawProjectionRaysWorldHatsTV(){

    //concept: just draw from camHatCoord to CamScreen (but push it through a displacement channel before it lands on the cam)

    //CamI^
    //let displacedX = camIHat[0] + camScreenDV[0];
    //drawLineFCImproved(TVcanvas, TVCTX, camIHat[0], [camIHat[2]], displacedX,  )


    //new concept:
    //calculate distance from camHat tip to camCenter


    //new concept:
    //just replicate drawCamNormalsTV
    //but in the drawLineFC,
    //change org coords to the currnet
    //one in the loop.
    //and displace the destination by the coord's inherent coords
    let camDistSquared = Math.pow(camCoords[0],2) + Math.pow(camCoords[2],2);
    let camDist = Math.sqrt(camDistSquared);

    //dealing with I^
    //TO DO : watermelon : You need to add some value to virtualX and virtualY so that it will land exactly on the screen. Right now it is in the correct angle but it is not shooting far enough. So find out what you need. Do the trig.
    let virtualIX = camCoords[0] + (Math.cos(camRO)*camScreenDV[0]) + worldIHat[0];
    let virtualIY = camCoords[2] + (-(Math.sin(camRO))*camScreenDV[0]) + worldIHat[2];

    //adding the camHat to worldHat distance: sin(RO) = opp/hyp (hyp is 1)

    TVCTX.setLineDash([4, 7]);
    drawLineFCImproved(TVcanvas, TVCTX, worldIHat[0], worldIHat[2], virtualIX, virtualIY, "Orange");
    TVCTX.setLineDash([]);


    //dealing with J^
    //TO DO : watermelon : You need to add some value to virtualX and virtualY so that it will land exactly on the screen. Right now it is in the correct angle but it is not shooting far enough. So find out what you need. Do the trig.
    let virtualJX = camCoords[0] + (Math.cos(camRO)*camScreenDV[0]) + worldJHat[0];
    let virtualJY = camCoords[2] + (-(Math.sin(camRO))*camScreenDV[0]) + worldJHat[2];

    TVCTX.setLineDash([4, 7]);
    drawLineFCImproved(TVcanvas, TVCTX, worldJHat[0], worldJHat[2], virtualJX, virtualJY, "Orange");
    TVCTX.setLineDash([]);



    //dealing with K^
    let virtualKX = camCoords[0] + (Math.cos(camRO)*camScreenDV[0]) + worldKhat[0];
    let virtualKY = camCoords[2] + (-(Math.sin(camRO))*camScreenDV[0]) + worldKhat[2];

    TVCTX.setLineDash([4, 7]);
    drawLineFCImproved(TVcanvas, TVCTX, worldKhat[0], worldKhat[2], virtualKX, virtualKY, "Orange");
    TVCTX.setLineDash([]);







  }

  function drawProjectionRaysWorldHatsTVImproved(){

    //dealing with WI^
    //step 1: calculated distFromCamCenterToPoint
    let iHatXDisp = worldIHat[0] - camCoords[0];
    let iHatZDisp = worldIHat[2] - camCoords[2];
    //verify
    let distToPoint = Math.sqrt(Math.pow(iHatXDisp, 2) + Math.pow(iHatZDisp, 2));

    let rayLength = Math.sqrt(Math.pow(distToPoint, 2) - Math.pow(camScreenDV[0], 2));

    console.log("raylength: " + rayLength);
    //now find the landing point of the ray
    let landXDisp = rayLength * Math.cos((Math.PI/2)-camRO);
    let landYDisp = rayLength * Math.sin((Math.PI/2)-camRO);

    console.log("landXDisp:" + landXDisp);
    console.log("landYDisp: " + landYDisp);

    TVCTX.setLineDash([4, 7]);
    drawLineFCImproved(TVcanvas, TVCTX, worldIHat[0], worldIHat[2], worldIHat[0]-(landXDisp*1), worldIHat[2]-(landYDisp*1), "Orange");
    TVCTX.setLineDash([]);





  }

}

//will draw projection rays at an "infinite" length
function drawProjectionRaysTVStrong(){

  if(projectionRaysTVStrongToggleSwitch != true) {

    drawProjectionRaysWorldHatsTVRayShootMethod();

  }



  function drawProjectionRaysWorldHatsTVRayShootMethod(){

    //dealing with worldI^
    //might have to turn camRO negative here
    shootRay(TVcanvas, TVCTX, worldIHat[0], worldIHat[2], camRO+(Math.PI), 10, "Orange");

    shootRay(TVcanvas, TVCTX, worldJHat[0], worldJHat[2], camRO+(Math.PI), 10, "Orange");

    shootRay(TVcanvas, TVCTX, worldKhat[0], worldKhat[2], camRO+(Math.PI), 10, "Orange");



  }


}
//end of TV toggle functions


//start of toggle switches
function toggleProjectionRaysTV(){
  if(projectionRaysTVToggleSwitch==false) {
    projectionRaysTVToggleSwitch = true;
  }

  else{
    projectionRaysTVToggleSwitch = false;
  }
}


function toggleProjectionRaysTVStrong(){
  if(projectionRaysTVStrongToggleSwitch==false){
    projectionRaysTVStrongToggleSwitch = true;
  }

  else{
    projectionRaysTVStrongToggleSwitch = false;
  }


}
//end of toggle switches


//END OF TOGGLE FUNCTIONS



//START OF DRAW FUNCTIONS

//<<start of TV draw functions>>

function drawGridTV(){

  var columnUnitLength = TVcanvas.width / gridColumns;
  var rowUnitLength = TVcanvas.height / gridRows;

  TVCTX.strokeStyle = "Grey";

  for(let x=0; x<=TVcanvas.width; x=x+columnUnitLength){

    if(x==TVcanvas.width/2){x=x+columnUnitLength;}

    TVCTX.beginPath();
    TVCTX.moveTo(x, 0);
    TVCTX.lineTo(x, TVcanvas.height);
    TVCTX.stroke();

  }


  for(y=0; y<=TVcanvas.height; y=y+rowUnitLength){

    if(y==TVcanvas.height/2){y=y+rowUnitLength;}

    TVCTX.beginPath();
    TVCTX.moveTo(0, y);
    TVCTX.lineTo(TVcanvas.width, y);
    TVCTX.stroke();


  }


  //drawing the axis

  TVCTX.strokeStyle = "Red";

  TVCTX.beginPath();
  TVCTX.moveTo(TVcanvas.width/2, 0);
  TVCTX.lineTo(TVcanvas.width/2, TVcanvas.height);
  TVCTX.stroke();


  TVCTX.beginPath();
  TVCTX.moveTo(0, TVcanvas.height/2);
  TVCTX.lineTo(TVcanvas.width, TVcanvas.height/2);
  TVCTX.stroke();


}

function drawCamTV(){


  //y(TV) is z
  //x(TV) is x

  TVCTX.strokeStyle = "Orange";

  let convertedCoordsCamOrigin = getCanvasCoordsOfActualCoords(camCoords[0], camCoords[2]);


  TVCTX.beginPath();
  //moving to center of cam
  TVCTX.moveTo(convertedCoordsCamOrigin[0], convertedCoordsCamOrigin[1]);


  let convertedCoordsDestLeftSide = getCanvasCoordsOfActualCoords(camCoords[0]+(Math.cos(camRO)*(camWidth/2)), camCoords[2]-(Math.sin(camRO)*(camWidth/2)));

  //now use the camRO to find out where the ends of the should be.
  //x = cos(RO) * (camWidth/2);
  //y = sin(RO) * (camWidth/2);


  TVCTX.lineTo((convertedCoordsDestLeftSide[0]), (convertedCoordsDestLeftSide[1]));

  /**
  console.log("camRO: " + camRO);
  console.log("Math.cos(camRO):" + Math.cos(camRO));
  console.log("Math.sin(camRO):" + Math.sin(camRO));
  console.log("lineToX: " + Math.cos(camRO)*(camWidth/2) + " ; lineToY: " + Math.sin(camRO)*(camWidth/2));
  */
  TVCTX.stroke();

  TVCTX.strokeStyle = "Green";

  TVCTX.beginPath();
  TVCTX.moveTo(convertedCoordsCamOrigin[0], convertedCoordsCamOrigin[1]);


  let convertedCoordsDestRightSide = getCanvasCoordsOfActualCoords((camCoords[0]-(Math.cos(camRO)*(camWidth/2))), (camCoords[2]+(Math.sin(camRO)*(camWidth/2))));

  TVCTX.lineTo(convertedCoordsDestRightSide[0], convertedCoordsDestRightSide[1]);
  TVCTX.stroke();

  //now drawing the centerpoint pole
  TVCTX.strokeStyle = "#00eaff";
  TVCTX.beginPath();
  TVCTX.moveTo(convertedCoordsCamOrigin[0], convertedCoordsCamOrigin[1]);

  let convertedCoordsCenterPole = getCanvasCoordsOfActualCoords(camCoords[0]+(Math.sin(camRO)), camCoords[2]+(Math.cos(camRO)))

  TVCTX.lineTo(convertedCoordsCenterPole[0], convertedCoordsCenterPole[1]);
  TVCTX.stroke();


  //now drawing the cam's screen grid lines
  drawCamScreemGridLinesTV();


  //first move to center, then find out the unit length for each cam grid square
  //we are now finding the length for covering 1 unit (so that's why we're not multiply cos(RO) with anything, because the hypoteneuse is 1)
  let unitIncrementLeftSideCoords = getCanvasCoordsOfActualCoords(Math.cos(camRO), Math.sin(camRO));



  //inner function
  function drawCamScreemGridLinesTV(){

    //Simply divide each canvas coordinate of each "wing" of the camera by how many ever units that wing has. You must move that distance on that axis

    //Dealing with right side:
    //these are how much it should increment each time on each axis
    let rightSideUnitX = (Math.cos(camRO));
    let rightSideUnitY = -(Math.sin(camRO));


    let currGridMarkerX = camCoords[0];
    let currGridMarkerY = camCoords[2];

    TVCTX.beginPath();
    TVCTX.fillStyle = "Blue";


    //Start on the center of the cam. And Increment by the above unit values
    for(let x=0; x<camWidth/2; x=x+1){

      //convert to canvasCoords
      let currGridMarkerCanvasCoords = getCanvasCoordsOfActualCoords(currGridMarkerX, currGridMarkerY);

      //draw on canvas
      TVCTX.arc(currGridMarkerCanvasCoords[0], currGridMarkerCanvasCoords[1], 5, 0, 2*Math.PI);
      TVCTX.fill();

      //increment formal coords
      currGridMarkerX = currGridMarkerX + rightSideUnitX;
      currGridMarkerY = currGridMarkerY + rightSideUnitY;

    }



    //dealing with the left side
    let leftSideUnitX = -(Math.cos(camRO));
    let leftSideUnitY = (Math.sin(camRO));

    currGridMarkerX = camCoords[0];
    currGridMarkerY = camCoords[2];

    TVCTX.beginPath();
    TVCTX.fillStyle = "Orange";

    for(let x=0; x<camWidth/2; x=x+1){

      //convert to canvasCoords
      let currGridMarkerCanvasCoords = getCanvasCoordsOfActualCoords(currGridMarkerX, currGridMarkerY);

      //draw on canvas
      TVCTX.arc(currGridMarkerCanvasCoords[0], currGridMarkerCanvasCoords[1], 5, 0, 2*Math.PI);
      TVCTX.fill();

      //increment formal coords
      currGridMarkerX = currGridMarkerX + leftSideUnitX;
      currGridMarkerY = currGridMarkerY + leftSideUnitY;

    }



  }


}

function drawWorldHatsTV(){



  //drawing IHat
  drawLineFC(TVCTX, 0, 0, worldIHat[0], worldIHat[1], "Orange");
  fillTextFC(TVCTX, worldIHat[0], worldIHat[1], "Orange", "WI^");

  //drawing JHat (Not really necessary to keep this in the TV. It will just overcrowd everything)
  //drawLineFC(TVCTX, 0, 0, 0, 0, "Orange");
  //fillTextFC(TVCTX, 0, 0, "Orange", "WJ^");

  //drawingKHat
  drawLineFC(TVCTX, 0, 0, worldKhat[0], worldKhat[2], "Orange");
  fillTextFC(TVCTX, worldKhat[0], worldKhat[2], "Orange", "WK^");

}

function drawCamHatsTV(){

  //X: sin(RO), Y: cos(RO)

  //drawning I^
  //old line below (DO NOT DELETE, Might come in handy for reference)
 // drawLineFC(TVCTX, 0, 0, (Math.cos(camRO)), -(Math.sin(camRO)), "Blue");
  drawLineFC(TVCTX, 0, 0, camIHat[0], camIHat[2], "Blue");

  //drawing K^
  //old line below (DO NOT DELETE, Migt come in handy for reference)
 // drawLineFC(TVCTX, 0, 0, (Math.sin(camRO)), (Math.cos(camRO)), "Blue");
  drawLineFC(TVCTX, 0, 0, camKHat[0], camKHat[2], "Green");






}

//this is basically the distance between the camera and the origin of the hats (0, 0). DO NOT confuse this with the displacement vector of the camScreen itself
function drawCamDistToOrigin(){

  TVCTX.setLineDash([4, 7]);
  drawLineFC(TVCTX, 0, 0, camCoords[0], camCoords[2], "Green");
  TVCTX.setLineDash([]);

}


//will draw a dotted line from the camHats to the camera screen, which will land on the spot that marks the tail of the camScreenDV
function drawCamNormalsTV(){


  //first calculating the distance from cam to origin
  //use pythagorean theorem
  let camDistSquared = Math.pow(camCoords[0],2) + Math.pow(camCoords[2],2);
  let camDist = Math.sqrt(camDistSquared);

  //the camScreenDV might exist on the cam's screen locally, but we are calculating the virtual position of where it exists in the world so we know where to draw the line
  let camScreenDVVirtualXCoord = camCoords[0] + (Math.cos(camRO)*camScreenDV[0]);
  let camScreenDVVirtualYCoord = camCoords[2] + (-(Math.sin(camRO))*camScreenDV[0]);



  TVCTX.setLineDash([4, 7]);
  drawLineFC(TVCTX, 0, 0, camScreenDVVirtualXCoord, camScreenDVVirtualYCoord, "Green" );

  TVCTX.setLineDash([]);


}

//will draw a yellow line representing the camScreenDV on the top view. Will also print a numeric reading of the value
//Make sure to use the camScreenDV variable when drawing this. Don't organically calculate it. This is to make sure all the values are correct
function drawCamScreenDVTV(){


  //draw from camCenter to unspecified location. Use the linear equation (y=mx+c) and see where it goes.



  //use linear equation. Use the camRO to the find the slope (m) and the cam's Z-coordinate to find the y intercept (b). Then increment your line's coordinate with this equation and keep looping until you've reached the length.
  //You need to find a way to measure the line that you're drawing. Use trig to do this.


}






//<<end of TV draw functions>>


//<<start of camV draw functions>>


//Will draw the cam's screen specific grid (the one that exists locally on the screen; in other words, it remains static on the camView but rotates on all other views). draw these grid lines blue
//draw the leftside gridlines orange and the rightside grid lines blue
function drawCamScreenGridCamV(){

  var camColumnUnitLength = CamVCanvas.width / camWidth;
  var camRowUnitLength = CamVCanvas.height / camHeight;

  //drawing column Lines. Remember it using the formal coordinates so it has to start from the minimum range (formal coords) to the max range
  for(let x=-(camWidth/2); x<=camWidth/2; x=x+1){
    drawLineFCImproved(CamVCanvas, CamVCTX, x, -(camHeight), x, camHeight, "White");
  }

  //drawing row lines
  for(let y=-(camHeight/2); y<=camHeight/2; y=y+1){
    drawLineFCImproved(CamVCanvas, CamVCTX, -(camWidth), y, camWidth, y, "White");
  }


}

//will draw all the points in the pointsArr. Will use the displacement vector to decide where to draw
function drawPointsCamV(){


  let projectedTranslatedPointsArr = [0, 0, 0];
  let y=0;

  for(let x=0; x<pointsArr.length; x=x+1){

    let pointXCoord = (pointsArr[x][0]*camIHat[0]) + (pointsArr[x][1]*camJHat[0]) + (pointsArr[x][2]*camKHat[0]);

    let pointYCoord = (pointsArr[x][0]*camIHat[1]) + (pointsArr[x][1]*camJHat[1]) + (pointsArr[x][2]*camKHat[1]);

    let pointZCoord = (pointsArr[x][0]*camIHat[2]) + (pointsArr[x][1]*camJHat[2]) + (pointsArr[x][2]*camKHat[1]);

    let pointXCoordTranslated = camScreenDV[0]+pointXCoord;
    let pointYCoordTranslated = camScreenDV[1]+pointYCoord;



    projectedTranslatedPointsArr[y] = [pointXCoordTranslated, pointYCoordTranslated];

    y=y+1;

    drawLineFCImproved(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], pointXCoordTranslated, pointYCoordTranslated, "Blue");

  }



  //connect the points

    for(let j=0; j<projectedTranslatedPointsArr.length; j=j+4) {
      connectFourPoints(projectedTranslatedPointsArr[j], projectedTranslatedPointsArr[j+1], projectedTranslatedPointsArr[j+2], projectedTranslatedPointsArr[j+3]);
    }


  //inner function
  function connectFourPoints(point1, point2, point3, point4){

    //p1 to p2:
    drawLineFCImproved(CamVCanvas, CamVCTX, point1[0], point1[1], point2[0], point2[1], "Red");

    //p2 to p3:
    drawLineFCImproved(CamVCanvas, CamVCTX, point2[0], point2[1], point3[0], point3[1], "Red");

    //p3 to p4:
    drawLineFCImproved(CamVCanvas, CamVCTX, point3[0], point3[1], point4[0], point4[1], "Red");

    //p4 to p1:
    drawLineFCImproved(CamVCanvas, CamVCTX, point4[0], point4[1], point1[0], point1[1], "Red");



  }


}


//will first draw the 3 points of a triangle as vectors from origin, then connect the dots. Do this for all triangles
//a triangle is an array of 3 sub arrays. A sub array is X, Y and Z of the point
function drawTrianglesCamV(){

  for(let t=0; t<trianglesArr.length; t=t+1){

    //p1
    let p1 = trianglesArr[t][0];



    let p1ProjectedX = (p1[0]*camIHat[0]) + (p1[1]*camJHat[0]) + (p1[2]*camKHat[0]);
    let p1ProjectedY = (p1[0]*camIHat[1]) + (p1[1]*camJHat[1]) + (p1[2]*camKHat[1]);
    let p1ProjectedZ = (p1[0]*camIHat[2]) + (p1[1]*camJHat[2]) + (p1[2]*camKHat[2]);

    let p1ProjectedXTranslated = p1ProjectedX + camScreenDV[0];
    let p1ProjectedYTranslated = p1ProjectedY + camScreenDV[1];

    //drawing dotted vector of this point
    drawLineFCImprovedDashed(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], p1ProjectedXTranslated, p1ProjectedYTranslated, "Pink");



    //p2
    let p2 = trianglesArr[t][1];



    let p2ProjectedX = (p2[0]*camIHat[0]) + (p2[1]*camJHat[0]) + (p2[2]*camKHat[0]);
    let p2ProjectedY = (p2[0]*camIHat[1]) + (p2[1]*camJHat[1]) + (p2[2]*camKHat[1]);
    let p2ProjectedZ = (p2[0]*camIHat[2]) + (p2[1]*camJHat[2]) + (p2[2]*camKHat[2]);

    let p2ProjectedXTranslated = p2ProjectedX + camScreenDV[0];
    let p2ProjectedYTranslated = p2ProjectedY + camScreenDV[1];

    //drawing dotted vector of this point
    drawLineFCImprovedDashed(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], p2ProjectedXTranslated, p2ProjectedYTranslated, "Pink");



    //p3
    let p3 = trianglesArr[t][2];



    let p3ProjectedX = (p3[0]*camIHat[0]) + (p3[1]*camJHat[0]) + (p3[2]*camKHat[0]);
    let p3ProjectedY = (p3[0]*camIHat[1]) + (p3[1]*camJHat[1]) + (p3[2]*camKHat[1]);
    let p3ProjectedZ = (p3[0]*camIHat[2]) + (p3[1]*camJHat[2]) + (p3[2]*camKHat[2]);

    let p3ProjectedXTranslated = p3ProjectedX + camScreenDV[0];
    let p3ProjectedYTranslated = p3ProjectedY + camScreenDV[1];

    //drawing dotted vector of this point
    drawLineFCImprovedDashed(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], p3ProjectedXTranslated, p3ProjectedYTranslated, "Pink");


    //now connecting the 3 points
    //p1 to p2
    drawLineFCImproved(CamVCanvas, CamVCTX, p1ProjectedXTranslated, p1ProjectedYTranslated, p2ProjectedXTranslated, p2ProjectedYTranslated, "Red");

    //p2 to p3
    drawLineFCImproved(CamVCanvas, CamVCTX, p2ProjectedXTranslated, p2ProjectedYTranslated, p3ProjectedXTranslated, p3ProjectedYTranslated, "Red");

    //p3 to p1
    drawLineFCImproved(CamVCanvas, CamVCTX, p3ProjectedXTranslated, p3ProjectedYTranslated, p1ProjectedXTranslated, p1ProjectedYTranslated, "Yellow");



  }




}





//will draw a yellow line (visual representation) of the camScreenDV to indicate whether its where its supposed to be and the correct length
function drawCamScreenDVCamV(){

  drawLineFCImproved(CamVCanvas, CamVCTX, 0, 0, camScreenDV[0], camScreenDV[1], "White");


}



//will draw the camhats on the camV
function drawCamHatsCamV(){

  //drawing CamIHat
  drawLineFCImproved(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], camScreenDV[0]+camIHat[0], camScreenDV[1]+camIHat[1], "Blue");

  //drawing CamJHat
  drawLineFCImproved(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], (camScreenDV[0]+camJHat[0]), (camScreenDV[1]+camJHat[1]), "Red");


  //drawing CamKHat
  drawLineFCImproved(CamVCanvas, CamVCTX, camScreenDV[0], camScreenDV[1], camScreenDV[0]+camKHat[0], camScreenDV[1]+camKHat[1], "Green");




}


//<<end of camV draw functions>>

//END OF DRAW FUNCTIONS


//START OF ACTION FUNCTIONS

function rotateCamRight(amount){

  camRO = camRO + amount;

  updateCamHats();

  calculateCamScreenDV();

  TVCTX.clearRect(0, 0, TVcanvas.width, TVcanvas.height);
  CamVCTX.clearRect(0, 0, CamVCanvas.width, CamVCanvas.height);

  renderTV();
  renderCamV();

}


function rotateCamLeft(amount){

  camRO = camRO - amount;

  updateCamHats();

  calculateCamScreenDV();

  TVCTX.clearRect(0, 0, TVcanvas.width, TVcanvas.height);
  CamVCTX.clearRect(0, 0, CamVCanvas.width, CamVCanvas.height);

  renderTV();
  renderCamV();


}

//END OF ACTION FUNCTIONS


//START OF SYSTEM FUNCTIONS (COORD AND VARIABLE UPDATING)

//will update the camHats. Must be called every time the camera rotates
function updateCamHats(){

  //updating I^

  camIHat[0] = (Math.cos(camRO));

  //TO DO Watermelon : The y value for this will be updated with looking up and down.
  //camIHat[1] = (Math.cos(camROVert));

  camIHat[2] = -(Math.sin(camRO));

  //To Do Watermelon : update J^ when implementing vertical cam rotation



  //updating K^
  camKHat[0] = (Math.sin(camRO));
  //TO DO Watermelon : The y value for this will be updated with looking up and down.

  camKHat[2] = (Math.cos(camRO));




}



//will update the CamXPlaneToOriginAngle variable
function updateCamXPlaneToOriginAngle(){

  //Steps: 90 degrees is the original basis for what you're basing of camRO of 0 on. So you need to
  //find the extra angle that is made when finding the cam distance to origin. Add this exra angle to 90.
  //if the origin is to the right of the cam, this value will be positive. If its to the left, it will be negative. Because if its ont he right, this basis angle is obtuse. If its to the left, it will be acute.

  //how to get this extra angle T.
  //Tan T = xDisplacementOfCam / zDisplacementOfCam.
  //use tan inverse

  let extraAngle = Math.atan(camCoords[0]/camCoords[2]);



  //now we have to add 90 degrees to
  camXPlaneToOriginAngle = extraAngle + (Math.PI/2);


}


//END OF SYSTEM FUNCTIONS (COORD AND VARIABLE UPDATING)



//START OF MAINTENENCE FUNCTIONS

//Will update the camScreenDV by using the camRO and cam coords
//Investigative note: Make sure the final polarity of the value is accurate. If the vector has to land to the left of the camera, it has to be negative. If it has to land right, it has to be positive.
function calculateCamScreenDV(){

  //first calculating the distance from cam to origin
  //use pythagorean theorem
 let camDistSquared = Math.pow(camCoords[0],2) + Math.pow(camCoords[2],2);
 let camDist = Math.sqrt(camDistSquared);


  updateCamXPlaneToOriginAngle();

 camScreenDV[0] = -(Math.cos(camXPlaneToOriginAngle - camRO) * camDist);


 //TO DO Watermelon : You need to calculate the y coordinate of the DV. camScreenDV[1];

  console.log("CamScreenDV: " + camScreenDV[0]);


}


//Will take in an source point (of the ray), an angle (in radians), a length, and color. It will shoot a ray from the source point at the specified angle, and it will shoot it for that length. The ray will be the specified color
//note: might not be a good idea to organically draw a ray with each increment because it will be processor intensive
function shootRay(canvas, ctx, srcX, srcY, angle, length, color){

  let xDisp = length * Math.sin(angle);
  let yDisp = length * Math.cos(angle);

  let xDest = srcX + xDisp;
  let yDest = srcY + yDisp;

  drawLineFCImproved(canvas, ctx, srcX, srcY, xDest, yDest, color);
}




//FC stands for formal coordinates. This function will take in the canvas name, the formal grid coordinates of the origin and destination of a line and the color and then draw it. It will handle canvas coordinate conversion on its own
function drawLineFC(canvas, orgX, orgY, destX, destY, color){

  let canvasOrgPoints = getCanvasCoordsOfActualCoords(orgX, orgY);
  let canvasDestPoints = getCanvasCoordsOfActualCoords(destX, destY);

  canvas.beginPath();
  canvas.strokeStyle = color;
  canvas.moveTo(canvasOrgPoints[0], canvasOrgPoints[1]);
  canvas.lineTo(canvasDestPoints[0], canvasDestPoints[1]);
  canvas.stroke();

}


function drawLineFCImproved(canvas, ctx, orgX, orgY, destX, destY, color){

  let canvasOrgPoints = getCanvasCoordsOfActualCoordsImproved(canvas, orgX, orgY);
  let canvasDestPoints = getCanvasCoordsOfActualCoordsImproved(canvas, destX, destY);

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(canvasOrgPoints[0], canvasOrgPoints[1]);
  ctx.lineTo(canvasDestPoints[0], canvasDestPoints[1]);
  ctx.stroke();

}



function drawLineFCImprovedDashed(canvas, ctx, orgX, orgY, destX, destY, color){

  ctx.setLineDash([4, 7]);
  drawLineFC(ctx, orgX, orgY, destX, destY, color);
  ctx.setLineDash([]);

}

function fillTextFC(canvas, orgX, orgY, color, text){

  let canvasCoords = getCanvasCoordsOfActualCoords(orgX, orgY);

  canvas.fillStyle = color;
  canvas.font = '12px Arial';
  canvas.fillText(text, canvasCoords[0], canvasCoords[1]);


}


function getCanvasCoordsOfActualCoordsImproved(canvas, formalXCoord, formalYCoord){

  var minXCoord = -(gridColumns/2);
  var maxXCoord = (gridColumns/2);

  var minYCoord = -(gridRows/2);
  var maxYCoord = (gridRows/2);

  //these are the coordinates according to the positive negative orientation
  var xCanvasCoord = Math.abs(minXCoord) + formalXCoord;
  var yCanvasCoord = Math.abs(minYCoord) - formalYCoord;

  var columnUnitLength = canvas.width / gridColumns;
  var rowUnitLength = canvas.height / gridRows;

  //now we have to scale it to the actual size of the canvas
  //scaling by size of one grid square
  xCanvasCoord = xCanvasCoord * columnUnitLength;
  yCanvasCoord = yCanvasCoord * rowUnitLength;


  //now we have to flip it because HTML canvas is the other way around

  var convertedCoords = [xCanvasCoord, yCanvasCoord];

  return convertedCoords;



}


function getCanvasCoordsOfActualCoords(formalXCoord, formalYCoord){

  var minXCoord = -(gridColumns/2);
  var maxXCoord = (gridColumns/2);

  var minYCoord = -(gridRows/2);
  var maxYCoord = (gridRows/2);


  //these are the coordinates according to the positive negative orientation
  var xCanvasCoord = Math.abs(minXCoord) + formalXCoord;
  var yCanvasCoord = Math.abs(minYCoord) - formalYCoord;

  var columnUnitLength = TVcanvas.width / gridColumns;
  var rowUnitLength = TVcanvas.height / gridRows;


  //now we have to scale it to the actual size of the canvas
  //scaling by size of one grid square
  xCanvasCoord = xCanvasCoord * columnUnitLength;
  yCanvasCoord = yCanvasCoord * rowUnitLength;


  //now we have to flip it because HTML canvas is the other way around

  var convertedCoords = [xCanvasCoord, yCanvasCoord];

  return convertedCoords;
}


//Will display all the readings of all the components in the div
function displayText(){

 // document.getElementById("CSPH3 h3").innerText = "WHAT";

  let camRORounded = Math.round(camRO*100)/100;
  document.querySelector("#CamROReadingOutput").innerText = camRORounded;

  //dealing with camHats output

  let camIHatXRounded = Math.round(camIHat[0] * 100)/100;
  let camIHatYRounded = Math.round(camIHat[1]* 100)/100;
  let camIHatZRounded = Math.round(camIHat[2]*100)/100;
  document.querySelector("#CamIHatOutput").innerText = (camIHatXRounded + ", " + camIHatYRounded + ", " + camIHatZRounded);

  let camJHatXRounded = Math.round(camJHat[0] * 100)/100;
  let camJHatYRounded = Math.round(camJHat[1]* 100)/100;
  let camJHatZRounded = Math.round(camJHat[2]*100)/100;
  document.querySelector("#CamJHatOutput").innerText = (camJHatXRounded + ", " + camJHatYRounded + ", " + camJHatZRounded);


  let camKHatXRounded = Math.round(camKHat[0] * 100)/100;
  let camKHatYRounded = Math.round(camKHat[1]* 100)/100;
  let camKHatZRounded = Math.round(camKHat[2]*100)/100;
  document.querySelector("#CamKHatOutput").innerText = (camKHatXRounded + ", " + camKHatYRounded + ", " + camKHatZRounded);

  //dealing with worldHats output
  let worldIHatXRounded = Math.round(worldIHat[0] * 100)/100;
  let worldIHatYRounded = Math.round(worldIHat[1]* 100)/100;
  let worldIHatZRounded = Math.round(worldIHat[2]*100)/100;
  document.querySelector("#WorldIHatOutput").innerText = (worldIHatXRounded + ", " + worldIHatYRounded + ", " + worldIHatZRounded);

  let worldJHatXRounded = Math.round(worldJHat[0] * 100)/100;
  let worldJHatYRounded = Math.round(worldJHat[1]* 100)/100;
  let worldJHatZRounded = Math.round(worldJHat[2]*100)/100;
  document.querySelector("#WorldJHatOutput").innerText = (worldJHatXRounded + ", " + worldJHatYRounded + ", " + worldJHatZRounded);


  let worldKHatXRounded = Math.round(worldKhat[0] * 100)/100;
  let worldKHatYRounded = Math.round(worldKhat[1]* 100)/100;
  let worldKHatZRounded = Math.round(worldKhat[2]*100)/100;
  document.querySelector("#WorldKHatOutput").innerText = (worldKHatXRounded + ", " + worldKHatYRounded + ", " + worldKHatZRounded);


  //dealing with camScreenDV
  let camScreenDVX = Math.round(camScreenDV[0]*100)/100;
  let camScreenDVY = Math.round(camScreenDV[1]*100)/100;
  document.querySelector("#CamScreenDVOutput").innerText = (camScreenDVX + ", " + camScreenDVY);


}


//END OF MAINTENENCE FUNCTIONS
