const express = require("express");
const User = require("../model/user");
const fs = require("fs");
const router = express.Router();

module.exports = router;

router.post("/login", async (req, res) => {
  const { session } = req;
  const { username, password } = req.body;
  // console.log("userNNAME", username);
  // check if user in database

  const user = await User.findOne({ username });

  if (!user) {
    console.log("Username does not exist", username);
    return res.json({ message: "Username does not exist", status: false });
  } else if (user.password !== password) {
    console.log(password, "Wrong Password!");
    return res.json({ message: "Incorrect Password", status: false });
  } else {
    session.authenticated = true;
    session.username = username;
    console.log(username, "Logged in!");
    // console.log("LOOKUSER", user);
    res.json({ message: "Logged in", username: username, status: true });
  }
});

// Set up a route for the logout page
router.get("/logout", (req, res) => {
  // Clear the session data and redirect to the home page
  req.session.destroy();
  res.redirect("/");
});

//TODO: ADD CODE FOR REGISTER PAGE
router.post("/register", async (req, res) => {
  const { username, password, name } = req.body;
  console.log(username, password, name);

  const defaultProfilePicture = {
    //Lab 6\Messenger\front\public\defaultUser.png
    data: fs.readFileSync("../front/public/defaultUser.png"),
    contentType: "image/jpeg",
  };

  const findUser = await User.findOne({ username: username });
  if (findUser) {
    return res.status(200).json({
      message: "User already exists",
    });
  }
  const user = new User({
    username: username,
    password: password,
    name: name,
    rooms: [],
    picture: defaultProfilePicture,
  });

  try {
    const dataSaved = await user.save();
    //passes user (username, password, name, rooms) as json to Auth.js as a response
    return res.status(200).json({
      user_name: username,
    });
  } catch (error) {
    console.log(error);
    res.send("ERROR!");
  }
});
