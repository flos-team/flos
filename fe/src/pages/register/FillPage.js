import React, { useState } from 'react'
import styles from "./FillPage.module.css";


function FillPage() {
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [inputCheckPw, setInputCheckPw] = useState('')
  const [inputNickname, setInputNickname] = useState('')
  const [emailMsg, setEmailMsg] = useState('중복확인이 필요한 항목입니다.')
  const [pwMsg1, setPwMsg1] = useState('')
  const [pwMsg2, setPwMsg2] = useState('')
  const [nicknameMsg1, setNicknameMsg1] = useState(false)
  const [nicknameMsg2, setNicknameMsg2] = useState(false)

  // 이메일 - 문자열에 특수문자, 영어, 숫자만 있는지 확인
  // 비밀번호 - 문자열에 특수문자, 영어, 숫자만 있는지 확인
  // 닉네임 - 문자열에 한글, 영어, 숫자만 있는지 확인

  let check_num = /[0-9]/; // 숫자 
  let check_eng = /[a-zA-Z]/; // 문자 
  let check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
  let check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글

  // ⭐️⭐️⭐️ID 사용자 검증 로직⭐️⭐️⭐️
  const handleInputId = (e) => {
    setInputId(e.target.value)
  }

  // 중복확인 눌렀을 때 작동하는 함수
  const checkIdOverlap = (e) => {
    console.log(inputId)
    if (!inputId.includes('@') || !inputId.includes('.') || check_kor.test(inputId)){
      setEmailMsg('잘못된 유형의 이메일 주소입니다.')
    }
    // 이미 백엔드 데이터에 존재하는 이메일 주소일 때 => 이미 가입된 이메일입니다.
    // else if (이미 가입된 이메일이면) {
    //   setEmailMsg('이미 가입된 이메일입니다.')
    // }
    else {
      setEmailMsg('사용 가능한 이메일입니다.')
      setInputId(inputId)
    }
  }

  // ⭐️⭐️⭐️비밀번호 사용자 검증 로직⭐️⭐️⭐️
  const handleInputPw = (e) => {
    setInputPw(e.target.value)
    console.log(e.target.value)
    // 비밀번호 길이 검증 (8~12자))
    if (inputPw.length>=8 && inputPw.length<=12){
      setPwMsg1('길이통과')
    } else {
      setPwMsg1('길이오류')
    }
    // 비밀번호 양식 검증 (영문, 숫자, 특수문자 모두 포함)
    if (check_eng.test(inputPw) && check_num.test(inputPw) && check_spc.test(inputPw)) {
      setPwMsg2('다 포함함')
    } else {
      setPwMsg2('다 포함해야함')
    }
  }
  
  // 비밀번호 = 비밀번호 확인 검사
  const handleInputCheckPw = (e) => {
    setInputCheckPw(e.target.value)
    console.log(e.target.value)
    if (inputCheckPw === inputPw) {
      console.log('동일함')
    }
  }

  // ⭐️⭐️⭐️닉네임 사용자 검증 로직⭐️⭐️⭐️
  const handleNickname = (e) => {
    setInputNickname(e.target.value)
    if (inputNickname.length>=2 && inputNickname.length<=10) {
      setNicknameMsg1(true)
    } else {
      setNicknameMsg1(false)
    }
    if (check_kor.test(inputNickname) || check_num.test(inputNickname) || check_eng.test(inputNickname)) {
      setNicknameMsg2(true)
    } else {
      setNicknameMsg2(false)
    }
  }
  const handleInputNickname = (e) => {
    setInputNickname(e.target.value)
  }


  // const checkPwOverlap = () => {
  //   if (inputPw.length<8 || inputPw.length>12){
  //     setPwMsg1('길이오류')
  //   }
  //   else {
  //     setPwMsg1('길이통과')
  //   }
  // }

  // const checkNicknameOverlap = () => {
  //   console.log(inputNickname)
  // }
  


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
          <input type='text' name='input_id' placeholder='flos@example.com'
            value={ inputId } onChange={ handleInputId } className={styles.inputdiv}/>
          <button onClick={ checkIdOverlap }>중복확인</button>
          <p>{emailMsg}</p>
        </div>
        <div>
          <p>비밀번호</p> 
          <input type='password' name='input_pw' placeholder='영문, 숫자, 특수문자 8~12자'
          value={ inputPw } onChange={ handleInputPw } className={styles.inputdiv} />
          <p>{pwMsg1}</p>
          <p>{pwMsg2}</p>
        </div>
        <div>
          <p>비밀번호 확인</p>
          <input type='password' name='input_checkpw' placeholder='비밀번호 재입력'
          value={ inputCheckPw } onChange={ handleInputCheckPw } className={styles.inputdiv} />
        </div>
        <div>
          <p>닉네임</p>
          <input type='text' name='input_nickname' placeholder='한글, 영문, 숫자 2~10자'
          value={ inputNickname } onChange={ handleNickname } className={styles.inputdiv} />
          <p>{ nicknameMsg1 }</p>
          <p>{ nicknameMsg2 }</p>
          {/* <button onClick={ checkNicknameOverlap }>중복확인</button> */}
        </div>
      </div>
    </div>
  )
}

export default FillPage