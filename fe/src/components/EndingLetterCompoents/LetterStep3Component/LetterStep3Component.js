/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

/* import img */

/* import compoents */

/* import module */

/* import css */
import "./LetterStep3Component.css";

const LetterStep3Component = ({ step3Obj }) => {
  const user = useSelector((state) => state.user.userData);

  const letterInputRef = useRef(1);
  const [letter, setLetter] = useState("");

  return (
    <>
      <div className="letter-step3-component">
        <div className="letter-user-nickname-div">
          <p>TO. {step3Obj.name}</p>
        </div>
        <div className="lettter-content-div">
          <textarea
            className="lettter-content-input"
            type="text"
            placeholder="당신의 꽃에게 전하고 싶은 이야기를 적어주세요"
            ref={letterInputRef}
            onChange={(e) => {
              setLetter(letterInputRef.current.value);
              // console.log(letterInputRef.current.value);
            }}
            onBlur={(e) => {
              // console.log("포커스 아웃");
              if (step3Obj.letter && step3Obj.letter.length) step3Obj.setLetterText(letter);
            }}
            disabled={step3Obj.letter && step3Obj.letter.length}
            value={step3Obj.letter && step3Obj.letter.length ? step3Obj.letter && step3Obj.letter : ""}
          />
        </div>
        <div className="letter-flower-name-div">
          <p className="letter-flower-name-div">FROM. {user.nickname}</p>
        </div>
      </div>
    </>
  );
};

export default LetterStep3Component;
