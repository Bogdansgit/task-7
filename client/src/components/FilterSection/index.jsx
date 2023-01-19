import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';

import "./style.scss";

function FilterSection () {
	const BASE_URL = 'https://api.punkapi.com/v2/beers';

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	];

	const [beers, setBeers] = useState([]);

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
		<section className="filter-section">
			<div className="container">
				<form action="/" className="form">
					<div className="select-bar">
						<select className="select">
							<option value="value" disabled default>Search...</option>
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
			</div>
		</section>
	)
};

export default FilterSection;