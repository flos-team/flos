import React, { useState, useEffect } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import TextLogoComponent from "../../components/TextLogoComponent";
import styles from './FindPage.module.css'
import axios from 'axios'
import showPwImg from '../../assets/RegisterAsset/fi-br-eye-crossed.png'
import noshowPwImg from '../../assets/RegisterAsset/fi-br-eye.png'
import Swal from "sweetalert2"


function FindPage() {

    const [inputValue, setInputValue] = useState({
        inputId: "",
        inputCode: "",
        inputPw: "",
        inputCheckPw: "",
      });
    const { inputId, inputCode, inputPw, inputCheckPw} = inputValue;

    // Input tag handling
    const handleInput = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    };

    const [isResetPw, setIsResetPw] = useState(false) // 인증 완료 상태 (비밀번호 변경중)
    const [showPw, setShowPw] = useState(false); // 비밀번호 보이기 
    const [showPwCheck, setShowPwCheck] = useState(false) // 비밀번호 확인 보이기
    const [pwMsg, setPwMsg] = useState('')
    const [pwCheckMsg, setPwCheckMsg] = useState('')

    const [isMailSend, setIsMailSend] = useState(false)

    const sendEmail = () => {
        axios.get('/email/reset-password?email=' + inputId, {withCredentials : false})
            .then((res) => {
                // console.log(res)        
                Swal.fire({
                  icon: 'success',
                  title: '메일 발송되었습니다.',
                })
                setIsMailSend(true);
            })
            .catch((err) => {
                // console.log(err)
                Swal.fire({
                  icon: 'warning',
                  title: '가입되지 않은 이메일입니다.',
                })
            })
        };
    const checkCode = () => {
        const axiosInfo = {
            code: inputCode,
            email: inputId
        }
        axios.post('/email/reset-password', axiosInfo, {withCredentials : false})
            .then((res) => {
                // console.log(res)
                Swal.fire({
                  icon: 'success',
                  title: '인증이 완료되었습니다.',
                  content: '사용할 비밀번호를 입력해주세요.'
                })
                setIsResetPw(true);
            })
            .catch((err) => {
                // console.log(err)
                Swal.fire({
                  icon: 'warning',
                  title: '인증에 실패했습니다.'
                })
            })
        };

// 1. PW 유효성 검사
  const check_pw = /^[a-z|A-Z|0-9|~!@#$%^&*()_+|<>?:{}]+$/; // 숫자, 문자, 특수문자만 사용 가능
  const check_num = /[0-9]/; // 숫자
  const check_eng = /[a-zA-Z]/; // 문자 
  const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
  

  const isValidPwLength = inputPw.length >= 8 && inputPw.length <= 12;
  const isValidPwForm = check_pw.test(inputPw) && check_num.test(inputPw) && check_eng.test(inputPw) && check_spc.test(inputPw);

  const checkPw = () => {
    if (isValidPwLength && isValidPwForm) {
      setPwMsg("사용 가능한 비밀번호입니다");
    } else {
      setPwMsg("사용할 수 없는 비밀번호입니다");
    }
  };

  // 2. 비밀번호확인 유효성 검사 로직
  const reCheckPw = () => {
    if (isValidPwLength && isValidPwForm && inputCheckPw === inputPw) {
      setPwCheckMsg("비밀번호 확인 완료");
    } else {
      setPwCheckMsg("비밀번호 확인 필요");
    }
  };
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

  // 비밀번호 재설정
  const resetPw = () => {
    const axiosInfo = {
        code: inputCode,
        email: inputId,
        password: inputPw
    }
    axios.put('/member/reset-password', axiosInfo)
    .then((res) => {
        // console.log(res)
        Swal.fire({
          icon: 'success',
          title: '비밀번호 재설정 완료',
        })
    })
    .catch((err) => {
        // console.log(err)
        Swal.fire({
          icon: 'warning',
          title: '인증에 실패하였습니다.',
        })
    })
};
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
            // console.log('end')
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

    return (
        <>
            <HeaderComponent backVisible={1} pageName={'비밀번호 찾기'}></HeaderComponent>
            <TextLogoComponent></TextLogoComponent>
            <div className={styles.mainframe}>
                <span>이메일 인증을 통한 비밀번호 찾기(재설정)</span>
                <div className={styles.findbox}>
                    <span className={styles.boxtext1}>※ flos 서비스에 회원가입시 등록된 아이디를 입력합니다.</span>
                    <span className={styles.boxtext2}>귀하의 계정과 연결된 이메일 주소로 비밀번호 재설정 방법에 관한 안내문을 전송해 드립니다.</span>

                    <div className={styles.inputbox}>
                        <span className={styles.boxtext3}>비밀번호를 찾으려는 아이디</span>
                        <div className={styles.inputbtnbox}>
                            <input type="text" name="inputId" className={styles.mailnuminput} disabled={isMailSend} onChange={handleInput}></input>
                            <button onClick={sendEmail} className={styles.mailsendbtn} disabled={isMailSend}>메일 전송</button>
                        </div>

                    {isMailSend ?
                        <div className={styles.mailsend}>
                            <input type="text" name="inputCode" className={styles.mailnuminput} onChange={handleInput} disabled={isResetPw}></input>
                            <button className={styles.mailsenddoublebtn} onClick={checkCode} disabled={isResetPw}>인증</button>
                            <button className={styles.mailsenddoublebtn} onClick={sendEmail} disabled={isResetPw}>재전송</button>
                            <span className={styles.mailsendtext}>해당 이메일로 인증 메일을 보냈습니다.</span>
                            <Timer />
                        </div>
                        : null}
                        {isResetPw ?
                          <div className={styles.mainframeitem}>
                            <p>비밀번호 재설정</p>
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
                            <p className={isValidPwLength && isValidPwForm && inputCheckPw === inputPw ? styles.green : styles.red}>{pwCheckMsg}</p>
                            <button onClick={resetPw}>비밀번호 재설정</button>
                        </div> : null}
                    </div>
                </div>
            </div>
        </>
  )
}

export default FindPage