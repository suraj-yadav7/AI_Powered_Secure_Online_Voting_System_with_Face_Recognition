import React from "react";
import { Toaster } from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home   from "./components/pages/Home";
import User   from "./components/pages/User";
import Voter  from "./components/pages/Voter";
import Login  from "./components/pages/Login";
import Header from "./components/pages/Header";
import Signup from "./components/pages/Signup";
import Nominee  from "./components/pages/Nominee";
import Election from "./components/pages/Election";
import UserProfile    from "./components/pages/UserProfile";
import UserApproval   from "./components/pages/UserApproval";
import VoterApproval  from "./components/pages/VoterApproval";
import VoterProfile   from "./components/pages/VoterProfile";
import AdminDashboard from "./components/pages/AdminDashboard";
import VoterRegistration  from "./components/pages/VoterRegistration";
import UserDashboard from "./components/pages/UserDashboard";
import Voting from "./components/pages/Voting";
import Results from "./components/pages/Results";
import Layout from "./components/pages/Layout";
import "./App.css"


const App = () =>{
  return (
    <>
    <Toaster/>
    {/* Header Section */}
    <Router>
      <Routes>
        <Route path="/login"      element={<Login/>}/>
        <Route path="/signup"     element={<Signup/>}/>
        <Route element={<Layout />}>
          <Route path="/"           element={<Home/>}/>
          <Route path="/user"       element={<User/>}/>
          <Route path="/voter"      element={<Voter/>}/>
          <Route path="/voting"     element={<Voting/>}/>
          <Route path="/result"     element={<Results/>}/>
          <Route path="/nominee"    element={<Nominee/>}/>
          <Route path="/election"   element={<Election/>}/>
          <Route path="/user-profile"     element={<UserProfile/>}/>
          <Route path="/voter-profile"    element={<VoterProfile/>}/>
          <Route path="/user-approval"    element={<UserApproval/>}/>
          <Route path="/voter-approval"   element={<VoterApproval/>}/>
          <Route path="/voter-register"   element={<VoterRegistration/>}/>
          <Route path="/admin-dashboard"  element={<AdminDashboard/>}/>
          <Route path="/user-dashboard"   element={<UserDashboard/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
};

export default App;