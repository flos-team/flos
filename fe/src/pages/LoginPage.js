import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
        <>
            <img src={ loginlogo } alt="hi"></img>
            <h1>Flos</h1>
            <div>
                <label htmlFor = 'input_id'>이메일을 입력해주세요</label>
                <br></br>
                <input type = 'text' name = 'input_id' placeholder = 'flos@example.com' value={ inputId } onChange = { handleInputId } />
            </div>
            <div>
                <label htmlFor = 'input_pw'></label>
                <input type = 'password' name = 'input_pw' value={ inputPw } onChange = { handleInputPw } />
            </div>
            <div>
                <button type='button' onClick = { onClickLogin }>로그인</button>
            </div>
            <Link to="/register">회원가입</Link>
            <Link to="/pwfind">비밀번호 찾기</Link>

            <div>
                <h3>소셜 로그인</h3>
                <div>
                    <button onClick = { onClickKakaoLogin }>
                    <img src={ kakaologo } alt=''></img>카카오톡 계정으로 로그인</button>
                </div>
                <div>
                    <button onClick = { onClickNaverLogin }>
                    <img src={ naverlogo } alt=''></img>네이버 계정으로 로그인</button>
                </div>
            </div>
        </>
    );
}

export default Login;