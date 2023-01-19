import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/auth";


function PublicRoute(redirectPath='/login') {
	const { user } = useContext(AuthContext);
	if (user) {
		return <Navigate to={redirectPath} />
	}

	return (
		<div className="container"><Outlet /></div>
	)
};

export default PublicRoute;