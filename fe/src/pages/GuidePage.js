import React, { useState, useRef, useEffect } from "react"

import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import { ReactComponent as EditIcon } from "../assets/HomeAsset/edit.svg";
import GrowProgressBar from "../components/homepage/GrowProgressBar";
import Flower from "../components/homepage/flower/Flower";

import styles from "./GuidePage.module.css"

function Guide() {
    const [flowerInfo, setFlowerInfo] = useState({
        id: -1,
        isFullGrown: false, // 존재 여부
        name: "", // 이름
        sunElementCount: 1,
        rainElementCount: 1,
        CurrentGrowthValue: 0,
        MaxGrowthValue: 50,
        });
    const flowerRef = useRef();
    const [sunAnimation, setSunAnimation] = useState(null);
    const [rainAnimation, setRainAnimation] = useState(null);
    const [changeFlowerNamemodal, setChangeFlowerNamemodal] = useState(false);

    const flowerNameClick = () => {
        console.log("clicked - name");
        setSunAnimation(null);
        setRainAnimation(null);
        setChangeFlowerNamemodal(true);
    };

    return (
    <>
    <div className={styles.HomePageDiv}>
    <HeaderComponent backVisible = {true} pageName={"가이드"} optType={0}></HeaderComponent>
        <div className={styles.FlowerInfo}>
          <div className={styles.FlowerName}>
            <span className={styles.FlowerNameText}>{flowerInfo.name}</span>
            <EditIcon width={15} onClick={flowerNameClick} />
          </div>
          <GrowProgressBar
            CurrentGrowthValue={flowerInfo.CurrentGrowthValue}
            MaxGrowthValue={flowerInfo.MaxGrowthValue}
            growProgressBackgroundColor={"linear-gradient( to right, yellow, green )"}
          ></GrowProgressBar>
        </div>
        <div className={styles.FlowerItem}>
          <div className={styles.RainDiv}>
            {/* onClick={rainClick} */}
            <img className={styles.SunRainImg} src={require("../assets/HomeAsset/rain-img.png")} alt=''/>
            <div className={styles.SunRainText}>
              {flowerInfo.rainElementCount > 999 ? "999+" : flowerInfo.rainElementCount}
            </div>
          </div>
          <div className={styles.SunDiv}>
            {/* onClick={sunClick} */}
            <img className={styles.SunRainImg} src={require("../assets/HomeAsset/sun-img.png")} alt=''/>
            <div className={styles.SunRainText}>
              {flowerInfo.sunElementCount > 999 ? "999+" : flowerInfo.sunElementCount}
            </div>
          </div>
        </div>
        <div className={styles.Flowerpot}>
          <Flower ref={flowerRef} flowerInfo={flowerInfo}></Flower>
        </div>
    </div>
    </>
    )
}

export default Guide;