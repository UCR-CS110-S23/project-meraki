import "./comment.css";
import NewPost from "../NewPost/newPost";
import { useState } from "react";

function Comment({ mainComment }) {
  const [replies, setReplies] = useState([]); //each main comment/thread will have its own array of replies
  const [isReply, setIsReply] = useState(false); //if user clicks on the "Reply" button, then isReply is 'true' meaning that we open a NewPost form for them to submit

  function addReply(reply) {
    setReplies([...replies, reply]);
    setIsReply(!isReply); //set isReply to 'false' to close the NewPost form
  }

  return (
    <div id="threadsContainer">
      <div className="thread">
        <div id="nameTitle">{mainComment.name}</div>
        <div id="commentText">{mainComment.text}</div>
        <button id="replyButton" onClick={() => setIsReply(!isReply)}>
          Reply
        </button>

        {/*Open a NewPost form to submit. Adds the reply to replies array corresponding to this thread/Comment by calling addReply().*/}
        <div>{isReply && <NewPost addComment={addReply}></NewPost>}</div>

        {/*Iterate through the replies container of a specific thread (i.e. <Comment/>) we are on in App.js*/}
        <div className="repliesContainer">
          {replies.length > 0 &&
            replies.map((reply, index) => (
              <Comment mainComment={reply} key={index}></Comment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Comment;
