import React from "react";

import './style.scss'
import NavItem from "../NavItem";
import NavList from "../NavList";


function Footer () {

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-content__col">
						<div className='logo'><h2>My-app</h2></div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						<p>©My-app 2022. All rights reserved</p>
					</div>
					<div className="footer-content__col">
						<div className="footer-items">
							<h3>Top Category</h3>
							<NavList orientation={'vertical'}>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
							</NavList >
						</div>
						<div className="footer-items">
							<h3>Top Tag</h3>
							<NavList orientation={'vertical'}>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
							</NavList >
						</div>
						<div className="footer-items">
							<h3>Menu</h3>
							<NavList orientation={'vertical'}>
								<NavItem url='#'>Home</NavItem>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
								<NavItem url='#'>Item</NavItem>
							</NavList >
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;