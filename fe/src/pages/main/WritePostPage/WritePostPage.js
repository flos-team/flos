/* import react */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import pictureIcon from "../../../assets/GlobalAsset/picture-btn.png";

/* import compoents */
import ToggleBtn from "../../../components/ToggleBtn/ToggleBtn";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostResultModal from "../../../components/PostResultModal/PostResultModal";

/* import css */
import "./WritePostPage.css";

const WritePostPage = ({ holderFunc }) => {
  // 글작성 모달 on/off 조정하는 함수
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent
        backVisible={true}
        pageName={"나의 마음 포스트 작성하기"}
        menuOpt2={"CHECK"}
        menuOpt2Func={() => {
          setIsVisible(true);
        }}
      ></HeaderComponent>
      <div className="post-write-container">
        <form className="post-write-form">
          <div className="post-write-input-div">
            <textarea className="post-content-input" placeholder="내용을 입력하세요" />
            <input className="post-tag-input" placeholder="#태그를 입력하세요" />
          </div>
          <div className="post-option-container">
            <label htmlFor="photo-input">
              <div className="photo-add-btn">
                <input type="file" id="photo-input"></input>
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
        {isVisible ? (
          <PostResultModal
            setVisible={setIsVisible}
            moveMain={() => {
              navigate("/main");
            }}
          ></PostResultModal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default WritePostPage;
