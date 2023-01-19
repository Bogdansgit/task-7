import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Layout() {

	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
			<ToastContainer />
		</div>
	)
}

export default Layout;