import React from "react";
import "./style.scss";
import { ReactComponent as CommentIcon } from "../../images/comment.svg";

function Comment ({children}) {


	return (
		<span className="comment"><CommentIcon /> {children}</span>
	)
}

export default Comment;