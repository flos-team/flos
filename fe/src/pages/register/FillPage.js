import React, { useState } from 'react'
import styles from "./FillPage.module.css";


function FillPage() {
  const [inputValue, setInputValue] = useState({
    inputId: '',
    inputPw: '',
    inputCheckPw: '', 
    inputNickname: '',
  })

  const { inputId, inputPw, inputCheckPw, inputNickname } = inputValue;

  // Input tag handling
  const handleInput = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  const [emailMsg, setEmailMsg] = useState(false)
  const [pwMsg, setPwMsg] = useState('')
  const [pwCheckMsg, setPwCheckMsg] = useState('')
  const [nicknameMsg, setNicknameMsg] = useState(false)

  const [emailCheck, setEmailCheck] = useState(false)
  const [nicknameCheck, setNicknameCheck] = useState(false)

  // 이메일 - 문자열에 특수문자, 영어, 숫자만 있는지 확인
  // 비밀번호 - 문자열에 특수문자, 영어, 숫자만 있는지 확인
  // 닉네임 - 문자열에 한글, 영어, 숫자만 있는지 확인

  const check_num = /[0-9]/; // 숫자 
  const check_eng = /[a-zA-Z]/; // 문자 
  const check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
  const check_pw = /^[a-z|A-Z|0-9|~!@#$%^&*()_+|<>?:{}]+$/ // 숫자, 문자, 특수문자만 사용 가능
  const check_nickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/ // 한글, 영어, 숫자만 사용 가능

  // 1. ID 유효성 검사
  const isValidId = inputId.includes('@') && inputId.includes('.')

  // 1. PW 유효성 검사
  const isValidPwLength = inputPw.length>=8 && inputPw.length<=12
  const isValidPwForm = check_pw.test(inputPw) && check_num.test(inputPw) && check_eng.test(inputPw) && check_spc.test(inputPw)

  // 1. 닉네임 유효성 검사
  const isValidNicknameLength = inputNickname.length>=2 && inputNickname.length<=10
  const isValidNicknameForm = check_nickname.test(inputNickname)


  // 2. ID 유효성 검사 로직
  const checkId = () => {
    if (isValidId === false){
      setEmailMsg('잘못된 유형의 이메일 주소입니다.')
    }
    else {
      setEmailMsg('사용 가능한 이메일입니다.')
    }
  }

  // 2. PW 유효성 검사 로직
  const checkPw = () => {
    if (isValidPwLength && isValidPwForm){
      setPwMsg('사용 가능한 비밀번호입니다')
    } else {
      setPwMsg('사용할 수 없는 비밀번호입니다')
    }
  }

  // 2. 비밀번호확인 유효성 검사 로직
  const reCheckPw = () => {
    if (inputCheckPw === inputPw) {
      setPwCheckMsg('비밀번호 확인 완료')
    }
  }

  // 2. 닉네임 유효성 검사 로직
  const checkNickname = () => {
    if (isValidNicknameLength && isValidNicknameForm){
      setNicknameMsg('사용 가능한 닉네임입니다')
    } else {
      setNicknameMsg('사용할 수 없는 닉네임입니다')
    }
  }


  // 3. 아이디 중복확인
  const checkEmailOverlap = () => {
    setEmailCheck(true)
  }

  // 3.닉네임 중복확인
  const checkNicknameOverlap = () => {
    setNicknameCheck(true)
  }


  return (
    <div className={styles.bigframe}>
      <div className={styles.registerorderdiv}>
        <div className={styles.registerorderelement}>
          <div className={styles.whiteCircle}>1</div>
          <span>약관동의</span>
        </div>
        <div className={styles.registerorderelement}>
          <div className={styles.blueCircle}>2</div>
          <span>정보입력</span>
        </div>
        <div className={styles.registerorderelement}>
          <div className={styles.whiteCircle}>3</div>
          <span>가입완료</span>
        </div>
      </div>

                    
      <div>
        <div>
          <p>이메일(아이디)</p>
          <input type='text' name='inputId' placeholder='flos@example.com'
            onChange={ handleInput } onKeyUp={ checkId } className={styles.inputdiv}/>
          <button onClick= { checkEmailOverlap }>중복확인</button>
          <p>{emailMsg}</p>
          <p className={ emailCheck ? styles.canuse : styles.cannotuse }>중복확인</p>
        </div>
        <div>
          <p>비밀번호</p> 
          <input type='password' name='inputPw' placeholder='영문, 숫자, 특수문자 8~12자'
          onChange={ handleInput } onKeyUp={ checkPw } className={styles.inputdiv} />
          <p>{pwMsg}</p>
        </div>
        <div>
          <p>비밀번호 확인</p>
          <input type='password' name='inputCheckPw' placeholder='비밀번호 재입력'
          onChange={ handleInput } onKeyUp={ reCheckPw } className={styles.inputdiv} />
          <p>{ pwCheckMsg }</p>
        </div>
        <div>
          <p>닉네임</p>
          <input type='text' name='inputNickname' placeholder='한글, 영문, 숫자 2~10자'
          onChange={ handleInput } onKeyUp={ checkNickname }className={styles.inputdiv} />
          <button onClick={ checkNicknameOverlap }>중복확인</button>
          <p>{ nicknameMsg }</p>
          <span className={ nicknameCheck ? styles.canuse : styles.cannotuse }>중복확인</span>
        </div>
      </div>
    </div>
  )
}

export default FillPage