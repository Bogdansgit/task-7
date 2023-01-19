import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import Login from "../../pages/Login/Login";

import "./style.scss";


function PublicLayout() {

	return (
		<div className="container"><Outlet /></div>
	)
};

export default PublicLayout;