import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { doLogin, getMemberInfo } from "../api/MemberAPI";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUser, setFollowingIdList } from "../redux/user";

/* import module */
import { getFollowingList } from "../api/FollowAPI";


import loginlogo from "../assets/GoormAsset/goorm-smile.png";
import kakaologo from "../assets/LoginAsset/kakao-logo.png";
import naverlogo from "../assets/LoginAsset/naver-logo.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [loginMsg, setLoginMsg] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // 로그인 버튼 클릭 이벤트
  const onClickLogin = () => {
    if (inputId.length === 0) {
      setLoginMsg('아이디를 입력해주세요.')
    } else if (inputPw.length === 0) {
      setLoginMsg('비밀번호를 입력해주세요.')
    }
    else {
    doLogin(inputId, inputPw)
      .then((response) => {
        if (response === false) {
          setLoginMsg('아이디 또는 비밀번호를 확인해주세요.')
        } else if (response === true) {
          getFollowingList().then((res) => {            
            let idList = []
            res.map((e) => { idList = [...idList, e.id] }); // 로그인시 사용자의 팔로워 리스트를 받아와서 문자열 배열로 저장
            dispatch(setFollowingIdList(idList));      
          })
          navigate("/main", { replace: true});
        }})
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: '일시적인 서버의 오류가 발생했습니다.',
        })
      });
    }


  };

  // 카카오 로그인 버튼 클릭 이벤트
  const onClickKakaoLogin = () => {
    console.log("카카오 로그인");
  };
  // 네이버 로그인 버튼 클릭 이벤트
  const onClickNaverLogin = () => {
    console.log("네이버 로그인");
  };
  const imgStyle = {
    width:"143px"
    
  }
  return (
    <div className={styles.bigframe}>
      <div className={styles.loginframe}>
        <img src={loginlogo} alt="no-image" className={styles.groomimg} style={imgStyle}></img>
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
              placeholder="flos@example.com"
              value={inputId}
              className={styles.inputdiv}
              onChange={handleInputId}
            />
          </div>
          <div className={styles.fullsize}>
            <input
              type="password"
              name="input_pw"
              value={inputPw}
              className={styles.inputdiv}
              onChange={handleInputPw}
            />
          </div>
          <div className={styles.loginmsg}>
            {loginMsg}
          </div>
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
            <a href="https://i8b210.p.ssafy.io/api/oauth2/authorization/kakao">
              {/* <button onClick={onClickKakaoLogin} className={styles.kakaobtn}> */}
              <button onClick={onClickKakaoLogin} className={styles.kakaobtn}>
                <img src={kakaologo} alt=""></img>
                <span>카카오톡 계정으로 로그인</span>
              </button>
            </a>
          </div>
          <div className={styles.socialbtn}>
            <a href="https://i8b210.p.ssafy.io/api/oauth2/authorization/naver">
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
