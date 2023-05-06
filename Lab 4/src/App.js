// import logo from "./logo.svg";
import "./App.css";
import NewPost from "./NewPost/newPost";
function addComment() {}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="postContainer">
          <div id="title">New Post</div>
          <NewPost addComment={addComment}> </NewPost>
        </div>
        <div className="commentContainer"></div>
      </header>
    </div>
  );
}

export default App;
