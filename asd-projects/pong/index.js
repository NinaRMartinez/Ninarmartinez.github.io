/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

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
  
}
function makeGameItem(id){
  var gameItem = {}
  gameItem.x = parseFloat($(id).css("left"));
  gameItem.y = parseFloat($(id).css("top"));
  gameItem.id = parseFloat($(id).css("id"));
  gameItem.width = parseFloat($(id).css("width"));
  gameItem.height = parseFloat($(id).css("height"));
  gameItem.speedX = 1;
  gameItem.speedY = 1;
}
var KEY = { // magic numbers
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  UP: 38
}
function handleKeyDown(event) { // handles all keydown events for arrows
  if (event.which === KEY.LEFT) {
    ball.speedX = -5;
    console.log("LEFT pressed");
  }
  if (event.which === KEY.UP) {
    ball.speedY = -5;
    console.log("UP pressed");
  }
  if (event.which === KEY.RIGHT) {
    ball.speedX = 5;
    console.log("RIGHT pressed");
  }
  if (event.which === KEY.DOWN) {
    ball.speedY = 5;
    console.log("DOWN pressed");
  }
  
}
//handles movement on keyup
function handleKeyUp(event){ // handles all keyup events for arrows
  if (event.which === KEY.LEFT) {
    ball.speedX = 0;
    console.log("LEFT released");
  }
  if (event.which === KEY.UP) {
    ball.speedY = 0;
    console.log("UP released");
  }
  if (event.which === KEY.RIGHT) {
    ball.speedX = 0;
    console.log("RIGHT released");
  }
  if (event.which === KEY.DOWN) {
    ball.speedY = 0;
    console.log("DOWN released");
  }
}
function startBall(){
  var ball = {}
  ball.startingPositionX = 2;
  ball.startingPositionY = 2;
  ball.speed = 1
}
//THIS WHERE U STOPPED MAY8