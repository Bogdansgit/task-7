import React, { useState, useContext } from "react";

import { AuthContext } from "../../Context/auth";

function Login () {
	const context = useContext(AuthContext);
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	
	const handleChange = (e) => {
		e.preventDefault();
		const {name, value} = e.target;
		setUserData({ ...userData, [name]: value})
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await (
			await fetch('http://localhost:5010/user/Login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: userData.email,
					password: userData.password,
				})
			})
		).json();
		if (result) {
			context.login(result);
		} else {
			console.log('error');
		}
	}

	return (
		<div className="container">
			<form className="form" onSubmit={handleSubmit}>
				<input type={'email'} placeholder='email' name={'email'} value={userData.email} onChange={handleChange} />
				<input type={'password'} placeholder='password' name={'password'} value={userData.password} onChange={handleChange} />
				<button type="submit">Submit</button>
			</form>
		</div>
	)
};

export default Login;