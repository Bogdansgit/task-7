import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/auth";


function PrivateRoute({redirectPath='/'}) {
	const { user } = useContext(AuthContext);
	console.log(user);
	if(user) {
		return <Navigate to={redirectPath} />
	}

	return (
		<div className="container"><Outlet /></div>
	)
};

export default PrivateRoute;