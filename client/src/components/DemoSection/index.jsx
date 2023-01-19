import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from 'react-select';

import "./style.scss";
import { demoData } from "../../api";
import Button from "../Button";
import Views from "../Views";
import Comment from "../Comments";
// import Card from "../Card";

function DemoSection () {
	const BASE_URL = 'https://api.punkapi.com/v2/beers';

	const [beers, setBeers] = useState([]);
	const [demoBeers, setDemoBeers] = useState([]);
	const [isCompleted, setIsCompleted] = useState(false);
	const [page, setPage] = useState(1);

	const {views, likes} = demoData;

	useEffect (() => { 
		loadBeers();
	}, []);

	useEffect (() => {
		setDemoBeers({...beers[0]});
	}, [beers]);

	const loadBeers = () => {
		axios
			.get(BASE_URL, {
				params: {page: page, per_page: 20}
			})
			.then((res) => {
				setBeers([...beers, ...res.data]);
				setPage ((prevPage) => prevPage + 1);
				setIsCompleted(res.data.length > 0);
			})
			.catch((error) => {
				console.log(error);
			})
	}
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	const searchBeer = (e) => {
		const searchQuery = e.target.value;

		axios
		.get(BASE_URL, {
			params: {beer_name: searchQuery}
		})
		.then((res) => {
			setBeers(res.data);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	return (
		<section className="demo-section">
			<div className="container">
				<form action="/" className="form">
					<div className="select-bar">
						<select className="select">
							<option value="value" disabled>Search...</option>
							<option value="value1" >Значение 1</option>
							<option value="value2" >Значение 2</option>
							<option value="value3">Значение 3</option>
						</select>
						<Select options={options} className="select" />
					</div>
					<div className="search-bar">
						<input onKeyUp={searchBeer} type="search" placeholder="Search"/>
					</div>
				</form>
				<div className="demo-section-columns">
					<div className="demo-section-columns__col">
						<div className="demo-section__title">{demoBeers.name}</div>
						<div className="demo-section__text">{demoBeers.description}</div>
						<div className="bottom-line">
							<Button link={`/post/${demoBeers.id}`} withIcon>Read more</Button>
							<div className="views-wrap">
								<Views>{views}</Views>
								<Comment>{likes}</Comment>
							</div>
						</div>
					</div>
					<div className="demo-section-columns__col">
						<div className="demo-section__visual">
						<img src={demoBeers.image_url} alt={demoBeers.name} className="demo-section__img" />
						</div>
					</div>
				</div>
				<div className="grid-container">
					{
						beers.map((beer) => (
							<div key={beer.id} className="card">
								<div className="card__visual">
									<img src={beer.image_url} alt={beer.name}/>
								</div>
								<h3 className="card__title">{beer.name}</h3>
								<p className="card__text">{beer.description}</p>
								<div className="card__bottom-line">
									<Button link={`/post/${beer.id}`} withIcon>Read More</Button>
									<div className="views-wrap">
										<Views>{views}</Views>
										<Comment>{likes}</Comment>
									</div>	
								</div>
							</div>
						))
					}
				</div>
				<div className="btn-wrap">
					<Button onClick={loadBeers}>Load more</Button>
				</div>
			</div>
		</section>
	)
}

export default DemoSection;