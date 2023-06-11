const express = require("express");
const User = require("../model/user");

const router = express.Router();

module.exports = router;

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