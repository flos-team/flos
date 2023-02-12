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

const LetterStep1Component = ({ flowerImg, flowerMeans, flowerName }) => {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <div className="letter-step1-component">
        <div className="end-result-text-container">
          <p>
            " {user.nickname} " 의 사랑으로 예쁜 꽃이 탄생했어요.
            <br />
            꽃의 종류는 <b>{flowerName}</b> <br /> 꽃말은
          </p>
          <p>
            {flowerMeans.map((e, i) => (
              <b key={i}>
                {e}
                {",  "}
              </b>
            ))}
          </p>
        </div>
        <div className="flower-container">
          <img width="61px" height="206px" src={flowerImg} />
          {/* <FlowerGlassBottle width={"256px"} height={"256px"}></FlowerGlassBottle> */}
        </div>
      </div>
    </>
  );
};

export default LetterStep1Component;
