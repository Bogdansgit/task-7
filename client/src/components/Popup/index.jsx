import React from "react";

import "./style.scss";


function Popup ({children, trigger, setTrigger}) {

	return (trigger) ? (
		<div className={"popup"}>
			<div className={"popup-inner"}>
				<div className="close-btn" onClick={() => setTrigger(false)}>X</div>
				{children}
			</div>
		</div>
	) : null
};

export default Popup;