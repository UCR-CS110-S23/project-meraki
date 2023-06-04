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
  console.log("all room msgs", roomMessages);
});

router.post("/send", async (req, res) => {
  //1) Find current User and current Chatroom in DB
  //2) Create a new Message and pass in the current user's id and chatroom's id to the fields of this new Message
  //3) Save this new Message to MongoDB
  console.log(req.body, "sent");

  const { chat_msg, username, room } = req.body;

  const user = await User.findOne({ username: username });
  const chatroom = await Room.findOne({ name: room });

  console.log("found user", user);
  console.log("found chatroom", chatroom);

  if (user && chatroom) {
    const message = new Message({
      "message.text": chat_msg,
      sender: user,
      room: chatroom,
    });

    try {
      const messageSaved = await message.save();
      console.log("message successfully saved!!!", messageSaved);
      return res.status(200).json({
        message: `Sent message ${messageSaved.message.text}`,
      });
      //passes user (username, password, name, rooms) as json to Auth.js as a response
    } catch (error) {
      console.log(error);
      res.send("ERROR!");
    }
  }
});
