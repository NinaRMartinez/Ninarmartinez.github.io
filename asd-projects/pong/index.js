/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()


function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var KEY = { // magic numbers
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  UP: 38,
   W: 87,
    A: 65,
    S: 83,
    D: 68,
  }
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height()
  // Game Item Objects
  var leftPaddle = makeGameItem("#leftPaddle");
  var rightPaddle = makeGameItem("#rightPaddle");
  var ball = makeGameItem("#ball");
  
  var player1Score = 0;
  var player2Score = 0;


  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp);
  interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(leftPaddle);
    repositionGameItem(rightPaddle);
    repositionGameItem(ball);

    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
    wallCollision(ball);

    redrawGameItem(leftPaddle);
    redrawGameItem(rightPaddle);
    redrawGameItem(ball);
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
  

  function makeGameItem(id){
    var gameItem = {};
    gameItem.x = parseFloat($(id).css("left"));
    gameItem.y = parseFloat($(id).css("top"));
    gameItem.id = id;
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    gameItem.width = parseFloat($(id).width());
    gameItem.height = parseFloat($(id).height());
    return gameItem;
  }

  function handleKeyDown(event) { // handles all keydown events for wasd
   if (event.which === KEY.W) {
      leftPaddle.speedY = -5;
      console.log("W pressed");
    }
     
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;
      console.log("DOWN pressed");
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 5;
      console.log("S pressed");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
      console.log("UP pressed");
    }
  }
   
  //handles movement on keyup
  function handleKeyUp(event){ // handles all down events for arrows
    if (event.which === KEY.W) {
        leftPaddle.speedY = 0;
        console.log("W released");
      }
      if (event.which === KEY.S) {
        leftPaddle.speedY = 0;
        console.log("S released");
      }
      if (event.which === KEY.UP) {
        rightPaddle.speedY = 0;
        console.log("UP released");
      }
      if (event.which === KEY.DOWN) {
        rightPaddle.speedY = 0;
        console.log("DOWN released");
      }
  }
  function startBall(){
    ball.x = 200;
    ball.y = 200;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function repositionGameItem(item) {
  item.x += item.speedX;
  item.y += item.speedY;
  }

 //reposition
  function redrawGameItem(item) {
  $(item.id).css("left", item.x);
  $(item.id).css("top", item.y);
  }

  function wallCollision(item) { //detects wall collissions using if statements
    let coordX = item.x;
    let coordY = item.y;
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = BOARD_WIDTH; 
    let height = BOARD_HEIGHT; 

     if(doCollide(ball,leftPaddle)) {
      //collide with left paddle
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if(coordX < 0){
      //ball collides with left wall, reset ball, increment score
      if(item.id === "#ball"){
        player2Score++;
        $("#score2").text("Player 2 Score: " + player2Score);
        if(player2Score === 7){
          endGame();
          alert("Player 2 Wins");
        }
        startBall();
      }
    }
    if (coordY < 0) {
      //collide with top wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if (coordX + item.width > width | doCollide(ball,rightPaddle)) {
      //collide with right wall
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if (coordY + item.height > height) {
      //collide with bottom wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if(coordX + item.width > width){
      //ball collides with right paddle, reset ball, increment score
      if(item.id === "#ball"){
        player1Score++;
        $("#score1").text("Player 1 Score: " + player1Score);
        if(player1Score === 7){
          endGame();
          alert("Player 1 Wins");
        }
        startBall();
      }
    }
  }
}
 function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x+square1.width;
    square1.bottomY = square1.y+square1.height;
    
    // TODO: Do the same for square2
   square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.rightX = square2.x+square2.width;
    square2.bottomY = square2.y+square2.height;

    // TODO: Return true if they are overlapping, false otherwise
      if(square1.leftX > square2.rightX){
      return false;
    } else if(square1.rightX < square2.leftX){
      return false;
    } else if(square1.topY > square2.bottomY){
      return false;
    } else if(square1.bottomY < square2.topY){
      return false;
    } else {
      return true;
    }
    // Hint: use the following conditions:
      // red left < blue right
      // red right > blue left
      // red top < blue bottom
      // red bottom > blue top
 }
