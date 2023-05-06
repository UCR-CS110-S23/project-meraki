import { useState } from "react";

function NewPost({ addComment }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  function handleSubmit() {
    if (text.trim() === "" || name.trim() === "") {
      return;
    }
    addComment({ name: name, text: text, replies: [] });
    setText("");
    setName("");
    console.log(name, text, " ");
  }
  return (
    <div>
      <div id="inputs">
        <input
          className="input"
          id="nameInput"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="input"
          id="postContent"
          type="text"
          placeholder="Write a new post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div id="submission">
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
export default NewPost; //export NewPost so that other scripts like App.js can use it
