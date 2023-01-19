import React, { useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PushPinIcon from '@mui/icons-material/PushPin';

import "./style.scss";
import { tasksData } from "../../api";
import { ReactComponent as AddPostIcon } from "../../images/addPost.svg";
import Popup from "../../components/Popup";
import notify from "../../utils/notification.helpers";


function Tasks () {
	const [tasks, setTasks] = useState([...tasksData].sort((x, y) => {
		return (x.pin === y.pin)? 0 : x.pin? -1 : 1;
	}));
	const [editTaskId, setEditTaskId] = useState('');
	const [editTaskTitle, setEditTaskTitle] = useState('');
	const [editTaskDescription, setEditTaskDescription] = useState('');
	const [popup, setPopup] = useState(false);
	const [editPopup, setEditPopup] = useState(false);

	const handleAddTasks = (e) => {
		e.preventDefault();
		setPopup(true);
	}

	const removeTasks = (e, id) => {
		e.preventDefault();
		setTasks(tasks.filter(post => post.id !== id));
		notify('Task succesfully deleted!');
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const id = tasks.length + 1;
		const title = e.target[0].value;
		const description = e.target[1].value;
		const status = false;

		setTasks([...tasks, { id, title, description, status }]);
		e.target[0].value = '';
		e.target[1].value = '';

		notify('🦄 Task succesfully created!');
		setPopup(false);
	}

	const handleEditedTaskSubmit = (e, title, description) => {
		e.preventDefault();

		setTasks([ ...tasks.filter(post => post.id !== editTaskId 
			), {id: editTaskId, title, description}
		]);

		setEditPopup(false);
		notify('🦄 Task succesfully edited!');
	}

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'title') {setEditTaskTitle(value)}
		if (name === 'desc') {setEditTaskDescription(value)}
	}

	const editTasks = (e, id, title, description) => {
		e.preventDefault();

		setEditPopup(true);
		setEditTaskTitle(title);
		setEditTaskDescription(description);
		setEditTaskId(id);
	}

	const handleComplete = (e, id) => {
		e.preventDefault();
		setTasks(tasks.map(task => task.id === id ? {...task, status: !task.status} : task));
	}

	const handlePinTask = (e, id) => {
		e.preventDefault();
		setTasks(tasks.map(task => task.id === id ? {...task, pin: !task.pin} : task).sort((x, y) => {
			return (x.pin === y.pin)? 0 : x.pin? -1 : 1;
		}));
	}


	return (
		<div className="posts">
			<div className="posts__top-line">
				<h3>Tasks</h3>
				<div className="add" onClick={handleAddTasks}><AddPostIcon /></div>

			</div>
			<ul className="posts-list">
				{
					tasks.map(task => (
						<li key={task.id}>
							<div className="posts-box">
								<div className="complete" onClick={(e) => handleComplete(e, task.id)}>
									{task.status ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
								</div>
								<div className="pin" onClick={(e) => handlePinTask(e, task.id)}>
									{task.pin ? <PushPinIcon /> : <PushPinIcon color="disabled" />}
								</div>
								<h4 >{task.title}</h4>
								<p>{task.description}</p>
							</div>
							<div className="icons-box">
								<div className="edit" onClick={(e) => editTasks(e, task.id, task.title, task.description)}><EditIcon /></div>
								<div className="remove" onClick={(e) => removeTasks(e, task.id)}><DeleteIcon /></div>
							</div>
						</li>
					))
				}
			</ul>
			<Popup trigger={popup} setTrigger={setPopup}>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Task Title" name={'title'} />
					<input type="text" placeholder="Task description" name={'desc'} />
					<button type='submit'>create new task</button>
				</form>
			</Popup>
			<Popup trigger={editPopup} setTrigger={setEditPopup}>
				<form onSubmit={(e) => handleEditedTaskSubmit( e, editTaskTitle, editTaskDescription)}>
					<input onChange={handleChange} type="text" placeholder="Task Title" name={'title'} value={editTaskTitle} />
					<input onChange={handleChange} type="text" placeholder="Task description" name={'desc'} value={editTaskDescription} />
					<button type='submit'>Edit Task</button>
				</form>
			</Popup>
		</div>
	)
};

export default Tasks;