$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38
  }
  
  // Game Item Objects
  var walker = {
    walkerX: 0,
    walkerY: 0,
    speedX: 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame at 60fps
  $(document).on('keydown', handleKeyDown);                           // handling key down events
  $(document).on('keyup', handleKeyUp);                               
  $("#walker").on('click', changeColor);                              
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(walker);
    wallCollision(walker);
    redrawGameItem(walker);
    
   
  }
  
  
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      console.log("LEFT pressed");
    }
    if (event.which === KEY.UP) {
      walker.speedY = -5;
      console.log("UP pressed");
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      console.log("RIGHT pressed");
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      console.log("DOWN pressed");
    }
    
  }
  
  function handleKeyUp(event){
    if (event.which === KEY.LEFT) {
      walker.speedX = 0;
      console.log("LEFT released");
    }
    if (event.which === KEY.UP) {
      walker.speedY = 0;
      console.log("UP released");
    }
    if (event.which === KEY.RIGHT) {
      walker.speedX = 0;
      console.log("RIGHT released");
    }
    if (event.which === KEY.DOWN) {
      walker.speedY = 0;
      console.log("DOWN released");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
 
  function repositionGameItem(item) {
    //pulling all relevant data
    let speedX = item.speedX;
    let speedY = item.speedY;

    item.walkerX += speedX;
    item.walkerY += speedY;
  }
 
  function redrawGameItem(item) {
    //utilizes relavent data, except speed
    let walkerX = item.walkerX;
    let walkerY = item.walkerY;
    
    $("#walker").css("left", walkerX);
    $("#walker").css("top", walkerY);
  }
  
  function wallCollision(item) {
    //pulls relevant data and makes containers.
    let walkerX = item.walkerX;
    let walkerY = item.walkerY;
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = $("#board").width() - 45;
    let height = $("#board").height() - 45;

    if (walkerX < 0) {
      //collide with left wall
      item.walkerX -= speedX;
    }
    if (walkerY < 0) {
      //collide with top wall
      item.walkerY -= speedY;
    }
    if (walkerX > width) {
      //collide with right wall
      item.walkerX -= speedX;
    }
    if (walkerY > height) {
      //collide with bottom wall
      item.walkerY -= speedY;
    }
  }
}

  
