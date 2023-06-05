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

  const roomName = req.body["Room name"];
  console.log(roomName, req.body["Room name"]);

  try {
    let checkRoomExists = await Room.findOne({ name: req.body["Room name"] });

    if (checkRoomExists) {
      return res.json({ message: `Room ${roomName} already exists` });
    } else {
      //if room does not exist, then create a new room
      const room = new Room({
        name: req.body["Room name"],
      });
      const roomSaved = await room.save();

      //append this new room to the current active user's rooms array
      const user = await User.findOne({ username: session.username });
      user.rooms.push(room);
      const userSaved = await user.save();

      res.status(200).json({
        message: `Created room ${roomSaved.name} and added it to ${session.username}'s rooms.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).end("ERROR!");
  }
});

router.post("/join", async (req, res) => {
  //TODO: Add endpoint for when user clicks on a roomButton, make a request to "/join/:roomName"
  // TODO: write necassary codes to join a new room

  //1) Check if room exists in rooms collection
  //2) If it does, add it to user's active rooms. If it does not, send a message to user saying that the room does not exist.

  const { session } = req;

  const roomName = req.body["Room name"];
  console.log("Want to join", roomName, req.body["Room name"]);

  try {
    let checkRoomExists = await Room.findOne({ name: req.body["Room name"] });
    const user = await User.findOne({ username: session.username });

    if (checkRoomExists) {
      //append this existing room to the current active user's rooms array
      const updateUser = await User.findOneAndUpdate(
        {
          username: session.username,
          //if the inputted roomName DNE ($ne) in the current active user's rooms array, then we add to the set (i.e. push the room to the rooms array)
          "rooms.name": { $ne: roomName },
        },
        {
          $addToSet: {
            rooms: checkRoomExists,
          },
        }
      );

      return res.status(200).json({
        message: `User ${session.username} has joined Room ${roomName}!`,
        user_name: session.username,
      });
    } else {
      return res.status(400).json({
        message: `Room ${roomName} does not exist.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).end("ERROR!");
  }
});

router.delete("/leave", async (req, res) => {
  // TODO: write necassary codes to delete a room

  const { session } = req;
  const roomName = req.body["Room name"];

  try {
    const user = await User.findOne({username: session.username});
    const roomIndex = user.rooms.findIndex((room) => room.name === roomName);
    if(roomIndex === -1){
      return res.status(400).json({
        message: `User ${session.username} is not a member of ${roomName}`,
      });
    }

    user.rooms.splice(roomIndex, 1);
    await user.save();

    res.status(200).json({
      message: `User ${session.username} has left ${roomName}`,
    });
  }
  catch(e){
    console.log(e);
    res.status(400).end("ERROR!");
  }
});
