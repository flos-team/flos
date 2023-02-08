/* import react */
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsToastValue, setToastMessage } from "../../../../redux/toast";
/* import lib */

/* import img */
import userImg from "../../../../assets/DummyData/dummy-sample.jpg";
/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import DangerAlertModal from "../../../../components/DangerAlertModal/DangerAlertModal";

/* import modules */
import { getMemberInfo, modifyUserInfo } from "../../../../api/MemberAPI";

/* import css */
import "./ProfileModifyPage.css";

const ProfileModifyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [userInfo, setUserInfo] = useState({ email: "", profileURL: "" });
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  // intro, nickname, profileImage ~
  // 삭제 알람창 보이기 옵션을 위한 state
  const [isOpen, setIsOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // init Data
  useEffect(() => {
    let data = getMemberInfo();
    data.then((res) => {
      //console.dir(res);
      let userData = {
        email: res.email,
        // nickname: res.nickname,
        // introduction: res.introduction,
        profileURL: `https://i8b210.p.ssafy.io/api/file/${res.profileImage.saveName}`,
      };
      setNickname(res.nickname);
      setIntroduction(res.introduction);
      setUserInfo(userData);
      // res.email
      // res.nickname;
      // res.introduction
      // res.profileImage.saveName
    });
  }, []);

  const imgInputRef = useRef(1);
  const nicknameRef = useRef(2);
  const introRef = useRef(3);

  // functions;
  const modifyMemberInfoFunc = async () => {
    let data = modifyUserInfo(nickname, introduction);
    await data.then((res) => {
      // console.log(res); // true
      dispatch(setIsToastValue(true));
      dispatch(setToastMessage("회원정보 수정이 완료되었습니다."));
    });
  };

  // redux-toolkit
  const toastValue = useSelector((state) => state.toast.isToast);
  const toastMessage = useSelector((state) => state.toast.toastMessage);

  return (
    <>
      <HeaderComponent
        backVisible={true}
        pageName={"프로필 편집"}
        menuOpt2={"CHECK"}
        menuOpt2Func={async () => {
          if (isChanged) {
            await modifyMemberInfoFunc();
          } else console.log("값이 비어서 수정 안함");
          navigate("/main");
        }}
      />
      <div className="profiile-edit-page-conatiner">
        <div className="profile-photo-edit-container">
          <div className="user-img" style={{ backgroundImage: `url(${userInfo.profileURL})` }}></div>
          <div className="profile-photo-edit-btn">
            <label htmlFor="photo-input">프로필 사진 수정</label>
            <input
              type="file"
              id="photo-input"
              multiple
              accept="image/jpg, image/jpeg, image/png"
              ref={imgInputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="profile-edit-container">
          <div className="profile-edit-item">
            <label className="email-input-lab" htmlFor="email-input">
              이메일
            </label>
            <input className="email-input" type="text" id="email-input" placeholder={userInfo.email} disabled />
          </div>
          <div className="profile-edit-item">
            <label className="nickname-input-lab" htmlFor="nickname-input">
              닉네임
            </label>
            <input
              className="nickname-input"
              type="text"
              id="nickname-input"
              placeholder={nickname}
              ref={nicknameRef}
              onChange={(e) => {
                setNickname(e.target.value);
                setIsChanged(true);
              }}
            />
          </div>
          <div className="profile-edit-item">
            <label className="introduce-input-lab" htmlFor="introduce-input">
              소개글
            </label>
            <input
              className="introduce-input"
              type="text"
              id="introduce-input"
              placeholder={introduction}
              ref={introRef}
              onChange={(e) => {
                setIntroduction(e.target.value);
                setIsChanged(true);
              }}
            />
          </div>
          <div className="password-modify-item">
            <Link to="/pwchange">
              <div className="password-modify-btn">
                <p>비밀번호 변경</p>
              </div>
            </Link>
            <div
              className="user-exit-btn"
              onClick={(e) => {
                setIsOpen(true);
              }}
            >
              <p>회원 탈퇴</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <DangerAlertModal
          message={"정말 FLOS를 떠나시겠어요?"}
          positive={"취소"}
          negative={"탈퇴"}
          setIsOpen={(e) => {
            setIsOpen(false);
          }}
        ></DangerAlertModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileModifyPage;
