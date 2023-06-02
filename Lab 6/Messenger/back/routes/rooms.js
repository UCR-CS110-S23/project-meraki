const express = require("express");
const User = require("../model/user");
const Room = require("../model/room");
const router = express.Router();
// TODO: add rest of the necassary imports

module.exports = router;

// temporary rooms
rooms = ["room1", "room2", "room3"];

//Get all the rooms
router.get("/all", async (req, res) => {
  // TODO: you have to check the database to only return the rooms that the user is in
  const { session } = req;

  // check if user in database
  //   User.find()
  //     .lean()
  //     .then((item) => console.log(item));
  //   console.log("current session username", session.username);
  const user = await User.findOne({ username: session.username });
  res.send(user.rooms);
  //   console.log("user data", user.rooms);
});

router.post("/create", (req, res) => {
  // TODO: write necassary codesn to Create a new room
});

router.post("/join", (req, res) => {
  // TODO: write necassary codes to join a new room
});

router.delete("/leave", (req, res) => {
  // TODO: write necassary codes to delete a room
});
