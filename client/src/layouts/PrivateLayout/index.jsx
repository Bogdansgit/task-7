import React from "react";
import { Outlet } from "react-router-dom";

import "./style.scss";
import Sidebar from "../../components/Sidebar";


function PrivateLayout() { 

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<Sidebar />
				</div>
				<div className="col">
					<Outlet />
				</div>
			</div>
		</div>
	)
};

export default PrivateLayout;