// import logo from "./logo.svg";
import "./App.css";
import NewPost from "./NewPost/newPost";
import Comment from "./Comment/comment";
import { useState } from "react";

function App() {
  const [comments, setComments] = useState([]);

  function addComment(comment) {
    setComments([...comments, comment]);
    console.log(comments);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="postContainer">
          <div id="newPost">
            <h3>New Post</h3>
            <NewPost addComment={addComment} depth={0}>
              {" "}
            </NewPost>
          </div>
        </div>
        <div className="commentContainer">
          {/*Iterates through all the main comments/threads and displays them*/}
          {comments.map((comment, index) => (
            <Comment mainComment={comment} key={index}></Comment>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
