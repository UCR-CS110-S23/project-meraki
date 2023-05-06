import "./comment.css";
function Comment({ mainComment }) {
  return (
    <div id="threadsContainer">
      <div className="thread">
        <div id="nameTitle">{mainComment.name}</div>
        <div id="commentText">{mainComment.text}</div>
        <button id="replyButton">Reply</button>
      </div>
    </div>
  );
}

export default Comment;
