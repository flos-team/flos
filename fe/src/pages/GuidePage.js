import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import { ReactComponent as EditIcon } from "../assets/HomeAsset/edit.svg";
import GrowProgressBar from "../components/homepage/GrowProgressBar";
import Flower from "../components/homepage/flower/Flower";
import goorm from '../assets/GoormAsset/goorm-smile.png'

import feedIcon from '../assets/NavBar/feed-icon.png'
import globalIcon from "../assets/NavBar/global-icon.png";
import homeIcon from "../assets/NavBar/home-icon-plus.png";
import gardenIcon from "../assets/NavBar/garden-icon.png";
import profileIcon from "../assets/NavBar/profile-icon.png";
import xIcon from "../assets/TutorialAsset/fi-br-cross.png"

import "../components/BottomNavigation/BottomNavigation.css";
import styles from "./GuidePage.module.css"

function Guide() {
    const [flowerInfo, setFlowerInfo] = useState({
        id: -1,
        isFullGrown: false, // 존재 여부
        name: "", // 이름
        sunElementCount: 0,
        rainElementCount: 0,
        CurrentGrowthValue: 0,
        MaxGrowthValue: 50,
        });
    const flowerRef = useRef();
    const [sunAnimation, setSunAnimation] = useState(null);
    const [rainAnimation, setRainAnimation] = useState(null);
    const [changeFlowerNamemodal, setChangeFlowerNamemodal] = useState(false);
    const [stage, setStage] = useState(1);

    const flowerNameClick = () => {
        // console.log("clicked - name");
        setSunAnimation(null);
        setRainAnimation(null);
        setChangeFlowerNamemodal(true);
    };
    
    const goNextStage = () => {
      setStage(stage+1)
      // console.log(stage)
      return stage
    }

    const [navItems, setNavItems] = useState([
      {
        navId: "feed",
        navIcon: feedIcon,
      },
      {
        navId: "global",
        navIcon: globalIcon,
      },
      {
        navId: "home",
        navIcon: homeIcon,
      },
      {
        navId: "garden",
        navIcon: gardenIcon,
      },
      {
        navId: "profile",
        navIcon: profileIcon,
      },
    ]);

    const navItemList = navItems.map(({ navId, navIcon }) => (
        <div key={navId} className="bottom-nav-item">
          <img key={navIcon} src={navIcon} alt=''/>
        </div>
    ));

    return (
    <>
    <div className={styles.HomePageDiv}>
    <HeaderComponent backVisible = {true} pageName={"가이드"} optType={0}></HeaderComponent>
    {stage === 1 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>안녕! 나는 구름이야<br></br>Flos에 온 걸 환영해!<br></br>우리 서비스에 대해 소개해줄게</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null }
    {stage === 2 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>이건 너의 마음을 먹고 자라날 아가 꽃이야! 동글동글 귀엽지?</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null}
    {stage === 3 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>홈에서 이 곳을 누르면 동글동글 귀여운 아가 꽃한테 이름을 지어줄 수 있어!</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null}
    {stage === 4 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>내가 무럭무럭 자라서 예쁜 꽃을 피우려면 따스한 햇살과 맑은 빗물이 나에게 꼭 필요해</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null}
    {stage === 5 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>이 아이템을 얻으려면 하단의 피드 혹은 둘러보기에서 다른 사람들의 글에 공감의 댓글을 작성하면 작성자로부터 햇살 또는 빗물 아이템을 답례로 받을 수 있어! </div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null}    
    {stage === 6 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>다른 사람의 마음에 귀기울이면 내가 키우는 꽃이 자란다니, 이거 정말 은유적이지 않아?</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null}
    {stage === 7 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>아 참, 이렇게 꽃피운 식물들은 너만의 정원에 소중히 간직될 거고 그 순간을 다시 보고 싶다면 언제나 정원에서 다시 볼 수 있어.</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <div className={styles.blinking} onClick={goNextStage}>이곳을 탭하여 계속하기</div>
    </div> : null}    
    {stage === 8 ?
    <div className={styles.guidecontainer}>
      <div className={styles.guidetext}>그럼 이제 너만의 이야기가 담긴 예쁜 꽃이 탄생하길 바랄게. 오늘도 행복한 하루 보내!</div>
      <img src={goorm} alt='' className={styles.goorm}></img>
      <Link to='/main' className={styles.blinking}>
        <div>홈으로 이동하기</div>
      </Link>
    </div> : null}
    <Link to='/main'>
      <img src={xIcon} alt='' className={styles.xIcon}></img>
    </Link>
    
      <div className={styles.FlowerInfo}>
        <div className={styles.FlowerName}>
          <span className={styles.FlowerNameText}>{flowerInfo.name}</span>
          {stage === 3 ? <EditIcon width={20} onClick={flowerNameClick} className={styles.redborder} />
          : <EditIcon width={15} onClick={flowerNameClick} />}
        </div>
        <GrowProgressBar
          CurrentGrowthValue={flowerInfo.CurrentGrowthValue}
          MaxGrowthValue={flowerInfo.MaxGrowthValue}
          growProgressBackgroundColor={"linear-gradient( to right, yellow, green )"}
        ></GrowProgressBar>
      </div>
      <div className={styles.FlowerItem}>
        <div className={stage === 4 ?`${styles.RainDiv} ${styles.redborder}` : styles.RainDiv}>
          {/* onClick={rainClick} */}
          <img className={styles.SunRainImg} src={require("../assets/HomeAsset/rain-img.png")} alt=''/>
          <div className={styles.SunRainText}>
            {flowerInfo.rainElementCount > 999 ? "999+" : flowerInfo.rainElementCount}
          </div>
        </div>
        <div className={stage === 4 ?`${styles.SunDiv} ${styles.redborder}` : styles.SunDiv}>
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
      <div className="bottom-nav-container">
        <div className="bottom-nav-bar">{navItemList}</div>
        {stage === 7 ? <div className={styles.gardenborder}></div> : null}
        {stage === 5 || stage === 6 ? <div className={styles.globalborder}></div> : null}
        {stage === 5 || stage === 6 ? <div className={styles.feedborder}></div> : null}
      </div>
    </div>

    </>
    )
}

export default Guide;