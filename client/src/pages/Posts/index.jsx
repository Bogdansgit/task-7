import React, { useEffect, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import "./style.scss";
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
	const [editPost, setEditPost] = useState({
		title: "",
		body: "",
		name: "",
	});
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
		setNewPost({
			title: "",
			body: "",
			name: "",
		})
	}

	const removePosts = (e, id) => {
		e.preventDefault();
		
		fetch(`http://localhost:5010/posts/${id}`, {
			method: "DELETE",
		})

		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));
		
		notify('Post succesfully deleted!');
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewPost({ ...newPost, [name]: value })
	}
	
	const editPosts = (e, post) => {
		e.preventDefault();
		setEditPopup(true);
		setEditPost(post);
	}

	const handleEditPostChange = (e) => {
		const { name, value } = e.target;
		setEditPost({ ...editPost, [name]: value })
	}

	const handleEditedPostSubmit = (e, id) => {
		e.preventDefault();
		fetch(`http://localhost:5010/posts/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type" : "application/json",
			},
			body: JSON.stringify(editPost),
		})

		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));

			setEditPost({
				title: "",
				body: "",
				name: "",
			})
			
		notify('🦄 Post succesfully updated!');
		setEditPopup(false);
	}

	const addLike = (e, post) => {
		fetch(`http://localhost:5010/posts/${post._id}/like`, {
			method: "PUT",
		})

		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));
		}
		
	const removeLike = (e, post) => {
		fetch(`http://localhost:5010/posts/${post._id}/like`, {
			method: "DELETE",
		})

		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));

	}

	return (
		<div className="posts">
			<div className="posts__top-line">
				<h3>Posts</h3>
				<div className="add" onClick={handleAddPosts}><AddPostIcon /></div>
			</div>
			<ul className="posts-list">
				{
					posts.map(post => (
						<li key={post._id}>
							<div className="posts-box">
								<h4 >{post.title}</h4>
								<p>{post.name}</p>
								<p className="post-body">{post.body}</p>
							</div>
							<div className="icons-box">
								<div className="add-likes" onClick={(e) => addLike(e, post)}><ThumbUpOffAltIcon />{post.likes}</div>
								<div className="remove-likes" onClick={(e) => removeLike(e, post)}><ThumbDownAltIcon /></div>
								<div className="edit" onClick={(e) => editPosts(e, post)}><EditIcon /></div>
								<div className="remove" onClick={(e) => removePosts(e, post._id)}><DeleteIcon /></div>
							</div>
						</li>
					))
				}
			</ul>
			<Popup trigger={popup} setTrigger={setPopup}>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Post Title" name={'title'} value={newPost.title} onChange={handleChange} />
					<textarea placeholder="Body" name={'body'} value={newPost.body} onChange={handleChange} />
					<input type="text" placeholder="name" name={'name'} value={newPost.name} onChange={handleChange} />
					<button type='submit'>create new post</button>
				</form>
			</Popup>
			<Popup trigger={editPopup} setTrigger={setEditPopup}>
				<form onSubmit={(e) => handleEditedPostSubmit(e, editPost._id)}>
					<input type="text" placeholder="Post Title" name={'title'} value={editPost.title} onChange={handleEditPostChange} />
					<textarea placeholder="Body" name={'body'} value={editPost.body} onChange={handleEditPostChange} />
					<input type="text" placeholder="name" name={'name'} value={editPost.name} onChange={handleEditPostChange} />
					<button type='submit'>Edit post</button>
				</form>
			</Popup>
		</div>
	)
};

export default Posts;