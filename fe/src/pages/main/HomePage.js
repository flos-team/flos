import React, { useEffect } from "react";
import Flower from "../../components/homepage/flower/Flower";
import Info from "../../components/homepage/Info";
import Noti from "../../components/homepage/Noti";
import { ReactComponent as EditIcon } from "../../assets/HomeAsset/edit.svg"
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/react'
import GrowProgressBar from "../../components/homepage/GrowProgressBar"

let flower_state = true;

const floating = keyframes`
    0 {
        transform: translateY(0);    
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0);
    }
`

const boxStyle = css`
    width: 50px; 
    height: 50px; 
    border-radius: 100%;
    background: #a951bf;
    animation: ${floating} 2s ease infinite;
`



const Home = () => {
    useEffect(() => {
        if (flower_state === true) {
            flower_state = false;
            setTimeout(() => { console.log("나와"); flower_state = true }, 2000);
        }
        console.log('컴포넌트가 화면에 나타남')
        // 여기에서 꽃 상태 받아옴 (normal / fullfilled)

        // 각 상태에 맞는 동작

        // return () => {
        //     console.log('컴포넌트가 화면에서 사라짐');
        // };
    }, []);

    const sunClick = () => {    // 해 버튼을 클릭 했을 경우,
        console.log("clicked - sun");

    };

    const rainClick = () => {   // 비 버튼을 클릭 했을 경우,
        console.log("clicked - rain");

    };

    const guideClick = () => {   // info 버튼을 클릭 했을 경우,
        // 도움말 페이지로 라우팅
        console.log("clicked - info");
    }

    const notiClick = () => {   // noti 버튼을 클릭 했을 경우,
        // 알림 페이지로 라우팅
        console.log("clicked - noti");

    }

    const flowerNameClick = () => {
        console.log("clicked - name")
    }

    const rainCount = 1;    // 빗물 count 값
    const sunCount = 1; // 햇빛 count 값
    const FlowerMessage = "안녕! 나는 튤립이야! 리리리리라아아런머어ㅏㄶ암ㅇ러ㅏㅁㅇㄴㅁㅇ허히ㅏㄶㅁㅇㄶㅇㅁㄴㅇㅎ";
    const FlowerName = "사랑이";
    const growPercentValue = 0; // percent value
    const growProgressBackgroundColor = "black";    // 프로그래스바 색상 string


    return (
        <div className={styles.HomePage}>
            <div className={styles.HomeRoot}>
                <div className={styles.HomeHeader}>
                    <Link to="/guide">
                        <Info onClick={guideClick} />
                    </Link>
                    <Link to="/notification">
                        <Noti onClick={notiClick} />
                    </Link>
                </div>
                <div className={styles.FlowerMessage}>
                    <div className={styles.FlowerMessageText}>{FlowerMessage}</div>
                </div>
                <div className={styles.FlowerInfo}>
                    <div className={styles.FlowerName} onClick={flowerNameClick}>
                        <span className={styles.FlowerNameText}>{FlowerName}</span>
                        <EditIcon />
                    </div>
                    <GrowProgressBar growPercent={growPercentValue}></GrowProgressBar>
                </div>
                <div className={styles.FlowerItem}>
                    <div className={styles.RainDiv} onClick={rainClick}>
                        <span className={styles.SunRainText}>{rainCount}</span>
                        <img className={styles.SunRainImg} src={require('../../assets/HomeAsset/rain-img.png')} />
                    </div>
                    <div className={styles.SunDiv} onClick={sunClick}>
                        <span className={styles.SunRainText}>{sunCount}</span>
                        <img className={styles.SunRainImg} src={require('../../assets/HomeAsset/sun-img.png')} />
                    </div>
                </div>
                <div className={styles.Flowerpot}>
                    <Flower></Flower>
                </div>
            </div>
        </div>
    );
}

export default Home;