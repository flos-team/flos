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

const LetterStep4Component = ({ step4Obj }) => {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <div className="letter-step4-component">
        <div className="end-result-text-container">
          <p>
            <b>
              "{user.nickname}" 님과 {step4Obj.name}의 추억이 기록되었어요.
            </b>
          </p>
          <p>당신과 {step4Obj.name}가 함께한 추억은 한 병의 유리병에 담겨</p>
          <p>
            오랫동안 {user.nickname} 님과 함께 할 것입니다.
          </p>
        </div>
        <div className="flower-container">
          <FlowerGlassBottle width={"256px"} height={"256px"} color={step4Obj.color}></FlowerGlassBottle>
        </div>
      </div>
    </>
  );
};

export default LetterStep4Component;
