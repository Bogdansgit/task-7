import React, { useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PushPinIcon from '@mui/icons-material/PushPin';

import "./style.scss";
import { ReactComponent as AddPostIcon } from "../../images/addPost.svg";
import Popup from "../../components/Popup";
import notify from "../../utils/notification.helpers";


function Tasks () {
	const [newTask, setNewTask] = useState({task: ""})
	const [tasks, setTasks] = useState([]);
	const [editTask, setEditTask] = useState({task: ""});
	const [popup, setPopup] = useState(false);
	const [editPopup, setEditPopup] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5010/task")
			.then((res) => res.json())
			.then((data) => setTasks(data.sort((x, y) => {
				return (x.pinned === y.pinned)? 0 : x.pinned? -1 : 1;
			})));
	}, []);

	const handleAddTasks = (e) => {
		e.preventDefault();
		setPopup(true);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewTask({ ...newTask, [name]: value });
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("http://localhost:5010/task", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
			},
			body: JSON.stringify(newTask),
		})
			.then((res) => res.json())
			.then((data) => setTasks([...tasks, data]));

		setNewTask({task: ""})
		notify('🦄 Post succesfully created!');
		setPopup(false);
	}

	const removeTask = (e, id) => {
		e.preventDefault();

		fetch(`http://localhost:5010/task/${id}`, {
			method: "DELETE",
		})

		fetch("http://localhost:5010/task", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => setTasks(data));
		
		notify('Post succesfully deleted!');
	}

	const editTasks = (e, post) => {
		e.preventDefault();

		setEditPopup(true);
		setEditTask(post);
	}

	const handleEditTaskChange = (e) => {
		const { name, value } = e.target;
		setEditTask({ ...editTask, [name]: value })
	}

	const handleEditedTaskSubmit = (e, id) => {
		e.preventDefault();

		fetch(`http://localhost:5010/task/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type" : "application/json",
			},
			body: JSON.stringify(editTask),
		})

		fetch("http://localhost:5010/task")
			.then((res) => res.json())
			.then((data) => setTasks(data));

		setEditTask({task: ""})

		setEditPopup(false);
		notify('🦄 Task succesfully edited!');
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
						<li key={task._id}>
							<div className="posts-box">
								<div className="complete">
									{task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
								</div>
								<div className="pin" >
									{task.pinned ? <PushPinIcon /> : <PushPinIcon color="disabled" />}
								</div>
								<h4 >{task.task}</h4>
								<p>{task.description}</p>
							</div>
							<div className="icons-box">
								<div className="edit" onClick={(e) => editTasks(e, task)}><EditIcon /></div>
								<div className="remove" onClick={(e) => removeTask(e, task._id)}><DeleteIcon /></div>
							</div>
						</li>
					))
				}
			</ul>
			<Popup trigger={popup} setTrigger={setPopup}>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Task" name={'task'} value={newTask.task} onChange={handleChange} />
					<button type='submit'>create new task</button>
				</form>
			</Popup>
			<Popup trigger={editPopup} setTrigger={setEditPopup}>
				<form onSubmit={(e) => handleEditedTaskSubmit( e, editTask._id)}>
					<input onChange={handleEditTaskChange} type="text" placeholder="Task" name={'task'} value={editTask.task} />
					<button type='submit'>Edit Task</button>
				</form>
			</Popup>
		</div>
	)
};

export default Tasks;