import React, { useEffect } from "react";
import Flower from "../../components/homepage/flower/Flower";
import Info from "../../components/homepage/Info";
import Noti from "../../components/homepage/Noti";
import styles from "./HomePage.module.css";

let flower_state = true;


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

    const infoClick = () => {   // info 버튼을 클릭 했을 경우,
        // 도움말 페이지로 라우팅
        console.log("clicked - info");
    }

    const notiClick = () => {   // noti 버튼을 클릭 했을 경우,
        // 알림 페이지로 라우팅
        console.log("clicked - noti");
    }

    const rainCount = 1;    // 빗물 count 값
    const sunCount = 1; // 햇빛 count 값


    return (
        <div className={styles.HomePage}>
            <div className={styles.HomeRoot}>
                <div className={styles.HomeHeader}>
                    <Info onClick={infoClick}/>
                    <Noti onClick={notiClick}/>
                </div>
                <div className={styles.FlowerMessage}>
                    <span className={styles.FlowerMessageText}>안녕! 나는 튤립이야!</span>
                </div>
                <div className={styles.FlowerInfo}>info</div>
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