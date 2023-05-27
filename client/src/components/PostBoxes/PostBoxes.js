import React from "react";
import "./PostBoxes.css";
import { Link } from "react-router-dom";

function PostBoxes() {
  return (
    <div className="PostBoxes" role="post">
        <div id="post">
            <PostLink to="/" style={{ color: "white" }}>
                PostBox
            </PostLink>

        </div>
    </div>
  );
}

function PostLink({ to, children, ...props }) {
    return (
      <li>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }

export default PostBoxes;