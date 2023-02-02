import React, { useEffect, useState } from "react";
import styles from "./FillPage.module.css";
import kakaologo from "../../assets/LoginAsset/kakao-logo.png";
import naverlogo from "../../assets/LoginAsset/naver-logo.png";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import TextLogoComponent from "../../components/TextLogoComponent";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import closeIcon from '../../assets/RegisterAsset/fi-br-cross-small.png'
import showPwImg from '../../assets/RegisterAsset/fi-br-eye-crossed.png'
import noshowPwImg from '../../assets/RegisterAsset/fi-br-eye.png'
import cancelImg from '../../assets/RegisterAsset/Cancel.png'

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
  const [canUseId, setCanUseId] = useState(false);
  const [canUseNickname, setCanUseNickname] = useState(false);
  const [verifyedId, setVerifyedId] = useState(false); // 이메일인증까지 마친 이메일인가?
  const [cancelId, setCancelId] = useState(false); // 아이디 입력값 지우기
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
    // else if (DB에 있으면) {
    // setEmailMsg('이미 사용 중인 이메일입니다.')
    // setEmailMsgColor(false)
    // }
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

  // 2. 닉네임 유효성 검사 로직
  // const checkNickname = () => {
  //   if (isValidNicknameLength === false || isValidNicknameForm === false) {
  //     setNicknameMsg("사용할 수 없는 닉네임입니다");
  //     setNicknameMsgColor(false);
  //   }
  //   else if (DB에 같은 닉네임이 존재하면){
  //   setNicknameMsg('이미 사용중인 닉네임입니다.')
  //   setNicknameMsgColor(false)
  //   else {
  //     setNicknameMsg("사용 가능한 닉네임입니다");
  //     setNicknameMsgColor(true);
  //   }
  // };

  // 3. 다음 페이지로 이동할지 확인
  const navigate = useNavigate();
  const checkFill = () => {
    const axiosInfo = {
      "code": inputCode,
      "email": inputId,
      "nickname": inputNickname,
      "password": inputPw
    }
    if (!verifyedId) {
      alert('아이디 확인')
    } else if (!pwMsgColor) {
      alert('비밀번호 확인')
    } else if (!pwCheckMsgColor) {
      alert('비밀번호 확인 확인')
    } else if (!nicknameMsgColor) {
      alert('닉네임 유효 확인?')
    } else if (!useCheck) {
      alert('약관동의 확인')
    } else if (!canUseNickname) {
      alert('닉네임 중복 확인?')
    } else if (verifyedId && pwMsgColor && pwCheckMsgColor && nicknameMsgColor && useCheck && canUseNickname) {
      axios.post('/member/sign-up', axiosInfo, {withCredentials: false})
      .then ((res) => {
        console.log(res)
        alert('회원가입 성공')
        navigate('/main', { state: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
    }
}

  // 카카오 로그인 버튼 클릭 이벤트
  const onClickKakaoLogin = () => {
    console.log("카카오 로그인");
  };
  // 네이버 로그인 버튼 클릭 이벤트
  const onClickNaverLogin = () => {
    console.log("네이버 로그인");
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
    } else if (openModal === true) {
      setOpenModal(false);
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
      // inputId('')
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


  // 모달
  function Modal() {
    return (
      <div className={styles.modal}>
        <div className={styles.modalheader}>
          <h3>Flos 이용약관 동의</h3>
          <img src={closeIcon} alt='' onClick={requestModal} className={styles.cursorpointer}></img>
        </div>
        <div className={styles.modalbodyterm}>
          <p>Flos에 회원가입하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.</p>
          <br></br>
          <h6># 1. 수집하는 개인정보</h6>
          <p></p>이용자가 서비스를 이용하기 위해 회원가입을 할 경우, Flos는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
          <br></br>
          <br></br>
          <p>회원가입 시점에 Flos가 이용자로부터 수집하는 개인정보는 아래와 같습니다.</p>
          <p>- 회원 가입 시 필수항목으로 이메일(아이디), 비밀번호, 닉네임을 수집합니다.</p>
          <br></br>
          <p>서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.</p>
          <p>- 회원정보 또는 개별 서비스에서 프로필 정보(프로필 사진)를 설정할 수 있습니다.</p>
          <br></br>
          <h6># 2. 수집한 개인정보의 이용</h6>
          <p>Flos의 회원관리, 서비스 개발·제공 및 향상 등 아래의 목적으로만 개인정보를 이용합니다.</p>
          <p>- 회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.</p>
          <p>- 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.</p>
          <br></br>
          <br></br>
          <h6># 3. 개인정보 수집 및 이용 동의를 거부할 권리</h6>
          <p>- 이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다.</p>
          <p>- 회원가입 시 수집하는 최소한의 개인정보 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.</p>
      </div>
      <div className={styles.modalfooter}>
        <span className={styles.modalfootertext} onClick={requestModal}>확인</span>
      </div>
      </div>
    );
  }
  
  // 타이머
  function Timer() {
    const [minutes, setMinutes] = useState(4);
    const [seconds, setSeconds] = useState(59);
    useEffect(() => {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if(parseInt(minutes) === 0) {
            console.log('end')
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
  axios.defaults.baseURL = 'http://i8b210.p.ssafy.io:8080'                                                                                                                                                                                                                                                           

  // 아이디 중복 확인 API
  const isSameId = () => {
    if (isValidId) {
      axios.get('/member/check/email?email=' + inputId, {withCredentials : false})
        .then((res) => {
          const { accessToken } = res.data;
          // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          // accessToken을 localStorage, cookie 등에 저장하지 않는다!
          console.log("input id: ", inputId)
          console.log(res)
          setCanUseId(true)
        })
        .catch((err) => {
          if(err.response.status === false){
            console.log('axios catch');
          }
          console.log("Error occurred : " + err);
        })
      } else {alert('아이디 유효성 확인ㄱㄱ')}
  }

  // 메일 전송 API
  const mailSend = () => {
    // if (canUseId) {
      axios.get('/email/sign-up?email=' + inputId, {withCredentials : false})
      .then((res) => {
        console.log(res)
        alert('메일 발송되었습니다.')
        setIsMailSend(true);
        setEmailMsg('');
      })
      .catch((err) => {
        console.log(err)
        alert('중복이메일 / 서버쪽 문제로 메일 발송 실패')
      })
  // } else console.log('cannotuseid')
};

  // 메일 재전송 API -> 전송이랑 똑같아서 안 해도 될듯?
  // const mailReSend = () => {
  //   if (canUseId) {
  //     axios.get('/email/sign-up?email=' + inputId, {withCredentials : false})
  //     .then((res) => {
  //       console.log(res)
  //       alert('메일 발송되었습니다.')
  //       setIsMailSend(true);
  //       setEmailMsg('');
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       alert('중복이메일 / 서버쪽 문제로 메일 발송 실패')
  //     })
  //   }
  // }

  // 메일 인증번호 확인 API
  const checkNumber = () => {
    const axiosInfo = {
      "code" : inputCode,
      "email" : inputId
    }
    if (isMailSend) {
      axios.post('/email/sign-up', axiosInfo, {withCredentials: false})
      .then ((res) => {
        console.log(res)
        console.log('성공')
        setVerifyedId(true)
        setEmailMsg('')
        setEmailInputMsg('인증이 완료되었습니다.')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  // 닉네임 중복 확인 API
  const isSameNickname = () => {
    if (isValidNicknameLength === false || isValidNicknameForm === false) {
      setNicknameMsg("사용할 수 없는 닉네임입니다");
      setNicknameMsgColor(false);
    } else {
      axios.get('/member/check/nickname?nickname=' + inputNickname, {withCredentials : false})
        .then((res) => {
          const { accessToken } = res.data;
          // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          // accessToken을 localStorage, cookie 등에 저장하지 않는다!
          console.log("input Nickname: ", inputNickname)
          console.log(res.data)
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
            />
            <img id = "emailXBtn" alt='' onClick={cancelIdValue} className={styles.icon}></img>
          </div>
          <span className={emailMsgColor ? styles.canuse : styles.cannotuse}>{emailMsg}</span>
          {/* 유효한 ID이면 메일 전송 버튼 출력 (조건부 렌더링) */}
          {emailMsgColor & !isMailSend ? (
            <div>
              <button onClick={mailSend} onKeyUp={isSameId}>메일로 인증번호 받기</button>
            </div>
          ) : null}
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
                <button className={styles.mailsendbtn} onClick={mailSend} disabled={verifyedId}>재전송</button>
                <button className={styles.mailsendbtn} onClick={checkNumber} disabled={verifyedId}>인증</button>
                <span className={verifyedId ? styles.checkedcode : styles.checkingcode}>{emailInputMsg}</span>
                <Timer></Timer>
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
          {openModal === true ? <Modal /> : null}
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
