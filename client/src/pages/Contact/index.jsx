import React, { useState } from "react";

import './style.scss';
import { Form, Input, Textarea } from "../../components/Form";
import notify, { notifyError } from '../../utils/notification.helpers'
import background from "../../images/bg-1.png";


function Contact () {

	const [error, setError] = useState(false)
	const [contact, setContact] = useState({
		fname: '',
		lname: '',
		email: '',
		phone: '',
		message: '',
	})

	
	const handleSabmit = (e) => {
		e.preventDefault();
		if (contact.fname.length === 0 || contact.lname.length === 0 || contact.email.length === 0) {
			notifyError('Can`t be empty', 'validation-notify');
			setError(true)
			return;
		}

		setContact({
			fname: '',
			lname: '',
			email: '',
			phone: '',
			message: '',
		})
		notify('🦄 Sended!', 'contact-form-notify');
	}

	const handleChange = (e) => {
		const {name, value} = e.target;
		setContact({...contact, [name]: value});
		if (value.length < 1) {
			setError(true);
			notifyError('Can`t be empty', 'validation-notify');
		}else {
			setError(false);
		}
	}

	return (
		<div className="contact">
			<div className="contact__visual">
				<img src={background} alt="background" />
				<h1>Contact</h1>
			</div>
			<div className="container">
				<Form onSubmit={handleSabmit}>
					{error
						? <Input className={'error'} type={"text"} name={'fname'} placeholder={"First Name"} value={contact.fname} onChange={handleChange} />
						: <Input type={"text"} name={'fname'} placeholder={"First Name"} value={contact.fname} onChange={handleChange} />
					}
					{error
						? <Input className={'error'} type={"text"} name={'lname'} placeholder={"Last Name"} value={contact.lname} onChange={handleChange} />
						: <Input type={"text"} name={'lname'} placeholder={"Last Name"} value={contact.lname} onChange={handleChange} />
					}
					{error
						? <Input className={'error'} type={"email"} name={'email'} placeholder={"Email"} value={contact.email} onChange={handleChange} />
						: <Input type={"email"} name={'email'} placeholder={"Email"} value={contact.email} onChange={handleChange} />
					}
					<Input type={"tel"} name={'phone'} placeholder={"Phone"} value={contact.phone} onChange={handleChange} />
					<Textarea name={'message'} placeholder={"Message"} value={contact.message} onChange={handleChange} />
					<button type='submit'>Send</button>
				</Form>
			</div>
		</div>
	)
};

export default Contact;