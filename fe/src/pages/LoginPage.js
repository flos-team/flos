import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

import { doLogin, getMemberInfo } from "../api/MemberAPI";

import { useDispatch, useSelector } from "react-redux";
import { setUser, setFollowingIdList } from "../redux/user";

import Swal from "sweetalert2";
import loginlogo from "../assets/GoormAsset/goorm-smile.png";
import kakaologo from "../assets/LoginAsset/kakao-logo.png";
import naverlogo from "../assets/LoginAsset/naver-logo.png";
import { getFollowingList } from "../api/FollowAPI";
import { useEffect } from "react";
import cancelImg from "../assets/RegisterAsset/Cancel.png";
import showPwImg from "../assets/RegisterAsset/fi-br-eye-crossed.png";
import noshowPwImg from "../assets/RegisterAsset/fi-br-eye.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [loginMsg, setLoginMsg] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // 아이디 지우기
  const clearInputId = () => {
    setInputId("");
  };
  // pw type 변경
  const pwEyeIcon = () => {
    if (showPw) {
      setShowPw(false);
    } else {
      setShowPw(true);
    }
  };

  // 로그인 버튼 클릭 이벤트
  const onFocus = useRef([]);
  const onClickLogin = async () => {
    if (inputId.length === 0) {
      setLoginMsg("아이디를 입력해주세요.");
      onFocus.current[0].focus();
    } else if (inputPw.length === 0) {
      setLoginMsg("비밀번호를 입력해주세요.");
      onFocus.current[1].focus();
    } else {
      doLogin(inputId.toLowerCase(), inputPw)
        .then((response) => {
          if (response === false) {
            setLoginMsg("아이디 또는 비밀번호를 확인해주세요.");
          } else if (response === true) {
            getMemberInfo().then((res) => {
              console.dir(res);
              if (res.roleType === "ADMIN") {
                dispatch(setUser(res));
                navigate("/admin", { replace: true });
              } else {
                dispatch(setUser(res));
                getFollowingList(false).then((res) => {
                  // console.log("로그인후 응답받은 팔로잉 리스트 결과");
                  let useIdList = [];
                  if (res) {
                    res.map((e, i) => {
                      useIdList = [...useIdList, e.id];
                    });
                  }
                  // console.log(useIdList);
                  // console.dir(res);
                  dispatch(setFollowingIdList(useIdList));
                });
                setTimeout(() => {
                  navigate("/main", { replace: true });
                }, 300);
              }
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "일시적인 서버의 오류가 발생했습니다.",
          });
        });
    }
  };

  // 카카오 로그인 버튼 클릭 이벤트
  const onClickKakaoLogin = () => {
    // console.log("카카오 로그인");
  };
  // 네이버 로그인 버튼 클릭 이벤트
  const onClickNaverLogin = () => {
    // console.log("네이버 로그인");
  };
  const imgStyle = {
    width: "143px",
  };

  useEffect(() => {
    // console.log("====LOGIN PAGE useEffect 결과 ====");
    // console.dir(user);
  }, []);

  return (
    <div className={styles.bigframe}>
      <div className={styles.loginframe}>
        <img
          src={loginlogo}
          alt="no-image"
          className={styles.groomimg}
          style={imgStyle}
        ></img>
        <br></br>
        <h1>Flos</h1>
        <br></br>
        <br></br>
        <div className={styles.logindiv}>
          <h2 className={styles.emaillabel}>로그인 정보를 입력하세요.</h2>
          <div className={styles.fullsize}>
            <input
              type="text"
              name="inputId"
              id="xbtn"
              placeholder="flos@example.com"
              value={inputId}
              className={styles.inputdiv}
              onChange={handleInputId}
              ref={(el) => (onFocus.current[0] = el)}
            />
            {inputId.length >= 1 ? (
              <img
                alt=""
                onClick={clearInputId}
                className={styles.icon}
                src={cancelImg}
              ></img>
            ) : null}
          </div>
          <div className={styles.fullsize}>
            <input
              type={showPw ? "text" : "password"}
              name="input_pw"
              value={inputPw}
              className={styles.inputdiv}
              onChange={handleInputPw}
              onKeyDown={(e) => {
                if (e.key == "Enter" && inputId && inputPw) {
                  onClickLogin();
                }
              }}
              ref={(el) => (onFocus.current[1] = el)}
            />
            {inputPw.length >= 1 ? (
              <img
                src={showPw ? showPwImg : noshowPwImg}
                alt=""
                onClick={pwEyeIcon}
                className={styles.icon}
              ></img>
            ) : null}
          </div>
          <div className={styles.loginmsg}>{loginMsg}</div>
          <div className={styles.loginbtndiv}>
            <button
              type="button"
              className={styles.loginbtn}
              onClick={onClickLogin}
            >
              로그인
            </button>
          </div>
          <div className={styles.linkdiv}>
            <Link to="/register/fill" className={styles.linktext}>
              회원가입
            </Link>
            <Link to="/pwfind" className={styles.linktext}>
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <div className={styles.loginframe}>
          <span className={styles.socialline}>소셜 로그인</span>
          <br></br>
          <div className={styles.socialbtn}>
            <a href="********">
              {/* <button onClick={onClickKakaoLogin} className={styles.kakaobtn}> */}
              <button onClick={onClickKakaoLogin} className={styles.kakaobtn}>
                <img src={kakaologo} alt=""></img>
                <span>카카오톡 계정으로 로그인</span>
              </button>
            </a>
          </div>
          <div className={styles.socialbtn}>
            <a href="********">
              {/* <button onClick={onClickNaverLogin} className={styles.naverbtn}> */}
              <button onClick={onClickNaverLogin} className={styles.naverbtn}>
                <img src={naverlogo} alt=""></img>
                <span>네이버 계정으로 로그인</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
