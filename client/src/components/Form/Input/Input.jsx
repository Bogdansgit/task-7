import React from "react";

import './style.scss'

function Input({className, type, name, placeholder, value, onChange}) {

	return (
		<input className={className} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
	)
}

export default Input;