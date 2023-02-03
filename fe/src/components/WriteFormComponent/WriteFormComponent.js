import { useState } from "react";

/* import img */
import pictureIcon from "../../assets/GlobalAsset/picture-btn.png";

/* import compoents */
import ToggleBtn from "../ToggleBtn/ToggleBtn";

/* import css */
import "./WriteFormComponent.css";

const WriteFormComponent = ({ holderFunc }) => {
  return (
    <form
      className="post-write-form"
      onBlur={(e) => {
        holderFunc(true);
      }}
    >
      <div
        className="post-write-input-div"
        onFocus={(e) => {
          holderFunc(false);
        }}
      >
        <textarea className="post-content-input" placeholder="내용을 입력하세요" />
        <input className="post-tag-input" placeholder="#태그를 입력하세요" />
      </div>
      <div className="post-option-container">
        <label for="test">
          <div className="photo-add-btn">
            <input type="file" id="test"></input>
            <img src={pictureIcon} />
          </div>
        </label>
        <div className="toggle-btn-container">
          <p className="toggle-text">공개설정</p>
          {/* <div className="toggle-btn"></div> */}
          <ToggleBtn></ToggleBtn>
        </div>
      </div>
    </form>
  );
};

export default WriteFormComponent;
