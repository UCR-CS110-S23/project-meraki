import {useState} from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Vote() {
    const [countVote, updateVote] = useState(0);

    function upvote(){
        updateVote(countVote + 1);
    }

    function downvote() {
        updateVote(countVote - 1);
    }

    return (
        <div>
             <KeyboardArrowUpIcon onClick={() => upvote()}></KeyboardArrowUpIcon>
                 {" "}{countVote}{" "}
             <KeyboardArrowDownIcon onClick={() => downvote()}></KeyboardArrowDownIcon>
         </div>
    );
}

export default Vote;