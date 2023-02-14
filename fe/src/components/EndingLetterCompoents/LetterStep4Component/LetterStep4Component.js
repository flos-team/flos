/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

/* import img */

/* import compoents */
import FlowerGlassBottle from "../../GardenComponent/FlowerGlassBottleItem";

/* import module */

/* import css */
import "./LetterStep4Component.css";

const LetterStep4Component = ({ name }) => {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <div className="letter-step4-component">
        <div className="end-result-text-container">
          <p>
            <b>
              "{user.nickname}" 님과 {name}의 추억이 기록되었어요.
            </b>
          </p>
          <p>당신과 {name}가 함께한 추억은 한 병의 향수가 되어</p>
          <p>
            오랫동안 {user.nickname} 님이 풍기는 <span>향기</span>가 되어줄 것입니다.
          </p>
        </div>
        <div className="flower-container">
          <FlowerGlassBottle width={"256px"} height={"256px"}></FlowerGlassBottle>
        </div>
      </div>
    </>
  );
};

export default LetterStep4Component;
