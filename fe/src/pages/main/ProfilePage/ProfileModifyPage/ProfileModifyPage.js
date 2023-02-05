/* import react */
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import userImg from "../../../../assets/DummyData/dummy-sample.jpg";
/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
/* import lib */

/* import css */
import "./ProfileModifyPage.css";

const ProfileModifyPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent
        backVisible={true}
        pageName={"프로필 편집"}
        menuOpt2={"CHECK"}
        menuOpt2Func={() => navigate(-1)}
      />
      <div className="profiile-edit-page-conatiner">
        <div className="profile-photo-edit-container">
          <div className="user-img" style={{ backgroundImage: `url(${userImg})` }}></div>
          <div className="profile-photo-edit-btn">
            <label htmlFor="photo-input">프로필 사진 수정</label>
            <input type="file" id="photo-input" style={{ display: "none" }} />
          </div>
        </div>
        <div className="profile-edit-container">
          <div className="profile-edit-item">
            <label className="nickname-input-lab" htmlFor="nickname-input">
              닉네임
            </label>
            <input className="nickname-input" type="text" id="nickname-input" placeholder={"김채원"} />
          </div>
          <div className="profile-edit-item">
            <label className="introduce-input-lab" htmlFor="introduce-input">
              소개글
            </label>
            <input
              className="introduce-input"
              type="text"
              id="introduce-input"
              placeholder={"안녕하세요 르세라핌 김채원입니다."}
            />
          </div>
          <div className="password-modify-item">
            <Link to="/pwchange">
              <div className="password-modify-btn">
                <p>비밀번호 변경</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModifyPage;
