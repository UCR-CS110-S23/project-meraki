const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  rooms: {
    type: Array,
    required: true,
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("User", userSchema);
