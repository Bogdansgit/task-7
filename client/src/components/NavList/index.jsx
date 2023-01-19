import React from "react";
import "./style.scss";

const NavList = ({children, orientation}) => {

    const navStyle = orientation === 'vertical' ? 'vertical' : 'horizontal';

    return (
        <nav>
            <ul className={navStyle}>
                {children}
            </ul>
        </nav>
    );
}

export default NavList;