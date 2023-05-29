import { useState, useRef } from "react";
import Select from "react-select";
import "./NewPost.css";
import axios from "axios";

function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const fileRef = useRef(); //for resetting the file input; reference: https://stackoverflow.com/a/60986322/16923546

  const tags = [
    { value: "food", label: "Food" },
    { value: "homeImprovements", label: "Home Improvements" },
    { value: "arts", label: "Arts" },
  ];

  //Reference for file submission: https://youtu.be/b6Oe2puTdMQ
  function handleFileChange(event) {
    //using JavaScript's File API
    setFile(event.target.files[0]); //getting the first file from the input element of type 'files'
    setFileName(event.target.files[0].name); //the file's name as a read-only string.
  }

  async function handleSubmit(event) {
    console.log("SELECTED TAGS", selectedTags);
    if (title.trim() === "") {
      return;
    }
    setTitle("");
    setDescription("");
    console.log(description, title, " ");
    setSelectedTags([]); //reset tag selection on form submit (i.e. submitting the post)
    setFileName("");
    event.preventDefault();

    const formData = new FormData(); //add the file to FormData
    formData.append("file", file);

    try {
      //Make an http POST request to pass the file to the server/backend
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data; //the response we send at the end of the POST request for /upload: `res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });`
      setUploadedFile({ fileName, filePath }); //MIGHT DELETE THIS
      fileRef.current.value = ""; //for resetting the file input
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server."); //if we're unable to find the file path
      } else {
        console.log(err.response.data.mesg); //if no file is uploaded
      }
    }
  }

  return (
    <div id="mainContainer">
      <div id="postContainer">
        {/* For updating selected tags in form: https://stackoverflow.com/a/66257095/16923546 */}
        <Select
          id="selectTags"
          placeholder="Select tags..."
          value={selectedTags}
          options={tags}
          onChange={setSelectedTags}
          isMulti
        />
        <div id="inputs">
          <input
            className="input"
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <input
            className="input"
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div id="fileContainer">
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              id="fileInput"
              className="hideUploadButton"
            />
            <label htmlFor="fileInput" id="uploadButton">
              Upload File
            </label>
            <p>{fileName}</p>
            <button id="submit" className="hideUploadButton" type="submit">
              {/* id='submit' allows this input file form to be also submitted for when the Post button is pressed ;reference: https://stackoverflow.com/a/53573760/16923546*/}
            </button>
          </form>
        </div>
        <div id="submission">
          <button form="submit" className="submitButton" onClick={handleSubmit}>
            {/* form='submit' allows the Post button to be linked to the fileUploadButton*/}
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewPost; //export NewPost so that other scripts like App.js can use it.
