import React from "react";
import "./style.scss";
import { ReactComponent as EyeIcon } from "../../images/eye.svg";

function Views ({children}) {


	return (
		<span className="view"><EyeIcon /> {children}</span>
	)
}

export default Views;