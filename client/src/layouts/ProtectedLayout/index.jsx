import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import Login from "../../pages/Login/Login";

import "./style.scss";


function ProtectedLayout(redirectPath='/') {
	const { user } = useContext(AuthContext);
	if(user) {
		return <Navigate to={redirectPath} />
	}
	return (
		<div className="container"><Login /></div>
	)
};

export default ProtectedLayout;