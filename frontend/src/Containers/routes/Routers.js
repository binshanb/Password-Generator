import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ErrorPage from "../pages/404Page";
import PrivateRoute from "../utils/PrivateRoute";

const Routers = () => {
  return (
    <Routes>

      <Route path="/signup" element={<Signup />} />
       <Route path='/login' element={<Login/>} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
