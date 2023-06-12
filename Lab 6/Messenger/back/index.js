const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const rooms = require("./routes/rooms");
const messages = require("./routes/messages");
const profile = require("./routes/profile");
const Message = require("./model/messages");

const app = express();
const server = http.createServer(app);

// TODO: add cors to allow cross origin requests
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database
// TODO: your code here
mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;
database.on("error", (error) => console.error(error));
database.once("open", () => console.log("Connected to Database"));

// Set up the session
// TODO: your code here
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
});
app.use(sessionMiddleware);

//check for a request to the '/' root of the website; if we get the request, we want to check if the user is logged in or not by checking the session
app.get("/", (req, res) => {
  if (req.session && req.session.authenticated) {
    res.json({ message: "logged in", username: req.session.username });
  } else {
    console.log("not logged in");
    res.json({ message: "not logged" });
  }
});

app.use("/api/auth/", auth); //deals with user authentication in auth.js file

// checking the session before accessing the rooms
app.use((req, res, next) => {
  //we want to ensure that the user is authenticated before we can access anything in rooms.js such as making a request to view all the rooms in the `router.get('/all'...)` function
  if (req.session && req.session.authenticated) {
    next(); //if the user is authenticated, then we can go to the next() middleware `app.use("/api/rooms/", rooms);` in our express library
  } else {
    res.status(401).send("Unauthorized");
  }
});

//this is the next() middleware we go to from above
app.use("/api/profile/", profile);
app.use("/api/rooms/", rooms); //this deals with the rooms (i.e. creating a new room, seeing all the rooms, etc )
app.use("/api/messages/", messages); //this deals with sending messages

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

//Code after here maintains a connection in the case that the user goes to a chat room. This is b/c we want to maintain a constant connection & conversation with other ppl in the chatroom and see their msgs.
// TODO: make sure that the user is logged in before connecting to the socket
// TODO: your code here
io.use((socket, next) => {
  console.log("socket to middleware");
  sessionMiddleware(socket.request, {}, next);
});

io.use((socket, next) => {
  //check if the user is authenticated
  if (socket.request.session && socket.request.session.authenticated) {
    next();
  } else {
    console.log("unauthorized");
    next(new Error("unauthorized"));
  }
});

io.on("connection", (socket) => {
  let room = undefined;
  let username = undefined;
  console.log("user connected");
  // TODO: write codes for the messaging functionality
  // TODO: your code here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("join", (data) => {
    socket.join(data.room); //join to a specific room; this allows us to emit the message to everyone who has this room later on
    room = data.room;
    username = data.username;
    console.log(`User is joined to room ${data.room}`);
  });

  socket.on("chat message", (data) => {
    console.log("got message", data);
    io.to(room).emit("chat message", data); //to(room) allows us to emit the message to the users that are actually in that specific room (without to(), it would emit it to everyone)
  });

  socket.on("likes", async (data) => {
    //once server receives "likes" message from socket.emit("likes", ....), we find the message by using the message id provided by the emit
    const message = await Message.findOne({ _id: data.message_id });
    console.log("likes!!", message);
    message.likeCount = message.likeCount + 1; //update the likeCount of this specific message
    const updateMessageLikes = message.save(); //save this update to MongoDB
    console.log(`${message._id}'s LIKES COUNT:`, message.likeCount);
    io.to(room).emit("likes", {
      //now that the likeCount is updated, we want to pass it back to the chatroom (the frontend) so that it can be rendered in real-time
      msgId: data.message_id,
      likeCount: message.likeCount,
    });
  });

  socket.on("dislikes", async (data) => {
    const message = await Message.findOne({ _id: data.message_id });
    console.log("dislikes!!", message);
    message.dislikeCount = message.dislikeCount + 1;
    const updateMessageLikes = message.save();
    console.log(`${message._id}'s DISLIKES COUNT:`, message.dislikeCount);
    io.to(room).emit("dislikes", {
      msgId: data.message_id,
      dislikeCount: message.dislikeCount,
    });
  });
});