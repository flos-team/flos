/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* import img */

/* import compoents */
import FlowerGlassBottle from "../../GardenComponent/FlowerGlassBottleItem";

/* import module */

/* import css */
import "./LetterStep4Component.css";

const LetterStep4Component = () => {
  return (
    <>
      <div className="letter-step4-component">
        <div className="end-result-text-container">
          <p>텍스트가 올거임</p>
          <p>텍스트가 올거임</p>
        </div>
        <div className="flower-container">
          <FlowerGlassBottle width={"256px"} height={"256px"}></FlowerGlassBottle>
        </div>
      </div>
    </>
  );
};

export default LetterStep4Component;
