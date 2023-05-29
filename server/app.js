const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const port = 5000;

app.use(fileUpload());

// Set up routes and middleware here
app.post("/upload", (req, res) => {
  if (req.files === null) {
    //checking if file input is empty
    return res.status(400).json({ mesg: "No file uploaded" });
  }

  console.log("wat", req.files.file);
  const file = req.files.file; //containing the actual file and its raw data; Object is like: `file: { name: 'name.jpg', data: <Buffer ff blah blah>, size: #, mimetype: 'image/jpeg', etc.}`

  const filePath = path.join(
    __dirname,
    "../",
    "client",
    "public",
    "uploads",
    file.name
  );
  // console.log(filePath); used this to see the filepath for debugging purposes

  //TODO: Here we can send the file to the MongoDB database instead of storing it in the uploads folder.
  //storing file into client/public/uploads folder
  file.mv(filePath, (err) => {
    if (err) {
      console.error(err); //if path does not exist, log the error to console
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
