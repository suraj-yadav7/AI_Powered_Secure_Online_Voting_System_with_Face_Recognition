import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css"
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { Toaster } from "react-hot-toast";

const App = () =>{
  return (
    <>
    <Toaster/>
    <Router>
      <Routes>
        <Route path="/"   element={<Home/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/signup"  element={<Signup/>}/>
      </Routes>
    </Router>
    </>
  )
};

export default App;