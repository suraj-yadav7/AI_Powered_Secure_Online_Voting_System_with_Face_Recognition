import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css"
import Home from "./components/Home";

const App = () =>{
  return (
    <>
    <div className="bg-red-400">AI Powered Online voting system.</div>
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
};

export default App;