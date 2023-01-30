import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'

// import axios from 'axios'

import loginlogo from "../assets/LoginAsset/groom-icon.png"
import kakaologo from "../assets/LoginAsset/kakao-logo.png"
import naverlogo from "../assets/LoginAsset/naver-logo.png"


function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    // 로그인 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }
    
    // 카카오 로그인 버튼 클릭 이벤트
    const onClickKakaoLogin = () => {
        console.log('카카오 로그인')
    }
    // 네이버 로그인 버튼 클릭 이벤트
    const onClickNaverLogin = () => {
        console.log('네이버 로그인')
    }

    // // 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios.get('')
    //     .then(res => console.log(res))
    //     .catch()
    // },
    // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    // [])

    return (
        <div className={styles.bigframe}>
            <div className={styles.loginframe}>
                <img src={ loginlogo } alt="hi" className={styles.groomimg}></img>
                <h1>Flos</h1>
                <div className={styles.logindiv}>
                    <h2 className={styles.emaillabel}>이메일을 입력해주세요</h2>
                    <div className={styles.fullsize}>
                        <input type='text' name='input_id' placeholder='flos@example.com'
                        value={ inputId } className={styles.inputdiv} onChange={ handleInputId } />
                    </div>
                    <div className={styles.fullsize}>
                        <input type='password' name='input_pw'
                        value={ inputPw } className={styles.inputdiv} onChange={ handleInputPw } />
                    </div>
                    <div className={styles.loginbtndiv}>
                        <button type='button' className={styles.loginbtn} onClick={ onClickLogin }>로그인</button>
                    </div>
                    <div className={ styles.linkdiv }>
                        <Link to="/register/fill" className={styles.linktext}>회원가입</Link>
                        <Link to="/pwfind" className={styles.linktext}>비밀번호 찾기</Link>
                        <Link to="/main" className={styles.linktext}>홈으로</Link>
                    </div>
                </div>

                <div className={styles.loginframe}>
                    <span className={styles.socialline}>소셜 로그인</span>
                    <br></br>
                    <div className={styles.socialbtn}>
                        <button onClick={ onClickKakaoLogin } className={styles.kakaobtn}>
                        <img src={ kakaologo } alt=''></img><span>카카오톡 계정으로 로그인</span></button>
                    </div>
                    <div className={styles.socialbtn}>
                        <button onClick={ onClickNaverLogin } className={styles.naverbtn}>
                        <img src={ naverlogo } alt=''></img><span>네이버 계정으로 로그인</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;