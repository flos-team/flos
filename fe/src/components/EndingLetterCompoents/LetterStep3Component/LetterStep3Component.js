/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

/* import img */

/* import compoents */

/* import module */

/* import css */
import "./LetterStep3Component.css";

const LetterStep3Component = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <div className="letter-step3-component">
        <div className="letter-user-nickname-div">
          <p>TO. [춘식이, 식물이름]</p>
        </div>
        <div className="lettter-content-div">
          <textarea className="lettter-content-input" type="text" placeholder="내용을 입력해주세요" />
        </div>
        <div className="letter-flower-name-div">
          <p className="letter-flower-name-div">FROM. {user.nickname}</p>
        </div>
      </div>
    </>
  );
};

export default LetterStep3Component;
