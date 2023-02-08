/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* import img */

/* import compoents */
import FlowerGlassBottle from "../../GardenComponent/FlowerGlassBottleItem"

/* import module */

/* import css */
import "./LetterStep1Component.css";

const LetterStep1Component = () => {

    return (<>
        <div className="letter-step1-component">
            <div className="end-result-text-container">
                <p>[닉네임]의 사랑으로 예쁜 꽃이 탄생했어요.<br/>꽃의 종류는 [빨간 튤립] <br/> 꽃말은</p>
                <p>사랑의 고백, 열정적인 사랑</p>
            </div>
            <div className="flower-container">
                <FlowerGlassBottle width={"256px"} height={"256px"}></FlowerGlassBottle>
            </div>
    </div>
    </>)
}

export default LetterStep1Component;