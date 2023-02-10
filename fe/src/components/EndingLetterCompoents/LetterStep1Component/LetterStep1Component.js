/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

/* import img */
import flowerBlue from "../../../assets/EndingAsset/flower-blue.png";
import flowerGreen from "../../../assets/EndingAsset/flower-green.png";
import flowerOrange from "../../../assets/EndingAsset/flower-orange.png";
import flowerPink from "../../../assets/EndingAsset/flower-pink.png";
import flowerPurple from "../../../assets/EndingAsset/flower-purple.png";
import flowerRed from "../../../assets/EndingAsset/flower-red.png";
import flowerWhite from "../../../assets/EndingAsset/flower-white.png";
import flowerYellow from "../../../assets/EndingAsset/flower-yellow.png";

/* import compoents */
import FlowerGlassBottle from "../../GardenComponent/FlowerGlassBottleItem";

/* import module */

/* import css */
import "./LetterStep1Component.css";

const LetterStep1Component = () => {
  const user = useSelector((state) => state.user.userData);
  const [imgIdx, setImgIdx] = useState(0);
  const [imgList, setImgList] = useState([
    flowerBlue,
    flowerGreen,
    flowerOrange,
    flowerPink,
    flowerPurple,
    flowerRed,
    flowerWhite,
    flowerYellow,
  ]);

  useEffect(() => {
    setImgIdx(Math.floor(Math.random() * imgList.length));
  }, []);
  return (
    <>
      <div className="letter-step1-component">
        <div className="end-result-text-container">
          <p>
            " {user.nickname} " 의 사랑으로 예쁜 꽃이 탄생했어요.
            <br />
            꽃의 종류는 [빨간 튤립] <br /> 꽃말은
          </p>
          <p>사랑의 고백, 열정적인 사랑</p>
        </div>
        <div className="flower-container">
          <img width="61px" height="206px" src={imgList[imgIdx]} />
          {/* <FlowerGlassBottle width={"256px"} height={"256px"}></FlowerGlassBottle> */}
        </div>
      </div>
    </>
  );
};

export default LetterStep1Component;
