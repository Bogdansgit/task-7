import React  from "react";
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from "../../images/arrow.svg"
import "./style.scss";

function Button ({children, ...props}) {

	return (
		<>
			{ props.link
				? props.withIcon
					? <Link to={props.link} className="button">{children} <ArrowIcon /></Link>
					: <Link to={props.link} className="button">{children}</Link>
				: <button onClick={props.onClick} className="button">{children}</button>
			}
		</>
	)
}

export default Button;