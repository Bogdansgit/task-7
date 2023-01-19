import React, { useContext } from "react";

import "./style.scss";
import NavItem from "../NavItem";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { AuthContext } from "../../Context/auth";

const Sidebar = () => {
    const context = useContext(AuthContext);
	const user = context.user

    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <div className="profile-photo">
                    <InsertEmoticonIcon  fontSize="large" />
                </div>
                <p>{`id: ${user.id}`}</p>
				<p>{`email: ${user.email}`}</p>
            </div>
            <NavItem to='/dashboard'>Dashboard</NavItem>
            <NavItem to='/dashboard/tasks'>Tasks</NavItem>
            <NavItem to='/dashboard/posts'>Posts</NavItem>
        </div>
    );
}

export default Sidebar;