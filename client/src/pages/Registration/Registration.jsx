import React, { useState } from "react";

function Registration () {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
	});
	
	const handleChange = (e) => {
		e.preventDefault();
		const {name, value} = e.target;
		setUserData({ ...userData, [name]: value})
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await (
			await fetch('http://localhost:5010/user/registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: userData.email,
					password: userData.password,
					confirmPassword: userData.confirmPassword,
					firstName: userData.firstName,
					lastName: userData.lastName,
				})
			})
		).json();
		if (result) {
			console.log(result);
		} else {
			console.log('error');
		}
	}

	return (
		<div className="container">
			<form className="form" onSubmit={handleSubmit}>
				<input type={'email'} placeholder='email' name={'email'} value={userData.email} onChange={handleChange} />
				<input type={'password'} placeholder='password' name={'password'} value={userData.password} onChange={handleChange} />
				<input type={'password'} placeholder='confirmPassword' name={'confirmPassword'} value={userData.confirmPassword} onChange={handleChange} />
				<input type={'text'} placeholder='First Name' name={'firstName'} value={userData.firstName} onChange={handleChange} />
				<input type={'text'} placeholder='Last Name' name={'lastName'} value={userData.lastName} onChange={handleChange} />
				<button type="submit">Submit</button>
			</form>
		</div>
	)
};

export default Registration;