import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../Context/auth";

import Layout from "../layouts/layout";
import PrivateLayout from "../layouts/PrivateLayout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import NoMatch from "../pages/NoMatch";
import Post from "../pages/Post";
import Posts from "../pages/Posts";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Profile from "../pages/Profile/Profile";
import Registration from "../pages/Registration/Registration";
import Settings from "../pages/Settings/Settings";
import Tasks from "../pages/Tasks";
import CheckUserAuth from "./CheckUserAuth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<NoMatch />} />
        <Route element={<PrivateRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/tasks" element={<Tasks />} />
            <Route path="/dashboard/posts" element={<Posts />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<CheckUserAuth />}>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
