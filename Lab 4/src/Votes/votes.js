import "./votes.css";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Votes() {
  const [voteCount, updateCount] = useState(0);

  function upvote() {
    updateCount(voteCount + 1);
  }
  function downvote() {
    updateCount(voteCount - 1);
  }
  return (
    <div id="voteDisplay">
      <div className="voting">
        <div className="upVote">
          <KeyboardArrowUpIcon onClick={() => upvote()} />
        </div>
        <div id="voteValue" style={{ color: "black", fontWeight: "bold" }}>
          {voteCount}
        </div>{" "}
        {/*need to update value when buttons are pressed */}
        <div className="downVote">
          <KeyboardArrowDownIcon onClick={() => downvote()} />
        </div>
      </div>
    </div>
  );
}

export default Votes;
