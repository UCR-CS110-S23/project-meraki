/* Connie Pak - cpak014
Hannah Bach - hbach003 */

"use strict";

var score_x = 0;
var score_o = 0;
var player = "X";

const winCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let X_moves = []; //max of 4 moves, delete the first move when we place a 5th piece

let O_moves = [];

let X_score = 0;
let O_score = 0;

let gameOver = false;

function displayOutput() {
  let response = "";
  //output if X's turn or O's turn

  return response;
}

// console.log(board);

// const player = new Boolean(false); //Player X = false;
function addMove(cl, id) {
  let prevPlayer = "";
  if (!gameOver) {
    if (!document.getElementById(id)) {
      // console.log("bruh");
      if (player == "X") {
        prevPlayer = "X";
        console.log("enterX");

        let addHtml = '<h1 class="move" id="' + id + '">X</h1>';
        // console.log(addHtml);
        $(addHtml).appendTo(cl);
        player = "O";

        if (X_moves.length >= 4) {
          let firstXMove = X_moves.shift();
          let firstXClass = getClass(firstXMove);
          // console.log("first x move", firstXClass);
          $(firstXClass).empty();
          X_moves.push(id);
        } else {
          X_moves.push(id);
        }
      } else if (player == "O") {
        prevPlayer = "O";
        console.log("enterO");

        let addHtml = '<h1 class="move" id="' + id + '">O</h1>';
        // console.log(addHtml);
        $(addHtml).appendTo(cl);
        player = "X";

        if (O_moves.length >= 4) {
          let firstOMove = O_moves.shift();
          let firstOClass = getClass(firstOMove);
          // console.log("first o move", firstOClass);
          $(firstOClass).empty();
          O_moves.push(id);
        } else {
          O_moves.push(id);
        }
      }
      updateGameBoard();
      console.log("Current X_moves:", X_moves);
      console.log("Current O_moves:", O_moves);
      //VERIFY WIN HERE
    }

    verifyWin(prevPlayer);

    $(".display_player").empty(); //delete previous player
    $(".display_player").append(player); //replace with new player turn
  }
  console.log(player);
}

function verifyWin(p) {
  let checker = (arr, target) => target.every((v) => arr.includes(v));
  //TODO: Check timer if 2 minutes passed. If no winner after 2 minutes, then we have a tie.
  if (p == "X") {
    for (let i = 0; i < winCombos.length; i++) {
      if (checker(X_moves, winCombos[i])) {
        X_score += 1;
        $("#X-score").empty();
        $("#X-score").append(X_score);
        console.log(X_moves, winCombos[i]);
        console.log("X wins!");
        gameOver = true;
        console.log("gameover", gameOver);
        setTimeout(function () {
          //might delete setTimeout and alert (not required i believe)
          alert("Player X wins!");
        }, 100);
      }
    }
  } else {
    for (let i = 0; i < winCombos.length; i++) {
      if (checker(O_moves, winCombos[i])) {
        O_score += 1;
        $("#O-score").empty();
        $("#O-score").append(O_score);
        console.log(O_moves, winCombos[i]);
        console.log("O wins!");
        gameOver = true;
        console.log("gameover", gameOver);
        setTimeout(function () {
          //might delete setTimeout and alert (not required i believe)
          alert("Player O wins!");
        }, 100);
      }
    }
  }
}

function clearBoard() {
  X_moves = [];
  O_moves = [];
  gameOver = false;
  for (let i = 1; i <= 9; i++) {
    let c = getClass(i);
    $(c).empty();
  }
  player = "X";
  $(".display_player").empty(); //delete previous player
  $(".display_player").append(player); //replace with new player turn
}

function getClass(id) {
  if (id == 1) {
    return ".one";
  }
  if (id == 2) {
    return ".two";
  }

  if (id == 3) {
    return ".three";
  }

  if (id == 4) {
    return ".four";
  }

  if (id == 5) {
    return ".five";
  }

  if (id == 6) {
    return ".six";
  }

  if (id == 7) {
    return ".seven";
  }

  if (id == 8) {
    return ".eight";
  }

  if (id == 9) {
    return ".nine";
  }
}

function updateGameBoard() {
  for (let i = 1; i <= 9; i++) {
    let idName = "#" + i;
    $(idName).empty();
  }

  for (let i = 0; i < X_moves.length; i++) {
    let idX = "#" + X_moves[i];
    // console.log(idX, "append X");
    $(idX).append("X");
  }

  for (let i = 0; i < O_moves.length; i++) {
    let idO = "#" + O_moves[i];
    // console.log(idO, "append O");
    $(idO).append("O");
  }
}

$(function () {
  $(".new_game").on("click", function () {
    clearBoard();
  });
});

$(function () {
  $(".one").on("click", function () {
    console.log("clicked box one");
    addMove(".one", 1);
  });

  $(".two").on("click", function () {
    console.log("clicked box two");
    addMove(".two", 2);
  });

  $(".three").on("click", function () {
    console.log("clicked box three");
    addMove(".three", 3);
  });

  $(".four").on("click", function () {
    console.log("clicked box four");
    addMove(".four", 4);
  });

  $(".five").on("click", function () {
    console.log("clicked box five");
    addMove(".five", 5);
  });

  $(".six").on("click", function () {
    console.log("clicked box six");
    addMove(".six", 6);
  });

  $(".seven").on("click", function () {
    console.log("clicked box seven");
    addMove(".seven", 7);
  });

  $(".eight").on("click", function () {
    console.log("clicked box eight");
    addMove(".eight", 8);
  });

  $(".nine").on("click", function () {
    console.log("clicked box nine");
    addMove(".nine", 9);
  });
});

$(function () {
  $(".new_game").on("click", function () {
    console.log("create new game");
    //scores should be kept
    player = "X";
  });
});

$(function () {
  $(".reset").on("click", function () {
    console.log("create new game");
    //scores should be reset too
    player = "X";
  });
});

let form = document.getElementById("my-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("output").innerHTML = displayOutput();
});
