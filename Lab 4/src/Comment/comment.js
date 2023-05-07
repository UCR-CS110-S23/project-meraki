import "./comment.css";
import NewPost from "../NewPost/newPost";
import Votes from "../Votes/votes";
import { useState } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

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
        <div id="wholeComment">
          <div id="comment">
            <div id="nameTitle">{mainComment.name}</div>
            <div id="commentText">{mainComment.text}</div>
            {mainComment.depth < 2 && (
              <button id="replyButton" onClick={() => setIsReply(!isReply)}>
                <ChatBubbleOutlineOutlinedIcon
                  className="chatIcon"
                  fontSize="small"
                />
                &nbsp; Reply
              </button>
            )}
          </div>
          <div id="voteContainer">
            <Votes></Votes>
          </div>
        </div>
        {/*Open a NewPost form to submit. Adds the reply to replies array corresponding to this reply by calling addReply().*/}
        <div>
          {isReply && mainComment.depth < 2 && (
            <NewPost
              addComment={addReply}
              depth={mainComment.depth + 1}
            ></NewPost>
          )}
        </div>
        {/*Iterate through the replies container of a specific thread (i.e. <Comment/>) we are on in App.js*/}
        {/*NOTE: EACH COMMENT (i.e. reply or post) is going to have its own list of replies. (exception: if its depth is 2, it will have an empty list of replies)*/}
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
