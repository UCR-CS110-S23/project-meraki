/* Connie Pak - cpak014
Hannah Bach - hbach003 */

"use strict";

var score_x = 0;
var score_o = 0;

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

console.log(board)

// const player = new Boolean(false); //Player X = false;

var player = 'X';


$(function() {
  $(".one").click(function() {
    console.log("clicked box one")
    $('<h1 id="X">X</h1>').appendTo('.one');

    
  });

  $(".two").click(function() {
    console.log("clicked box two")
    
  });

  $(".three").click(function() {
    console.log("clicked box three")
    
  });

  $(".four").click(function() {
    console.log("clicked box four")
    
  });

  $(".five").click(function() {
    console.log("clicked box five")
    
  });

  $(".six").click(function() {
    console.log("clicked box six")
    
  });

  $(".seven").click(function() {
    console.log("clicked box seven")
    
  });

  $(".eight").click(function() {
    console.log("clicked box eight")
    
  });

  $(".nine").click(function() {
    console.log("clicked box nine")
    
  });
  
} );

$(function() {
  $(".new_game").click(function() {
    console.log("create new game")
    //scores should be kept
    player = 'X';

  })
})

$(function() {
  $(".reset").click(function() {
    console.log("create new game")
    //scores should be reset too
    player = 'X';

  })
})