/* Connie Pak - cpak014
Hannah Bach - hbach003 */

"use strict";

var score_x = 0;
var score_o = 0;
var player = "X";

let X_moves = [, , ,]; //max of 4 moves, delete the first move when we place a 5th piece

let Y_moves = [, , ,];

// console.log(board);

// const player = new Boolean(false); //Player X = false;
function addMove(cl, id) {
  if (!document.getElementById(id)) {
    console.log("bruh");
    if (player == "X") {
      console.log("enterX");

      let addHtml = '<h1 class="move" id="' + id + '">X</h1>';
      console.log(addHtml);
      $(addHtml).appendTo(cl);
      player = "O";
    } else if (player == "O") {
      console.log("enterO");

      let addHtml = '<h1 class="move" id="' + id + '">O</h1>';
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
