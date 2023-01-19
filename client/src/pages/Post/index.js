import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.scss";

function Post () {
	const BASE_URL = 'https://api.punkapi.com/v2/beers';
	const [beer, setBeer] = useState([]);

	const { id } = useParams();
	
	useEffect (() => {
		loadBeers();
	}, []);

	const loadBeers = () => {
		axios
			.get(BASE_URL, {
				params: {ids: id}
			})
			.then((res) => {
				setBeer(res.data);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	return (
		
		<div className="single-post">
			<div className="container">
				{beer.map((beer) => (
					<div key={beer.id}>
						<h1>{beer.name}</h1>
						<img src={beer.image_url} alt={beer.name} />
						<p>{beer.description}</p>
					</div>
				))}
			</div>
		</div>
	)
};

export default Post;