const express = require("express");
const User = require("../model/user");
const multer = require("multer"); //using multer since express is unable to process multipart/form-data encoding (mainly used for file uploads)

const router = express.Router();

module.exports = router;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //parse file and store it in memory

//REFERENCE for picture upload: https://blogs.yasharyan.com/store-images-on-mongodb
router.post("/uploadPicture", upload.single("file"), async (req, res) => {
  //upload.single("file") tells the name of the file field in the html form
  console.log("enter");
  try {
    if (!req.file) {
      //if the user presses "Upload Photo" button without selecting a file, we don't want to update the user's user.picture field on MongoDB
      res.json({ message: "Please upload a file" });
      console.log("Please upload a file");
    } else {
      const user = await User.findOne({ username: req.session.username });
      user.picture.data = req.file.buffer; //stores the raw binary data of the received file
      user.picture.contentType = req.file.mimetype; //info about the nature and format of the file (e.g. png or jpeg); important so that the browser knows how to parse the raw binary data
      //   console.log("user upload pic", user);
      const updateUserPic = await user.save(); //save updated profile picture to the current user's document into MongoDB

      return res.status(200).json({
        message: `Updated ${req.session.username}'s profile picture successfully`,
      });
    }
  } catch (err) {
    console.log("ERROR yo");
    console.log(err);
    res.status(500).send("Encountered an error during profile picture upload.");
  }
});

router.post("/editUser", async (req, res) => {
  // TODO: you have to check the database to only return the rooms that the user is in
  const { session } = req;

  const newUsername = req.body.newName;
  session.username = newUsername;
  const oldUsername = req.body.oldName;

  console.log("updatesession username", session.username);
  console.log(newUsername, "new");
  console.log(oldUsername, "old");

  try {
    const user = await User.findOne({ username: oldUsername });

    user.username = newUsername;
    user.name = newUsername;

    console.log(user, "OLDUSER");
    const updateUser = user.save();
    console.log(user, "NEWUSER");

    res.status(200).json({
      newUsername: newUsername,
    });
  } catch (err) {
    console.log(error);
    res.status(400).end("ERROR: Unable to edit username");
  }
});

router.get("/:username/picture", async (req, res) => {
  console.log("RRRRR");
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user.picture) {
      return res.status(404).json({ message: "No profile picture found." });
    } else {
      // res.set("Content-Type", "image/png");
      res.send(user.picture);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to retrieve profile picture");
  }
});
