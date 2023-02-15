/* import react */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUser, setFollowingIdList } from "../../../../redux/user";
import { home } from "../../../../redux/page";

import { useNavigate } from "react-router-dom";

/* import component */
import ToggleBtn from "../../../../components/ToggleBtn/ToggleBtn";
import Swal from "sweetalert2";

/* import module */
import { withdrawalUser, logout } from "../../../../api/MemberAPI";
import { ComplaintReceived } from "../../../../api/EmailAPI";

import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
/* css */
import "./SettingPage.css";

const AlarmPage = () => {
  const user = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState("");

  const alarmOptItems = [
    { optId: 0, optName: "알림 설정" },
    // { optId: 1, optName: "새글 알림" },
    // { optId: 2, optName: "이메일 알림" },
    // { optId: 3, optName: "댓글 알림" },
    // { optId: 4, optName: "마을 날씨 알림" },
    // { optId: 5, optName: "나의 정원 알림" },
  ];

  const themeOptItems = [
    { optId: 0, optName: "테마 설정" },
    // { optId: 1, optName: "시스템 설정에 맞춤" },
    // { optId: 2, optName: "다크 모드" },
  ];

  // 알림 설정 리스트
  const alarmOptList = alarmOptItems.map(({ optId, optName }) => {
    let modifiedClassName = `alarm-ops-item ${optId === 0 ? "title" : ""}`;
    let optDiv = (
      <div key={optId} className={modifiedClassName}>
        <div>
          <p>{optName}</p>
        </div>
        {optId !== 0 ? <ToggleBtn></ToggleBtn> : <></>}
      </div>
    );
    return optDiv;
  });

  // 테마 설정 리스트
  const themeOptList = themeOptItems.map(({ optId, optName }) => {
    let modifiedClassName = `alarm-ops-item ${optId === 0 ? "title" : ""}`;
    let optDiv = (
      <div key={optId} className={modifiedClassName}>
        <div>
          <p>{optName}</p>
        </div>
        {optId !== 0 ? <ToggleBtn></ToggleBtn> : <></>}
      </div>
    );
    return optDiv;
  });

  const confirmWithdrawalUser = () => {
    Swal.fire({
      title: "정말 FLOS를 떠나시겠어요?",
      text: "언제든 당신을 기다릴게요",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        withdrawalUser();
      }
    });
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "정말 로그아웃하시겠어요?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "로그아웃 되었습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
        // setTimeout(() => {
        logout()
          .then((res) => {
            dispatch(setUser({}));
            dispatch(setFollowingIdList([]));
            dispatch(home());
          })
          .then(() => {
            navigate("/login");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "오류 발생",
              text: "로그아웃 중 오류가 발생하였습니다.",
              footer: "잠시 후 다시 시도해주세요",
            });
          });
        // }, 1000);
      }
    });
  };
  // dispatch(setUser({}));
  // dispatch(setFollowingIdList([]));

  const handleComplaint = (e) => {
    setComplaint(e.target.value);
    // console.log(complaint);
  };

  const onSubmit = async () => {
    ComplaintReceived(complaint, user.email).then((response) => {
      // console.log(response);
    });
  };

  const clickDelete = () => {
    Swal.fire({
      title: "불편 사항을 등록하시겠습니까?",
      // text: "삭제된 게시물은 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "등록",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        ComplaintReceived(complaint, user.email).then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "불편사항이 등록되었습니다.",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      }
    });
  };

  return (
    <div className="alarm-page">
      <HeaderComponent backVisible={true} pageName={"설정"}></HeaderComponent>
      <div className="alarm-main">{alarmOptList}</div>
      <div className="alarm-main">{themeOptList}</div>
      <div className="alarm-main">
        <div className="complaint-container">
          <p className="complaint-title">불편사항 접수</p>
          <p className="complaint-guide-text">
            고객의 말씀에 귀 기울이며 품질과 서비스 향상을 위해 <br />
            노력하는 <b>FLOS</b>가 되겠습니다. <br /> 남겨주신 의견은 본사에서
            관리 및 서비스 개선용도로 활용합니다. <br />
            고객님께서 입력하신 내용은 비밀이 보장됩니다.
            <br />
            이용에 대한 불편 및 불만사항을 접수하실 경우 최대한 신속하게
            고객님의 입장에서 해결하도록 노력하겠습니다.
          </p>
          {/* 유저 정보와 입력된 정보를 폼에 담아 이메일로 전송한다. */}
          <form className="input-complaint">
            <textarea
              className="input-complaint-input"
              type="text"
              placeholder="귀하의 소중한 의견이 서비스 개선에 큰 도움이 됩니다. &#13;&#10;서비스 개선에 도움을 주셔서 감사합니다."
              value={complaint}
              onChange={handleComplaint}
            ></textarea>
          </form>
          <button
            type="button"
            onClick={clickDelete}
            className="input-complaint-btn"
          >
            제출
          </button>
        </div>
      </div>
      <div className="logout-container">
        <div onClick={confirmWithdrawalUser}>회원 탈퇴</div>
        <div className="logout-btn" onClick={confirmLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default AlarmPage;
