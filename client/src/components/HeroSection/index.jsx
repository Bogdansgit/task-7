import React from "react";

import heroImage from "../../images/image-1.jpg";
import "./style.scss";

function HeroSection () {

	return (
		<section className="hero-section">
			<img src={heroImage} className='hero-image' alt="logo" />
		</section>
	)
}

export default HeroSection;