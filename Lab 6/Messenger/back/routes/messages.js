const express = require("express");
const router = express.Router();
module.exports = router;

const User = require("../model/user");
const Room = require("../model/room");
const Message = require("../model/messages");

router.get("/:roomName", async (req, res) => {
  console.log("getting messages for room", req.params.roomName);
  const roomName = req.params.roomName;
  const chatroom = await Room.findOne({ name: roomName });

  let roomMessages = await Message.find({
    room: chatroom._id,
  });

  let msgArray = [];
  let msgObject = {}; //for creating a new message object to store the actual sender's name instead of their id

  for (let i = 0; i < roomMessages.length; i++) {
    msgObject = {};
    console.log(roomMessages[i].sender);
    const msgOwner = await User.findOne({ _id: roomMessages[i].sender });
    msgObject.id = roomMessages[i]._id;
    msgObject.message = roomMessages[i].message;
    msgObject.owner = msgOwner.username;
    msgObject.createdDate = roomMessages[i].createdAt;
    msgObject.updatedDate = roomMessages[i].updatedAt;
    msgObject.likeCount = roomMessages[i].likeCount;
    msgObject.dislikeCount = roomMessages[i].dislikeCount;
    msgArray.push(msgObject);
  }

  // console.log("all room msgs", msgArray);
  return res.status(200).json(msgArray); //pass this msgObject array as a response to the frontend
});

router.post("/send", async (req, res) => {
  //1) Find current User and current Chatroom in DB
  //2) Create a new Message and pass in the current user's id and chatroom's id to the fields of this new Message
  //3) Save this new Message to MongoDB
  console.log(req.body, "sent");

  const { chat_msg, username, room } = req.body;

  const user = await User.findOne({ username: username });
  const chatroom = await Room.findOne({ name: room });

  // console.log("found user", user);
  // console.log("found chatroom", chatroom);

  if (user && chatroom) {
    const message = new Message({
      "message.text": chat_msg,
      sender: user,
      room: chatroom,
    });

    try {
      const messageSaved = await message.save();
      // console.log(
      //   "message successfully saved!!!",
      //   messageSaved,
      //   "ID",
      //   messageSaved._id
      // );
      return res.status(200).json({
        message_id: messageSaved._id,
      });
      //passes user (username, password, name, rooms) as json to Auth.js as a response
    } catch (error) {
      console.log(error);
      res.send("ERROR!");
    }
  }
});
