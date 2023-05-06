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
            {/* <div id="title">Chat App</div> */}
            <NewPost addComment={addComment}> </NewPost>
          </div>
        </div>
        <div className="commentContainer">
          {comments.map((comment, index) => (
            <Comment mainComment={comment} key={index}></Comment>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;