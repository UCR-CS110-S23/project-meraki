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
  console.log(session.username, "currentuser for fetch all rooms");

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
      return res.json({
        message: `Room ${roomName} already exists`,
        newRoom: false,
      });
    } else {
      //if room does not exist, then create a new room
      const user = await User.findOne({ username: session.username });
      const room = new Room({
        name: req.body["Room name"],
        owner: user,
      });
      const roomSaved = await room.save();

      //append this new room to the current active user's rooms array
      user.rooms.push(room);
      const userSaved = await user.save();

      res.status(200).json({
        message: `Created room ${roomSaved.name} and added it to ${session.username}'s rooms.`,
        room_name: roomSaved.name,
        newRoom: true,
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
      console.log("JOINN");

      return res.status(200).json({
        message: `User ${session.username} has joined Room ${roomName}!`,
        user_name: session.username,
        room_name: roomName,
        exist: true,
      });
    } else {
      return res.status(400).json({
        message: `Room ${roomName} does not exist.`,
        room_name: roomName,
        exist: false,
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
    const user = await User.findOne({ username: session.username });
    const room = await Room.findOne({ name: roomName });

    if (String(room.owner) === String(user._id)) {
      //check if the current user is the owner of the room to be deleted
      const deleteRoom = await Room.findOneAndDelete({ _id: room._id });

      //find all the documents that contain the room to delete in their rooms array and delete the room from each document's array
      const deleteRoomFromUser = await User.updateMany(
        {
          "rooms.name": roomName,
        },
        { $pull: { rooms: deleteRoom } }
      );

      console.log("DELETING ROOm", deleteRoomFromUser);
      return res.status(200).json({
        message: `${roomName} has been deleted.`,
        deleted: true,
      });
    } else {
      console.log("no delete; not the owner of the room", room.owner);
      return res.status(400).json({
        message: `User ${session.username} has no permissions to delete ${roomName}.`,
        deleted: false,
      });
      // const roomIndex = user.rooms.findIndex((room) => room.name === roomName);
      // if (roomIndex === -1) {
      //   return res.status(400).json({
      //     message: `User ${session.username} is not a member of ${roomName}`,
      //   });
      // }

      // user.rooms.splice(roomIndex, 1);
      // await user.save();

      // res.status(200).json({
      //   message: `User ${session.username} has left ${roomName}`,
      // });
    }
  } catch (e) {
    console.log(e);
    res.status(400).end("ERROR!");
  }
});

router.get("/:room", async (req, res) => {
  const room = req.params.room;
  const roomExists = await Room.findOne({ name: room });

  if (roomExists) {
    console.log("Open chat room!");
    return res.status(200).json({
      deleted: false,
    });
  } else {
    console.log("dont open bruh");
    return res.status(400).json({
      message: `Cannot open chatroom. Room ${room} has been already been deleted.`,
      deleted: true,
    });
  }
});
