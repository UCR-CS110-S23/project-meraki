import { useState } from "react";
import Select from "react-select";
import "./NewPost.css";

function NewPost({ addComment, depth }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const tags = [
    { value: "food", label: "Food" },
    { value: "homeImprovements", label: "Home Improvements" },
    { value: "arts", label: "Arts" },
  ];

  function handleSubmit() {
    if (title.trim() === "") {
      return;
    }
    setTitle("");
    setDescription("");
    console.log(description, title, " ");
  }

  function handleTags(selectedTags) {
    console.log("handleTags", selectedTags);
  }

  return (
    <div id="mainContainer">
      <div id="postContainer">
        <Select
          id="selectTags"
          placeholder="Select tags..."
          options={tags}
          onChange={handleTags}
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
        <div id="submission">
          <button id="submit" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewPost; //export NewPost so that other scripts like App.js can use it.
