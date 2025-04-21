import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ForgetPass from "./Pages/ForgetPass";
import ManageTask from './Pages/ManageTask';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/managetask" element={<ManageTask />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
