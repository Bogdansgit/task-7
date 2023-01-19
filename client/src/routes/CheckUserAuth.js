import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../Context/auth";
import ProtectedLayout from "../layouts/ProtectedLayout";
import PublicLayout from "../layouts/PublicLayout";


function CheckUserAuth(redirectPath='/') {
	const { user } = useContext(AuthContext);
	
	return user ? (
		<PublicLayout>
			<Navigate to={redirectPath} />
		</PublicLayout>
	) : (
		<ProtectedLayout>
			<Navigate to={redirectPath} />
		</ProtectedLayout>
	)
};

export default CheckUserAuth;