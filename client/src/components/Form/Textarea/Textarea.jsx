import React from "react";

function Textarea({name, placeholder, value, onChange}) {

	return (
		<textarea placeholder={placeholder} name={name} value={value} onChange={onChange} />
	)
}

export default Textarea;