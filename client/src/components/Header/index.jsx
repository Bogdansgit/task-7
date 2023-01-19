import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/auth';

import "./style.scss";
import logo from "../../images/logo.svg";
import NavItem from "../NavItem";
import NavList from "../NavList";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Popup from '../Popup';

function Header () {
	const context = useContext(AuthContext);
	const user = context.user;

	const [popup, setPopup] = useState(false);

	return (
		<header className="header">
			<div className="container">
				<div className="header__content">
					<NavLink to={"/"}>
						<img src={logo} className='logo' alt="logo" />
					</NavLink>
					<div className='navi'>
						<NavList>
							<NavItem to={"/"}>Home</NavItem>
							<NavItem to={"/about"}>About</NavItem>
							<NavItem to={"/*"}>Item</NavItem>
							<NavItem to={"/*"}>Item</NavItem>
							<NavItem to={"/contact"}>Contact</NavItem>
						</NavList >
						<div>
							{
								user ? (
									<div className='header-profile'>
										<div className='header-profile-popup'>
											<div onClick={() => setPopup(true)}>
												<PersonOutlineIcon color='success' />
											</div>
											<Popup trigger={popup} setTrigger={setPopup}>
												<div className="profile-photo">
													<InsertEmoticonIcon  fontSize="large" />
												</div>
												<p>{`id: ${user.id}`}</p>
												<p>{`email: ${user.email}`}</p>
												<button onClick={() => context.logout()}>Logout</button>
											</Popup>
										</div>
										<button onClick={() => context.logout()}><LogoutIcon fontSize="small" /></button>
									</div>
								) : (
									<div>
										<Link to={'/login'}><LoginIcon  color="primary" /></Link>
									</div>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;