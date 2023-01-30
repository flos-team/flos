import React, { useEffect } from "react";
import Flower from "../../components/flower/Flower"
import styles from "./HomePage.module.css"

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



    return (
        <Flower></Flower>
        // <div className={styles.HomePage}>
        //     <div className={styles.HomeRoot}>
        //         <div className={styles.HomeHeader}>

        //         </div>
        //         <div className={styles.FlowerMessage}>
        //             <span className={styles.FlowerMessageText}>안녕! 나는 튤립이야!</span>
        //         </div>
        //         <div className={styles.FlowerInfo}>info</div>
        //         <div className={styles.FlowerItem}>
        //             <div className={styles.RainDiv}>
        //                 <span className={styles.SunRainText}>999+</span>
        //                 <img className={styles.SunRainImg} src={require('../../assets/HomeAsset/rain-img.png')} />
        //             </div>
        //             <div className={styles.SunDiv}>
        //                 <span className={styles.SunRainText}>999+</span>
        //                 <img className={styles.SunRainImg} src={require('../../assets/HomeAsset/sun-img.png')} />
        //             </div>
        //         </div>
        //         <div className={styles.Flowerpot}>
        //             <Flower></Flower>
        //             flower
        //         </div>
        //     </div>
        // </div>
    );
}

export default Home;