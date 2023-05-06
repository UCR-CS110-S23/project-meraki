import { useState } from "react";

function NewPost({ addComment, depth }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  function handleSubmit() {
    if (text.trim() === "" || name.trim() === "") {
      return;
    }
    //1) adds main post/thread to an array of threads called "comments" in App.js 2) Adds reply to an array of replies in comment.js corresponding to a specific thread/post so that it can be displayed with that same thread
    addComment({ name: name, text: text, depth: depth });
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
export default NewPost; //export NewPost so that other scripts like App.js can use it.
