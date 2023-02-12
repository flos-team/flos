/* import react */
import { useDispatch } from "react-redux";
import { setUser, setFollowingIdList } from "../../../../redux/user";
import { home } from "../../../../redux/page";

import { useNavigate } from "react-router-dom";

/* import component */
import ToggleBtn from "../../../../components/ToggleBtn/ToggleBtn";
import Swal from "sweetalert2";

/* import module */
import { withdrawalUser, logout } from "../../../../api/MemberAPI";

import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
/* css */
import "./SettingPage.css";

const AlarmPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alarmOptItems = [
    { optId: 0, optName: "알림 설정" },
    { optId: 1, optName: "새글 알림" },
    { optId: 2, optName: "이메일 알림" },
    { optId: 3, optName: "댓글 알림" },
    { optId: 4, optName: "마을 날씨 알림" },
    { optId: 5, optName: "나의 정원 알림" },
  ];

  const themeOptItems = [
    { optId: 0, optName: "테마 설정" },
    { optId: 1, optName: "시스템 설정에 맞춤" },
    { optId: 2, optName: "다크 모드" },
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
  return (
    <div className="alarm-page">
      <HeaderComponent backVisible={true} pageName={"설정"}></HeaderComponent>
      <div className="alarm-main">{alarmOptList}</div>
      <div className="alarm-main">{themeOptList}</div>
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
