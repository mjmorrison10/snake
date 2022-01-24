const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector(".score span");
const startBtn = document.querySelector(".start");
const grid = document.querySelector(".grid");

const width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0]; // 2 - head, 1 - body, 0 - tail
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(interval);
  score = 0;
  randomApple();
  direction = 1;
  scoreDisplay.innerText = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];

  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcomes, intervalTime);
}

// function that deals with all the move outcomes of the snake

function moveOutcomes() {
  // deals with snake hitting border and snake hitting self
  if (
    (currentSnake[0] + width >= width * width && direction === width) || // if snake hits bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || // if snake hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
    (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
    squares[currentSnake[0] + direction].classList.contains("snake") // if snake hits itself
  ) {
    return clearInterval(interval);
  }

  const tail = currentSnake.pop(); // removes tail

  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  // deals with snake getting apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

// assign functions to keycodes
function control(e) {
  squares[currentIndex].classList.remove("snake");

  if (e.keyCode === 39 || e.keyCode === 68) direction = 1;
  else if (e.keyCode === 38 || e.keyCode === 87) direction = -width;
  else if (e.keyCode === 37 || e.keyCode === 65) direction = -1;
  else if (e.keyCode === 40 || e.keyCode === 83) direction = +width;
  else if (e.keyCode === 82) startGame();
}

function swipedetect(el, callback) {
  var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) {};

  touchsurface.addEventListener(
    "touchstart",
    function (e) {
      let touchobj = e.changedTouches[0];
      swipedir = "none";
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      e.preventDefault();
    },
    false
  );

  touchsurface.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault(); // prevent scrolling when inside DIV
    },
    false
  );

  touchsurface.addEventListener(
    "touchend",
    function (e) {
      let touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);
      e.preventDefault();
    },
    false
  );
}
/*
function control(e) {
  squares[currentIndex].classList.remove("snake");

  if (e.keyCode === 39 || e.keyCode === 68) direction = 1; //right
  else if (e.keyCode === 38 || e.keyCode === 87) direction = -width; //up
  else if (e.keyCode === 37 || e.keyCode === 65) direction = -1; //left
  else if (e.keyCode === 40 || e.keyCode === 83) direction = +width; //down
  else if (e.keyCode === 82) startGame();
}*/

swipedetect(grid, function (swipedir) {
  // swipedir contains either "none", "left", "right", "top", or "down"
  if (swipedir === "right") {
    direction = 1;
    console.log(swipedir);
  } else if (swipedir === "up") {
    direction = -width;
    console.log(swipedir);
  } else if (swipedir === "left") {
    direction = -1;
    console.log(swipedir);
  } else if (swipedir === "down") {
    direction = +width;
    console.log(swipedir);
  }
});

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);

// document.addEventListener('DOMContentLoaded', () => {
//   const squares = document.querySelectorAll('.grid div')
//   const scoreDisplay = document.querySelector('span')
//   const startBtn = document.querySelector('.start')

//   const width = 10
//   let currentIndex = 0 //so first div in our grid
//   let appleIndex = 0 //so first div in our grid
//   let currentSnake = [2,1,0]
//   let direction = 1
//   let score = 0
//   let speed = 0.9
//   let intervalTime = 0
//   let interval = 0

//   //to start, and restart the game
//   function startGame() {
//     currentSnake.forEach(index => squares[index].classList.remove('snake'))
//     squares[appleIndex].classList.remove('apple')
//     clearInterval(interval)
//     score = 0
//     randomApple()
//     direction = 1
//     scoreDisplay.innerText = score
//     intervalTime = 1000
//     currentSnake = [2,1,0]
//     currentIndex = 0
//     currentSnake.forEach(index => squares[index].classList.add('snake'))
//     interval = setInterval(moveOutcomes, intervalTime)
//   }

//   //function that deals with ALL the ove outcomes of the Snake
//   function moveOutcomes() {

//     //deals with snake hitting border and snake hitting self
//     if (
//       (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
//       (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
//       (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
//       (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
//       squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
//     ) {
//       return clearInterval(interval) //this will clear the interval if any of the above happen
//     }

//     const tail = currentSnake.pop() //removes last ite of the array and shows it
//     squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
//     currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

//     //deals with snake getting apple
//     if(squares[currentSnake[0]].classList.contains('apple')) {
//       squares[currentSnake[0]].classList.remove('apple')
//       squares[tail].classList.add('snake')
//       currentSnake.push(tail)
//       randomApple()
//       score++
//       scoreDisplay.textContent = score
//       clearInterval(interval)
//       intervalTime = intervalTime * speed
//       interval = setInterval(moveOutcomes, intervalTime)
//     }
//     squares[currentSnake[0]].classList.add('snake')
//   }

//   //generate new apple once apple is eaten
//   function randomApple() {
//     do{
//       appleIndex = Math.floor(Math.random() * squares.length)
//     } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
//     squares[appleIndex].classList.add('apple')
//   }

//   //assign functions to keycodes
//   function control(e) {
//     squares[currentIndex].classList.remove('snake')

//     if(e.keyCode === 39) {
//       direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
//     } else if (e.keyCode === 38) {
//       direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
//     } else if (e.keyCode === 37) {
//       direction = -1 // if we press left, the snake will go left one div
//     } else if (e.keyCode === 40) {
//       direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
//     }
//   }

//   document.addEventListener('keyup', control)
//   startBtn.addEventListener('click', startGame)
// })
