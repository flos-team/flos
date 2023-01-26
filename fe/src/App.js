// import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Transition from "./Transition";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Transition />
      </Router>
    </div>
  );
}

export default App;
