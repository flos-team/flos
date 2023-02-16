/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

/* import compoents */
import FlowerGlassBottle from "../../GardenComponent/FlowerGlassBottleItem";

/* import module */

/* import css */
import "./LetterStep1Component.css";

const LetterStep1Component = ({ step1Obj }) => {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <div className="letter-step1-component">
        <div className="end-result-text-container">
          <p>
            " {step1Obj.nickname} " 의 사랑으로 예쁜 꽃이 탄생했어요.
            <br />
            꽃의 종류는 <b>{step1Obj.flowerName}</b> <br /> 꽃말은
          </p>
          <p>
            {step1Obj.flowerMeans.map((e, i) => (
              <b key={i}>
                {e}
                {",  "}
              </b>
            ))}
          </p>
          <p>
            {step1Obj.foryou} 당신을 위해 준비했어요.
          </p>
        </div>
        <div className="flower-container">
          <img src={step1Obj.flowerImg} />
          {/* <FlowerGlassBottle width={"256px"} height={"256px"}></FlowerGlassBottle> */}
        </div>
      </div>
    </>
  );
};

export default LetterStep1Component;
