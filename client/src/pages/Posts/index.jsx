import React, { useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from 'react-data-table-component';

import "./style.scss";
// import { postsData } from "../../api";
import { ReactComponent as AddPostIcon } from "../../images/addPost.svg";
import Popup from "../../components/Popup";
import notify from "../../utils/notification.helpers";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState({
		title: "",
		body: "",
		name: "",
	});
	// const [posts, setPosts] = useState([...postsData]);
	const [editPostId, setEditPostId] = useState('');
	const [editPostTitle, setEditPostTitle] = useState('');
	const [editPostDescription, setEditPostDescription] = useState('');
	const [popup, setPopup] = useState(false);
	const [editPopup, setEditPopup] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));
	}, [])
	
	const handleAddPosts = (e) => {
		e.preventDefault();
		setPopup(true);
	}
	
	const removePosts = (e, id) => {
		e.preventDefault();
		setPosts(posts.filter(post => post.id !== id));
		notify('Post succesfully deleted!');
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("http://localhost:5010/posts", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
			},
			body: JSON.stringify(newPost),
		})
			.then((res) => res.json())
			.then((data) => setPosts([...posts, data]));

		notify('🦄 Post succesfully created!');
		setPopup(false);
	}

	const handleEditedPostSubmit = (e, title, description) => {
		e.preventDefault();

		setPosts([ ...posts.filter(post => post.id !== editPostId 
			), {id: editPostId, title, description}
		]);

		setEditPopup(false);
		notify('🦄 Post succesfully edited!');
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewPost({ ...newPost, [name]: value })
	}
	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
		

	// 	if (name === 'title') {setEditPostTitle(value)}
	// 	if (name === 'desc') {setEditPostDescription(value)}
	// }

	const editPosts = (e, id, title, description) => {
		e.preventDefault();

		setEditPopup(true);
		setEditPostTitle(title);
		setEditPostDescription(description);
		setEditPostId(id);
	}

	const columns = [
		{
			name: 'ID',
			selector: row => row._id,
			sortable: true,
		},
		{
			name: 'Title',
			selector: row => row.title,
			sortable: true,
		},
		{
			name: 'Body',
			selector: row => row.body,
			sortable: true,
		},
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'createdAt',
			selector: row => row.createdAt,
			sortable: true,
		},
		{
			name: 'Likes',
			selector: row => row.likes,
			sortable: true,
		},
	];

	return (
		<div className="posts">
			<div className="posts__top-line">
				<h3>Posts</h3>
				<div className="add" onClick={handleAddPosts}><AddPostIcon /></div>

			</div>
				<DataTable
					columns={columns}
					data={posts}
				/>
			{/* <ul className="posts-list">
				{
					posts.map(post => (
						<li key={post.id}>
							<div className="posts-box">
								<h4 >{post.title}</h4>
								<p>{post.description}</p>
							</div>
							<div className="icons-box">
								<div className="edit" onClick={(e) => editPosts(e, post.id, post.title, post.description)}><EditIcon /></div>
								<div className="remove" onClick={(e) => removePosts(e, post.id)}><DeleteIcon /></div>
							</div>
						</li>
					))
				}
			</ul> */}
			<Popup trigger={popup} setTrigger={setPopup}>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Post Title" name={'title'} value={newPost.title} onChange={handleChange} />
					<textarea placeholder="Body" name={'body'} value={newPost.body} onChange={handleChange} />
					<input type="text" placeholder="name" name={'name'} value={newPost.name} onChange={handleChange} />
					<button type='submit'>create new post</button>
				</form>
			</Popup>
			<Popup trigger={editPopup} setTrigger={setEditPopup}>
				<form onSubmit={(e) => handleEditedPostSubmit( e, editPostTitle, editPostDescription)}>
					<input onChange={handleChange} type="text" placeholder="Post Title" name={'title'} value={editPostTitle} />
					<input onChange={handleChange} type="text" placeholder="Post description" name={'desc'} value={editPostDescription} />
					<button type='submit'>Edit post</button>
				</form>
			</Popup>
		</div>
	)
};

export default Posts;