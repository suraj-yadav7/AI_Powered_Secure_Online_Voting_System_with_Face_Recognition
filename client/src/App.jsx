import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css"
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { Toaster } from "react-hot-toast";
import Voter from "./components/pages/Voter";
import Home from "./components/pages/Home";
import UserProfile from "./components/pages/UserProfile";
import VoterProfilePage from "./components/pages/VoterProfile";
import Nominee from "./components/pages/Nominee";
import Election from "./components/pages/Election";
import Header from "./components/pages/Header";


const App = () =>{
  return (
    <>
    <Toaster/>
    {/* Header Section */}
    <Header />
    <Router>
      <Routes>
        <Route path="/"         element={<Home/>}/>
        <Route path="/login"    element={<Login/>}/>
        <Route path="/signup"   element={<Signup/>}/>
        <Route path="/voter"    element={<Voter/>}/>
        <Route path="/nominee"  element={<Nominee/>}/>
        <Route path="/election" element={<Election/>}/>
        <Route path="/user-profile"   element={<UserProfile/>}/>
        <Route path="/voter-profile"  element={<VoterProfilePage/>}/>
      </Routes>
    </Router>
    </>
  )
};

export default App;