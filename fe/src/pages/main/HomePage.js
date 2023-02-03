import React, { useState, useEffect, useRef } from "react";
import Flower from "../../components/homepage/flower/Flower";
import Info from "../../components/homepage/Info";
import Noti from "../../components/homepage/Noti";
import { ReactComponent as EditIcon } from "../../assets/HomeAsset/edit.svg"
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css, keyframes } from '@emotion/react'
import GrowProgressBar from "../../components/homepage/GrowProgressBar"
import { gsap } from "gsap";
import rainObjectData from "../../assets/HomeAsset/53484-digital-clouds-rain.json"
import rainAnimationData from "../../assets/HomeAsset/81756-rain.json"
import sunObjectData from "../../assets/HomeAsset/22190-sunny-day.json"
import Lottie from 'react-lottie';

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
`;


const Title = styled.h1`
  color: #007bff;
  font-size: 32px;
  ${props =>
        `transform: translateY(${props.translateY}px); 
   opacity: ${props.opacity};
  `}
`;

const WeatherAnimation = styled.div`
    position: relative;
    width: 100%;
    hegiht: 100%;
`;

const Home = () => {

    useEffect(() => {
        if (flower_state === true) {    // 여기에서 꽃 상태 받아옴 (normal / fullfilled)
            flower_state = false;
            setTimeout(() => { console.log("나와"); flower_state = true }, 2000);
        }
        console.log('컴포넌트가 화면에 나타남')

        // 각 상태에 맞는 동작

        // return () => {
        //     console.log('컴포넌트가 화면에서 사라짐');
        // };
    }, []);

    const sunClick = () => {    // 해 버튼을 클릭 했을 경우,
        console.log("clicked - sun");
        setElementImg(require('../../assets/HomeAsset/sun-img.png'));
        setElementStatus("sun");
        const sunObjectOptions = {
            autoplay: true,
            animationData: sunObjectData,
        }
        setSunAnimation(<>
            <div ref={sunBox}>
                <Lottie options={sunObjectOptions} height={1000} width={1000} />
            </div>
            <div className={styles.SunShine} ref={sunshine}></div>
            </>);
    };

    const rainClick = () => {   // 비 버튼을 클릭 했을 경우,
        console.log("clicked - rain");
        setElementImg(require('../../assets/HomeAsset/rain-img.png'));
        setElementStatus("rain");
        const rainAnimationOptions = {
            // loop: true,
            autoplay: true,
            animationData: rainAnimationData,
        }

        const rainObjectOptions = {
            autoplay: true,
            animationData: rainObjectData,
        }
        setRainAnimation(
        <WeatherAnimation>
            <div ref={rainBox} className={styles.raindrop}>
                <Lottie options={rainObjectOptions} height={600} width={600} />
            </div>
            {/* <Lottie ref={rain} options={rainAnimationOptions} height={400} width={400} /> */}
            
        </WeatherAnimation>);
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

    const rainCount = 999;    // 빗물 count 값
    const sunCount = 999; // 햇빛 count 값
    const FlowerMessage = "안녕! 나는 튤립이야!";
    const FlowerName = "사랑이";
    const growPercentValue = 0; // percent value
    const growProgressBackgroundColor = "black";    // 프로그래스바 색상 string

    const sunBox = useRef();
    const rainBox = useRef();
    const sunshine = useRef();
    const rain = useRef();
    const [elementStatus, setElementStatus] = useState('');
    const [sunAnimation, setSunAnimation] = useState(null);
    const [rainAnimation, setRainAnimation] = useState(null);

    const [elementImg, setElementImg] = useState(require('../../assets/HomeAsset/sun-img.png'));

    useEffect(() => {
        if (elementStatus === 'sun') {
            console.log("useEffect");
            setRainAnimation(null);
            let timeLine = gsap.timeline();
            timeLine.fromTo(sunBox.current, { y: "-2000" }, {
                y: "-600"
            });
            timeLine.fromTo(sunshine.current, { y: "-1000" }, {
                y: "0",
                duration: 2
            });
            timeLine.to(sunshine.current, {
                y: "-2000",
            });
            timeLine.to(sunBox.current, { y: "-2000" });
            setElementStatus('');
            // setTimeout(function() {
            //     if(Animation !== null){
            //         setAnimation(null);
            //     }
            //   }, 10000);
        }
        else if(elementStatus === 'rain'){
            setSunAnimation(null);
            let timeLine = gsap.timeline();
            timeLine.fromTo(rainBox.current, { y: "-1000" }, {
                y: "0",
                duration: 2
            });
            timeLine.to(rainBox.current, { y: "-2000" });
            // timeLine.fromTo(rain.current, {y: "0"}, {y: "-2000"});
            setElementStatus('');
        }
    }, [elementStatus]);

    return (
        <div className={styles.HomePage}>
            <div className={styles.HomeRoot}>
            {sunAnimation}
            {rainAnimation}
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
                        <img className={styles.SunRainImg} src={require('../../assets/HomeAsset/rain-img.png')} />
                        <div className={styles.SunRainText}>{rainCount}</div>
                    </div>
                    <div className={styles.SunDiv} onClick={sunClick}>
                        <img className={styles.SunRainImg} src={require('../../assets/HomeAsset/sun-img.png')} />
                        <div className={styles.SunRainText}>{sunCount}</div>
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