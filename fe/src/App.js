// import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Transition from "./Transition";
// import Main from "./pages/main/MainPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Transition />
      </Router>
      {/* <Main></Main> */}
    </div>
  );
}

export default App;
