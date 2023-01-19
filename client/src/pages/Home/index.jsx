import React, { Suspense, useEffect, useState } from "react";

import "./style.scss";
import HeroSection from '../../components/HeroSection';

const DemoSection = React.lazy(() => import('../../components/DemoSection'));

function Home () {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5010/posts")
			.then((res) => res.json())
			.then((data) => setPosts(data.data));
	}, [])

	return (
		<>
			<HeroSection/>
			<div className="postsl">
				<h3>Posts list</h3>
				{JSON.stringify(posts)}
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<DemoSection/>
			</Suspense>
		</>
	)
};

export default Home;