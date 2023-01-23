import React, { Suspense, useEffect, useState } from "react";

import "./style.scss";
import HeroSection from '../../components/HeroSection';
import DataTable from 'react-data-table-component';

const DemoSection = React.lazy(() => import('../../components/DemoSection'));

function Home () {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));
	}, [])

	
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
		}
	];

	return (
		<>
			<HeroSection/>
			<div className="postsl">
				<div className="container">
					<DataTable
					columns={columns}
					data={posts}
				/>
				</div>
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<DemoSection/>
			</Suspense>
		</>
	)
};

export default Home;