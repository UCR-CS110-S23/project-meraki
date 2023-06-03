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

router.post("/create", async (req, res) => {
  // TODO: write necassary codesn to Create a new room
  const { session } = req;
  const user = await User.findOne({ username: session.username });

  const roomName = req.body["Room name"];
  console.log(roomName, req.body["Room name"]);

  //   let room = await Room.findOne({ name: roomName });

  try {
    // if (!room) {
    //   //if room with the specified room name does not exist, create a new room with that name
    //   room = new Room({
    //     name: roomName,
    //   });
    //   console.log("creating a new room: ", room);
    //   const dataSaved = await room.save();
    //   console.log("saved room:", dataSaved);
    // }
    const updateRoom = await Room.findOneAndUpdate(
      {
        //if the inputted roomName DNE ($ne) in the current active user's rooms array, then we add to the set (i.e. push the room to the rooms array)
        name: roomName,
      },
      {
        $setOnInsert: {
          name: roomName,
        },
      },
      { upsert: true }
    );

    let room = await Room.findOne({ name: roomName });
    //TODO: check if user has this room in its rooms array already. if it doesn't, push it. if it does, don't push.
    const updateUser = await User.findOneAndUpdate(
      {
        username: session.username,
        //if the inputted roomName DNE ($ne) in the current active user's rooms array, then we add to the set (i.e. push the room to the rooms array)
        "rooms.name": { $ne: roomName },
      },
      {
        $addToSet: {
          rooms: room,
        },
      }
    );
    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.send("ERROR!");
  }
});

router.post("/join", (req, res) => {
  //TODO: Add endpoint for when user clicks on a roomButton, make a request to "/join/:roomName"
  // TODO: write necassary codes to join a new room
});

router.delete("/leave", (req, res) => {
  // TODO: write necassary codes to delete a room
});
