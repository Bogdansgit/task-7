import React, { useContext } from "react";

import "./style.scss";
import NavItem from "../NavItem";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SettingsIcon from '@mui/icons-material/Settings';
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
            <NavItem to='/dashboard/settings'><SettingsIcon fontSize="small" />Settings</NavItem>
        </div>
    );
}

export default Sidebar;