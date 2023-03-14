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

import Swal from "sweetalert2";

const ProfileModifyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // redux-toolkit
  const toastValue = useSelector((state) => state.toast.isToast);
  const toastMessage = useSelector((state) => state.toast.toastMessage);
  const user = useSelector((state) => state.user.userData);

  // state
  const [userInfo, setUserInfo] = useState({ email: "", profileURL: "" });
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  // intro, nickname, profileImage ~
  // 삭제 알람창 보이기 옵션을 위한 state
  const [isOpen, setIsOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const handleOnChange = (event) => {
    setIsChanged(true);
    //console.log(event.target.files);
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          // console.log(base64);
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
          }
        };
      }
    }
  };

  // init Data
  useEffect(() => {
    let data = getMemberInfo();
    data.then((res) => {
      //console.dir(res);
      let userData = {
        email: res.email,
        profileURL: `********${res.profileImage.saveName}`,
      };
      setNickname(res.nickname);
      setIntroduction(res.introduction);
      setUserInfo(userData);
    });
  }, []);

  // ref
  const imgInputRef = useRef(1);
  const nicknameRef = useRef(2);
  const introRef = useRef(3);
  const formRef = useRef(4);

  // functions;
  const modifyMemberInfoFunc = async () => {
    if (imgFile) {
      // console.log("이미지 있음");
      modifyUserInfo(nickname, introduction, imgFile[0]).then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "프로필 수정 성공",
          });
        }
      });
    } else {
      modifyUserInfo(nickname, introduction).then((res) => {
        if (res) {
          Swal.fire({
            icon: "success",
            title: "프로필 수정 성공",
          });
        }
      });
    }
  };

  return (
    <>
      <HeaderComponent
        backVisible={true}
        pageName={"프로필 편집"}
        menuOpt2={"CHECK"}
        menuOpt2Func={async () => {
          if (isChanged) {
            await modifyMemberInfoFunc();
          }
          navigate("/main");
        }}
      />
      <div className="profiile-edit-page-conatiner">
        <div className="profile-photo-edit-container">
          <div
            className="user-img"
            style={{ backgroundImage: `url(${imgBase64.length ? imgBase64 : userInfo.profileURL})` }}
          ></div>
          <div className="profile-photo-edit-btn">
            <label htmlFor="photo-input">프로필 사진 수정</label>
            <input
              type="file"
              id="photo-input"
              accept="image/jpg, image/jpeg, image/png"
              ref={imgInputRef}
              style={{ display: "none" }}
              onChange={handleOnChange}
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
              value={nickname}
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
              value={introduction}
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
