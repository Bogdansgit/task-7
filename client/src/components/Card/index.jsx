import React from "react";
import Button from "../Button";
import Comment from "../Comments";
import Views from "../Views";

function Card ({children, ...props}) {

	return (
		<div className="card">
			<div className="card__visual">
				<img src="" alt="card-imag" />
			</div>
			<div className="card__title">{children}</div>
			<div className="card__text">{children}</div>
			<div className="card__bottom-line">
				<Button link={props.buttonLink} withIcon>{children}</Button>
				<div className="views-wrap">
					<Views>{children}</Views>
					<Comment>{children}</Comment>
				</div>
			</div>
		</div>
	)
}

export default Card;