import React, { useEffect, useState, useRef } from "react";
import styles from "./FillPage.module.css";
import kakaologo from "../../assets/LoginAsset/kakao-logo.png";
import naverlogo from "../../assets/LoginAsset/naver-logo.png";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import TextLogoComponent from "../../components/TextLogoComponent";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2"
import axios from 'axios';
import showPwImg from '../../assets/RegisterAsset/fi-br-eye-crossed.png'
import noshowPwImg from '../../assets/RegisterAsset/fi-br-eye.png'
import cancelImg from '../../assets/RegisterAsset/Cancel.png'
import TermModal from '../../components/TermModal/TermModal.js'

function FillPage() {
  const [inputValue, setInputValue] = useState({
    inputId: "",
    inputPw: "",
    inputCheckPw: "",
    inputNickname: "",
    inputCode: "",
  });

  const { inputId, inputPw, inputCheckPw, inputNickname, inputCode} = inputValue;

  // Input tag handling
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [emailMsg, setEmailMsg] = useState("");
  const [emailMsgColor, setEmailMsgColor] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const [pwMsgColor, setPwMsgColor] = useState(false);
  const [pwCheckMsgColor, setPwCheckMsgColor] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState(false);
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [nicknameMsgColor, setNicknameMsgColor] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [useCheckMsg, setUseCheckMsg] = useState("");
  const [openModal, setOpenModal] = useState(false); // 모달 띄울까?
  const [emailInputMsg, setEmailInputMsg] = useState('해당 이메일로 인증 메일을 보냈습니다.');
  const [isMailSend, setIsMailSend] = useState(false);
  const [canUseNickname, setCanUseNickname] = useState(false);
  const [verifyedId, setVerifyedId] = useState(false); // 이메일인증까지 마친 이메일인가?
  const [showPw, setShowPw] = useState(false); // 비밀번호 보이기 
  const [showPwCheck, setShowPwCheck] = useState(false) // 비밀번호 확인 보이기

  // 이메일 - 문자열에 특수문자, 영어, 숫자만 있는지 확인
  // 비밀번호 - 문자열에 특수문자, 영어, 숫자만 있는지 확인
  // 닉네임 - 문자열에 한글, 영어, 숫자만 있는지 확인

  const check_num = /[0-9]/; // 숫자
  const check_eng = /[a-zA-Z]/; // 문자
  const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
  const check_id = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 형식 확인 ___@__.
  const check_pw = /^[a-z|A-Z|0-9|~!@#$%^&*()_+|<>?:{}]+$/; // 숫자, 문자, 특수문자만 사용 가능
  const check_nickname = /^[가-힣|a-z|A-Z|0-9|]+$/; // 한글, 영어, 숫자만 사용 가능

  // 1. ID 유효성 검사
  const isValidId = check_id.test(inputId) && inputId.includes('@') && inputId.includes('.');

  // 1. PW 유효성 검사
  const isValidPwLength = inputPw.length >= 8 && inputPw.length <= 12;
  const isValidPwForm =
    check_pw.test(inputPw) && check_num.test(inputPw) && check_eng.test(inputPw) && check_spc.test(inputPw);

  // 1. 닉네임 유효성 검사
  const isValidNicknameLength = inputNickname.length >= 2 && inputNickname.length <= 10;
  const isValidNicknameForm = check_nickname.test(inputNickname);

  // 2. ID 유효성 검사 로직
  const checkId = () => {
    if (isValidId === false) {
      setEmailMsg("이메일 주소가 올바르지 않습니다.");
      setEmailMsgColor(false);
    }
    else {
      setEmailMsg("해당 이메일로 인증을 받습니다.");
      setEmailMsgColor(true);
    }
  };

  // 2. PW 유효성 검사 로직
  const checkPw = () => {
    if (isValidPwLength && isValidPwForm) {
      setPwMsg("사용 가능한 비밀번호입니다");
      setPwMsgColor(true);
    } else {
      setPwMsg("사용할 수 없는 비밀번호입니다");
      setPwMsgColor(false);
    }
  };

  // 2. 비밀번호확인 유효성 검사 로직
  const reCheckPw = () => {
    if (inputCheckPw !== inputPw) {
      setPwCheckMsg("비밀번호 확인 필요");
      setPwCheckMsgColor(false);
    } else {
      setPwCheckMsg("비밀번호 확인 완료");
      setPwCheckMsgColor(true);
    }
  };


  // 3. 다음 페이지로 이동할지 확인
  const onFocus = useRef([]);
  const navigate = useNavigate();
  const checkFill = () => {
    const axiosInfo = {
      "code": inputCode,
      "email": inputId,
      "nickname": inputNickname,
      "password": inputPw
    }
    if (!verifyedId) {
      onFocus.current[0].focus();
      Swal.fire({
        icon: 'warning',
        title: '사용할 아이디 입력 후 인증을 완료해주세요.',
      })
    } else if (!pwMsgColor) {
      onFocus.current[1].focus();
      Swal.fire({
        icon: 'warning',
        title: '사용 가능하지 않은 비밀번호입니다.',
      })
    } else if (!pwCheckMsgColor) {
      onFocus.current[2].focus();
      Swal.fire({
        icon: 'warning',
        title: '동일한 비밀번호를 입력해주세요.',
      })
    } else if (!nicknameMsgColor) {
      onFocus.current[3].focus();
      Swal.fire({
        icon: 'warning',
        title: '사용할 수 없는 닉네임입니다.',
      })
    } else if (!useCheck) {
      Swal.fire({
        icon: 'warning',
        title: '필수 약관을 동의해주세요.',
      })
    } else if (!canUseNickname) {
      onFocus.current[3].focus();
      Swal.fire({
        icon: 'warning',
        title: '이미 사용중인 닉네임입니다.',
      })
    } else if (verifyedId && pwMsgColor && pwCheckMsgColor && nicknameMsgColor && useCheck && canUseNickname) {
      axios.post('api/member/sign-up', axiosInfo, {withCredentials: false})
      .then ((res) => {
        navigate('/register/result', { state: res.data })
      })
      .catch((err) => {
        // console.log(err)
      })
    }
}

  // 카카오 로그인 버튼 클릭 이벤트
  const onClickKakaoLogin = () => {
    // console.log("카카오 로그인");
  };
  // 네이버 로그인 버튼 클릭 이벤트
  const onClickNaverLogin = () => {
    // console.log("네이버 로그인");
  };

  // 이용약관 버튼
  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  // 이용 약관 동의했는지 확인
  const useBtnCheck = () => {
    if (useCheck === false) {
      setUseCheckMsg("");
    } else setUseCheckMsg("필수 약관에 동의해주세요");
  };

  // 이용약관 모달 띄우기
  const requestModal = () => {
    if (openModal === false) {
      setOpenModal(true);
    }
  };

const xBtnAppear = () =>{
    const emailXBtn = document.getElementById('emailXBtn');
    const input = document.getElementById('xbtn');
    if(input.value){
      emailXBtn.src= cancelImg
    } else{
      emailXBtn.src= ""
    }
}

  // 아이디 지우기
  const cancelIdValue = () => {
    const emailXBtn = document.getElementById('emailXBtn');
    const input = document.getElementById('xbtn');
    emailXBtn.src = ""
    input.value=''
    inputValue.inputId = ""
  }

  // 비밀번호 보여줄지 확인
  const pwEyeIcon = () => {
    if (showPw) {
     setShowPw(false) 
    } else {
      setShowPw(true)
    }
  }

  //비밀번호 확인 보여줄지 확인
  const pwCheckEyeIcon = () => {
    if (showPwCheck) {
      setShowPwCheck(false)
    } else {
      setShowPwCheck(true)
    }
  }
  
  // 타이머
  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);
  function Timer() {
    useEffect(() => {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if(parseInt(minutes) === 0) {
            setIsMailSend(false)
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1)
            setSeconds(59)
          }
        }
      }, 1000)
      return () => clearInterval(countdown)
    }, [minutes, seconds])
    return (
      <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
    )
  }


  // API
  axios.defaults.baseURL = '********'                                                                                                                                                                                                                                                           

  // 아이디 중복 확인 API
  const isSameId = () => {
    if (isValidId) {
      axios.get('api/member/check/email?email=' + inputId, {withCredentials : false})
        .then((res) => {
          const { accessToken } = res.data;
          // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          // accessToken을 localStorage, cookie 등에 저장하지 않는다!
        })
        .catch((err) => {
          if(err.response.status === false){
            console.log('axios catch');
          }
          console.log("Error occurred : " + err);
        })
      } else {
      Swal.fire({
        icon: 'warning',
        title: '사용할 수 없는 이메일입니다.',
      })}
  }

  // 메일 전송 API
  const mailSend = () => {
      axios.get('api/email/sign-up?email=' + inputId, {withCredentials : false})
      .then((res) => {
        // console.log(res)
        Swal.fire({
          icon: 'success',
          title: '메일 발송되었습니다.',
        })
        setIsMailSend(true);
        setEmailMsg('');
      })
      .catch((err) => {
        console.log(err)        
        Swal.fire({
          icon: 'warning',
          title: '이미 가입된 이메일입니다.',
        })
      })
};

  // 메일 인증번호 확인 API
  const checkNumber = () => {
    const axiosInfo = {
      "code" : inputCode,
      "email" : inputId
    }
    if (isMailSend) {
      axios.post('api/email/sign-up', axiosInfo, {withCredentials: false})
      .then ((res) => {
        setVerifyedId(true)
        setEmailMsg('')
        setEmailInputMsg('인증이 완료되었습니다.')
      })
      .catch((err) => {
        console.log(err)
        console.log('여기에러')
      })
    }
  }

  // 닉네임 중복 확인 API
  const isSameNickname = () => {
    if (isValidNicknameLength === false || isValidNicknameForm === false) {
      setNicknameMsg("사용할 수 없는 닉네임입니다");
      setNicknameMsgColor(false);
    } else {
      axios.get('api/member/check/nickname?nickname=' + inputNickname, {withCredentials : false})
        .then((res) => {
          const { accessToken } = res.data;
          // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          // accessToken을 localStorage, cookie 등에 저장하지 않는다!
          // console.log("input Nickname: ", inputNickname)
          if (res.data === true) {
            setCanUseNickname(false)
            setNicknameMsgColor(false);
            setNicknameMsg("사용할 수 없는 닉네임입니다");
          } else {
            setCanUseNickname(true);
            setNicknameMsgColor(true); 
            setNicknameMsg('사용 가능한 닉네임입니다.');
          }
        })
        .catch((err) => {
          if(err.response.status === false){
            console.log('axios catch');
          }
          console.log("Error occurred : " + err);
        })
      }
  }
  return (
    <>
    {/* 모달 켜졌을 때 바깥 부분 어둡게 하는 설정 */}
    {openModal ? <div className={styles.modalbackground}></div> : null}
    <div className={styles.bigframe}>
      <HeaderComponent backVisible={true} pageName={"회원가입"} optType={""}></HeaderComponent>
      <TextLogoComponent></TextLogoComponent>
      <div className={styles.mainframe}>
        <div className={styles.mainframeitem}>
          <p>이메일(아이디)</p>
          <div className={styles.inputdivicon}>
            <input
              type="text"
              name="inputId"
              id='xbtn'
              placeholder="flos@example.com"
              onChange={(name, value) => {
                handleInput(name, value);
                xBtnAppear();
              }}
              onKeyUp={checkId}
              className={styles.inputdiv}
              disabled={verifyedId}
              ref={(el) => (onFocus.current[0] = el)}
            />
            {verifyedId ? null : <img id = "emailXBtn" alt='' onClick={cancelIdValue} className={styles.icon}></img>}
          </div>
          <p className={styles.spacebetween}>
          <span className={emailMsgColor ? styles.canuse : styles.cannotuse}>{emailMsg}</span>
          {/* 유효한 ID이면 메일 전송 버튼 출력 (조건부 렌더링) */}
          {emailMsgColor & !isMailSend ? (
              <button onClick={mailSend} onKeyUp={isSameId} className={styles.mailsendbtn}>인증번호 받기</button>
          ) : null}
          </p>
          {/* 메일을 보냈으면 입력 폼, 타이머 출력 (조건부 렌더링) */}
          {isMailSend ? (
            <div className={styles.mailsend}>
              <div>
                <input 
                  type="text" 
                  name="inputCode" 
                  onChange={handleInput} 
                  className={styles.mailnuminput} 
                  disabled={verifyedId}></input>
                <button className={styles.mailbtn} onClick={mailSend} disabled={verifyedId}>재전송</button>
                <button className={styles.mailbtn} onClick={checkNumber} disabled={verifyedId}>인증</button>
                <p className={styles.spacebetween}>
                  <span className={verifyedId ? styles.checkedcode : styles.checkingcode}>{emailInputMsg}</span>
                  {verifyedId ? null : <Timer />}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.mainframeitem}>
          <p>비밀번호</p>
          <div className={styles.inputdivicon}>
            <input
              type = {showPw ? "text" : "password"}
              name="inputPw"
              placeholder="영문, 숫자, 특수문자 8~12자"
              onChange={handleInput}
              onKeyUp={checkPw}
              className={styles.inputdiv}
              ref={(el) => (onFocus.current[1] = el)}
            />
            <img src={showPw ? showPwImg : noshowPwImg} alt='' onClick={pwEyeIcon} className={styles.icon}></img>
          </div>
          <span className={pwMsgColor ? styles.canuse : styles.cannotuse}>{pwMsg}</span>
        </div>
        <div className={styles.mainframeitem}>
          <p> 비밀번호 확인</p>
          <div className={styles.inputdivicon}>
          <input
            type = {showPwCheck ? "text" : "password"}
            name="inputCheckPw"
            placeholder="비밀번호 재입력"
            onChange={handleInput}
            onKeyUp={reCheckPw}
            className={styles.inputdiv}
            ref={(el) => (onFocus.current[2] = el)}
          />  
          <img src={showPwCheck ? showPwImg : noshowPwImg} alt='' onClick={pwCheckEyeIcon} className={styles.icon}></img>
        </div>
        <span className={pwCheckMsgColor ? styles.canuse : styles.cannotuse}>{pwCheckMsg}</span>
        </div>
        <div className={styles.mainframeitem}>
          <p>닉네임</p>
          <input
            type="text"
            name="inputNickname"
            placeholder="한글, 영문, 숫자 2~10자"
            onChange={handleInput}
            onKeyUp={isSameNickname}
            className={styles.inputdiv}
            ref={(el) => (onFocus.current[3] = el)}
          />
          <span className={nicknameMsgColor ? styles.canuse : styles.cannotuse}>{nicknameMsg}</span>
        </div>
        <div className={styles.mainframeitem}>
          <button onClick={checkFill} className={styles.nextBtn}>
            가입하기
          </button>
          <span className={styles.gologintext}>
            이미 계정이 있으신가요?
            <Link to="/login" className={styles.linktext}>
              로그인하러 가기
            </Link>
          </span>
        </div>
        <div>
          <input type="checkbox" id="check1" checked={useCheck} onChange={useBtnEvent} onClick={useBtnCheck} />
          <label className={styles.termfont} for="check1">
            개인정보 수집 및 이용 동의 (필수) <span className={styles.textredcolor}>* </span>
          </label>
          <span onClick={requestModal} className={styles.termfont}>
            [보기]
          </span>
          <p className={styles.textredcolor}>{useCheckMsg}</p>
          {openModal === true ? <TermModal setOpenModal={setOpenModal} /> : null}
        </div>
      </div>

      <div className={styles.loginframe}>
        <span className={styles.socialline}>소셜 로그인</span>
        <br></br>
        <div className={styles.socialbtn}>
          <button onClick={onClickKakaoLogin} className={styles.kakaobtn}>
            <img src={kakaologo} alt=""></img>
            <span>카카오톡 계정으로 로그인</span>
          </button>
        </div>
        <div className={styles.socialbtn}>
          <button onClick={onClickNaverLogin} className={styles.naverbtn}>
            <img src={naverlogo} alt=""></img>
            <span>네이버 계정으로 로그인</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default FillPage;
