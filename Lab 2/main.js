/* Connie Pak - cpak014
Hannah Bach - hbach003 */

"use strict";

var score_x = 0;
var score_o = 0;
var player = "X";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

console.log(board);

// const player = new Boolean(false); //Player X = false;
function addMove(cl, xId, oId) {
  if (!document.getElementById(xId) && !document.getElementById(oId)) {
    console.log("bruh");
    if (player == "X") {
      console.log("enterX");

      let addHtml = '<h1 class="move" id="' + xId + '">X</h1>';
      console.log(addHtml);
      $(addHtml).appendTo(cl);
      player = "O";
    } else if (player == "O") {
      console.log("enterO");

      let addHtml = '<h1 class="move" id="' + oId + '">O</h1>';
      console.log(addHtml);
      $(addHtml).appendTo(cl);
      player = "X";
    }
  }
  console.log(player);
}

$(function () {
  $(".one").on("click", function () {
    console.log("clicked box one");
    addMove(".one", "X1", "O1");
  });

  $(".two").on("click", function () {
    console.log("clicked box two");
    addMove(".two", "X2", "O2");
  });

  $(".three").on("click", function () {
    console.log("clicked box three");
    addMove(".three", "X3", "O3");
  });

  $(".four").on("click", function () {
    console.log("clicked box four");
    addMove(".four", "X4", "O4");
  });

  $(".five").on("click", function () {
    console.log("clicked box five");
    addMove(".five", "X5", "O5");
  });

  $(".six").on("click", function () {
    console.log("clicked box six");
    addMove(".six", "X6", "O6");
  });

  $(".seven").on("click", function () {
    console.log("clicked box seven");
    addMove(".seven", "X7", "O7");
  });

  $(".eight").on("click", function () {
    console.log("clicked box eight");
    addMove(".eight", "X8", "O8");
  });

  $(".nine").on("click", function () {
    console.log("clicked box nine");
    addMove(".nine", "X9", "O9");
  });
});

$(function () {
  $(".new_game").click(function () {
    console.log("create new game");
    //scores should be kept
    player = "X";
  });
});

$(function () {
  $(".reset").click(function () {
    console.log("create new game");
    //scores should be reset too
    player = "X";
  });
});
