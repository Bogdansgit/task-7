import React from "react";
import { NavLink } from 'react-router-dom';

import "./style.scss";

const NavItem = (props) => {
    return (
        <li className="navItem">
            <NavLink className='navLink' to={props.to}>{props.children}</NavLink>
        </li>
    );
}

export default NavItem;