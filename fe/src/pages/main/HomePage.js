import React, { useState, useEffect, useRef } from "react";
import Flower from "../../components/homepage/flower/Flower";
import Info from "../../components/homepage/Info";
import Noti from "../../components/homepage/Noti";
import { ReactComponent as EditIcon } from "../../assets/HomeAsset/edit.svg";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import GrowProgressBar from "../../components/homepage/GrowProgressBar";
import { gsap } from "gsap";
import rainObjectData from "../../assets/HomeAsset/8368-cloud.json";
import rainAnimationData from "../../assets/HomeAsset/81756-rain.json";
import sunObjectData from "../../assets/HomeAsset/22190-sunny-day.json";
import congratulationData from "../../assets/HomeAsset/76411-confetti-effects-lottie-animation.json";
import Lottie from "react-lottie";
import ChangeFlowerNamemodal from "../../components/homepage/ChangeFlowerNamemodal";
import DayBackground from "../../assets/HomeAsset/day.png";
import NightBackground from "../../assets/HomeAsset/night.png";
import "./HomePage.css";
import { motion } from "framer-motion";
import { getFlowerInfo, giveSun, giveRain, flowering, modifyFlower } from "../../api/FlowerAPI";
import { getMemberInfo } from "../../api/MemberAPI";
import { getNotification } from "../../api/NotificationAPI";
import {ReactComponent as Mountain} from "../../assets/HomeAsset/background-mountain.svg";
import cloudData from "../../assets/HomeAsset/day-cloud.json"
import MakeFlowerModal from "../../components/homepage/MakeFlowerModal";
import Swal from "sweetalert2";
import {commonMsg, commonMsgLength} from "../../constants/flowerMessage.js"

const Title = styled.h1`
  color: #007bff;
  font-size: 32px;
  ${(props) =>
    `transform: translateY(${props.translateY}px); 
   opacity: ${props.opacity};
  `}
`;

const WeatherAnimation = styled.div`
  position: relative;
  width: 100%;
  hegiht: 100%;
`;

const HomePageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  gap: 8px;
  isolation: isolate;
  position: relative;
  height: 100vh;

  background-image: url(${(p) => p.url});
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const FlowerMessageText = styled.div`
  position: absolute;
  width: 235px;
  height: 171px;
  left: 0px;
  top: 0px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
  padding: 20px;
`;

const FloweringButton = styled.button`
  width: 40%;
  height: 50px;
  position: absolute;
  z-index: 49;
  text-align: center;
  border: 0px;
  border-radius: 10px;

  &:hover {
    background-color: gray;
  }
`;

const Flowering = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Congratulation = styled.div`
  pointer-events: none;
`;

// 낮인지 확인하는 메소드
const isDay = (hour) => {
  if (hour >= 6 && hour < 18) {
    return true;
  } else {
    return false;
  }
};

const show = {
  opacity: 1,
  display: "block",
  scale: 1,
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none",
  },
};

const BackgroundMountain = styled.div`
  position: fixed;
  width: 1000px;
  height: 20vh;
  bottom: 300px;
  left: -200px;
  z-index: -2;
`;

const Background = styled.div`
  position: relative;
`;

const BackgroundCloud = styled.div`
  position: fixed;
  top: -100px;
  left: -200px;
  z-index: -5;
`;

const Home = () => {
  const sunBox = useRef();
  const rainBox = useRef();
  const sunshine = useRef();
  const rain = useRef();
  const flowerRef = useRef();
  const [elementStatus, setElementStatus] = useState("");
  const [sunAnimation, setSunAnimation] = useState(null);
  const [rainAnimation, setRainAnimation] = useState(null);
  const [changeFlowerNamemodal, setChangeFlowerNamemodal] = useState(false);
  const [makeFlowermodal, setMakeFlowerModal] = useState(false);
  const [isFlowering, setIsFlowering] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [haveNoti, setHaveNoti] = useState(false);
  const [backgroundImgUrl, setBackgroundImgUrl] = useState(0);

  const [elementImg, setElementImg] = useState(require("../../assets/HomeAsset/sun-img.png"));
  const [flowerInfo, setFlowerInfo] = useState({
    id: -1,
    isFullGrown: false, // 존재 여부
    name: "", // 이름
    sunElementCount: 0,
    rainElementCount: 0,
    CurrentGrowthValue: 0,
    MaxGrowthValue: 50,
  });

  const doFullGrown = () => {
    flowerInfo.isFullGrown = true;
    console.log("개화 시작");
    setIsFlowering(true);
  };


  const [flowerMessage, setFlowerMessage] = useState(null);
  const [flowerMessageIsVisible, setFlowerMessageIsVisible] = useState(true);

  // ----------------------- 시간에 따른 배경화면 지정 -------------------------

  let timer;

  useEffect(() => {
    /*
     *   현재 시간을 가져와서 배경을 변환함
     */
    let currentHour = new Date().getHours();
    if (isDay(currentHour)) {
      setBackgroundImgUrl(DayBackground);
    } else {
      setBackgroundImgUrl(NightBackground);
    }

    /*
     *   꽃 대화창 관련 interval
     */
    let interval = setInterval(function () {
      const value = Math.floor(Math.random() * commonMsgLength);
      setFlowerMessageIsVisible(true);
      setFlowerMessage(
        <motion.div
          className="flowerMessage"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={flowerMessageIsVisible ? show : hide}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FlowerMessageText>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {commonMsg[value].msg}
            </motion.span>
          </FlowerMessageText>
        </motion.div>
      );

      /*
       *   꽃이 대화창을 닫음
       */
      timer = setTimeout(() => {
        setFlowerMessageIsVisible(!flowerMessageIsVisible);
        setFlowerMessage(null);
      }, 7000);
    }, 10000);

    /*
     * 알림 확인
     */
    isHaveNoti();

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    updateInfo();
  }, [flowerInfo]);

  useEffect(() => {
    if (elementStatus === "sun") {
      console.log("useEffect");
      setRainAnimation(null);
      let sunTimeLine = gsap.timeline();
      sunTimeLine
        .fromTo(
          sunBox.current,
          { x: "400", y: "0" },
          {
            x: "-0",
            y: "-300",
            duration: 1.5,
          }
        )
        .to(sunBox.current, {
          x: "-400",
          y: "0",
          duration: 1.5,
        });
      // sunTimeLine.to(sunshine.current, {
      //   y: "-2000",
      // });
      // sunTimeLine.to(sunBox.current, { y: "-2000" });
      setElementStatus("");
      // setTimeout(function() {
      //     if(Animation !== null){
      //         setAnimation(null);
      //     }
      //   }, 10000);
    } else if (elementStatus === "rain") {
      setSunAnimation(null);
      let rainTimeLine = gsap.timeline();
      rainTimeLine
        .fromTo(
          rainBox.current,
          { x: "400", y: "0" },
          {
            x: "0",
            y: "-200",
            duration: 2,
          }
        )
        .to(rainBox.current, {
          x: "-400",
          y: "0",
          duration: 2,
        });
      // rainTimeLine.to(rainBox.current, { y: "-2000" });
      rainTimeLine.fromTo(rain.current, { y: "0" }, { y: "-3000" });
      setElementStatus("");
    }
  }, [elementStatus]);

  const updateInfo = () => {
    /*
     *   꽃 상태와 햇빛, 빗물 정보를 가져와서 저장함
     */
    getFlowerInfo().then((res) => {
      console.log(res);
      if (res === "NO_FLOWER_EXISTS") {
        setMakeFlowerModal(true);
        console.log("꽃이 존재하지 않습니다.");
        return;
      }
      flowerInfo.id = res.id;
      flowerInfo.isFullGrown = res.isFullGrown;
      flowerInfo.name = res.name;
      flowerInfo.CurrentGrowthValue = res.currentGrowthValue;
      flowerInfo.MaxGrowthValue = res.maxGrowthValue;
      flowerInfo.color = res.color;
      console.log("꽃 정보 가져옴");
    });
    getMemberInfo().then((res) => {
      flowerInfo.sunElementCount = res.light;
      flowerInfo.rainElementCount = res.water;
    });
  };

  const sunClick = () => {
    // 해 버튼을 클릭 했을 경우,
    console.log("clicked - sun");
    if (flowerInfo.MaxGrowthValue == flowerInfo.CurrentGrowthValue) {
      Swal.fire({
        icon: "warning",
        title: "더 이상 해가 뜰 수 없습니다.",
        text: "개화를 진행해주세요.",
      });
      return;
    }
    if (flowerInfo.sunElementCount < 1) {
      Swal.fire({
        icon: "warning",
        title: "햇빛의 양이 부족합니다.",
      });

      return;
    }
    setElementImg(require("../../assets/HomeAsset/sun-img.png"));
    setElementStatus("sun");
    const sunObjectOptions = {
      autoplay: true,
      animationData: sunObjectData,
    };
    // 서버랑 통신해서 sun이 소진되었다고 전송
    giveSun().then((res) => {
      flowerInfo.CurrentGrowthValue = res.currentGrowValue;
      flowerInfo.isFullGrown = res.isFullGrown;
    });

    flowerInfo.sunElementCount--;
    flowerRef.current.FlowerSmile();
    setSunAnimation(
      <>
        <div ref={sunBox}>
          <Lottie options={sunObjectOptions} height={500} width={500} />
        </div>
        {/* <div className={styles.SunShine} ref={sunshine}></div> */}
      </>
    );
  };

  const rainClick = () => {
    // 비 버튼을 클릭 했을 경우,
    console.log("clicked - rain");
    if (flowerInfo.MaxGrowthValue == flowerInfo.CurrentGrowthValue) {
      Swal.fire({
        icon: "warning",
        title: "더 이상 비를 내릴 수 없습니다.",
        text: "개화를 진행해주세요.",
      });
      return;
    }
    if (flowerInfo.rainElementCount < 1) {
      Swal.fire({
        icon: "warning",
        title: "빗물의 양이 부족합니다.",
      });
      return;
    }
    setElementImg(require("../../assets/HomeAsset/rain-img.png"));
    setElementStatus("rain");
    const rainAnimationOptions = {
      // loop: true,
      autoplay: true,
      animationData: rainAnimationData,
    };
    // 서버랑 통신해서 rain이 소진되었다고 전송
    giveRain().then((res) => {
      flowerInfo.CurrentGrowthValue = res.currentGrowValue;
      flowerInfo.isFullGrown = res.isFullGrown;
    });
    flowerInfo.rainElementCount--;
    flowerRef.current.FlowerSmile();
    const rainObjectOptions = {
      autoplay: true,
      animationData: rainObjectData,
    };
    setRainAnimation(
      <WeatherAnimation>
        <div ref={rainBox} className={styles.raindrop}>
          <Lottie options={rainObjectOptions} height={300} width={300} />
        </div>
        <div ref={rain}>
          <Lottie options={rainAnimationOptions} height={400} width={400} />
        </div>
      </WeatherAnimation>
    );
  };

  const flowerNameClick = () => {
    console.log("clicked - name");
    setSunAnimation(null);
    setRainAnimation(null);
    setChangeFlowerNamemodal(true);
  };

  /*
   * 이름 변경 함수
   */
  const ChangeFlowerNameOnclick = (newName) => {
    console.log("바꾸기 시작");
    console.log("새로운 이름", newName);
    flowerInfo.name = newName;
    modifyFlower(flowerInfo.id, flowerInfo.name);
    setChangeFlowerNamemodal(false);
    updateInfo();
  };

  const CancelChangingFlowerNameOnclick = () => {
    setChangeFlowerNamemodal(false);
  };

  /*
   * 꽃 생성 함수
   */
  const MakeFlowerOnclick = (name) => {
    if(name === ""){
      Swal.fire({
        icon: "warning",
        title: "꽃 이름이 비어있어요!",
        text: "꽃의 이름을 지어주세요.",
      });
    }
    else{
      setMakeFlowerModal(false);
      flowerInfo.name = name;
      updateInfo();
    }
  };

  const doFlowering = () => {
    flowering(flowerInfo.id);
    window.location.replace(`/flower-end-page/${flowerInfo.id}`);
  };

  const onClickPlayMusicButton = () => {
    setIsPlay((pre) => !pre);
  };

  const isHaveNoti = () => {
    getNotification().then((res) => {
      if (res.length === 0) {
        setHaveNoti(false);
      } else {
        setHaveNoti(true);
      }
    });
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <HomePageDiv url={backgroundImgUrl}>
      <div className={styles.HomeRoot}>
        {isFlowering == true ? (
          <Flowering>
            <FloweringButton
              onClick={() => {
                doFlowering();
              }}
            >
              개화
            </FloweringButton>
            <Congratulation>
              <Lottie
                options={{
                  autoplay: true,
                  animationData: congratulationData,
                }}
                height={800}
                width={800}
              />
            </Congratulation>
          </Flowering>
        ) : null}
        {makeFlowermodal == true ? <MakeFlowerModal makeOnclick={MakeFlowerOnclick} /> : null}
        {changeFlowerNamemodal == true ? (
          <ChangeFlowerNamemodal
            oldName={flowerInfo.name}
            changeOnclick={ChangeFlowerNameOnclick}
            cancelOnclick={CancelChangingFlowerNameOnclick}
          />
        ) : null}
        {sunAnimation}
        {rainAnimation}
        <div className={styles.HomeHeader}>
          <Link to="/guide">
            <Info />
          </Link>
          <Link to="/notification">
            <Noti />
          </Link>
          {haveNoti ? <span className={styles.redpoint}>˙</span> : null}
        </div>
        <div className={styles.musicBtn}>
          {/* <button onClick={onClickPlayMusicButton}>{isPlay ? '⏹' : '▶'}</button> */}

          {/* <button id="play-icon"></button> */}
          {/* {isPlay ?<audio
            src='https://docs.google.com/uc?export=open&id=14JlzHWUE2TqAsN237ft43SOw02xDPori'
            autoPlay={false} controls="controls" className={styles.audiocontrols}></audio> 
            : null} */}
        </div>

        {flowerMessage}
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
          <div className={styles.RainDiv} onClick={rainClick}>
            <img className={styles.SunRainImg} src={require("../../assets/HomeAsset/rain-img.png")} />
            <div className={styles.SunRainText}>
              {flowerInfo.rainElementCount > 999 ? "999+" : flowerInfo.rainElementCount}
            </div>
          </div>
          <div className={styles.SunDiv} onClick={sunClick}>
            <img className={styles.SunRainImg} src={require("../../assets/HomeAsset/sun-img.png")} />
            <div className={styles.SunRainText}>
              {flowerInfo.sunElementCount > 999 ? "999+" : flowerInfo.sunElementCount}
            </div>
          </div>
        </div>
        <div className={styles.Flowerpot}>
          <Flower ref={flowerRef} flowerInfo={flowerInfo} doFullGrown={doFullGrown}></Flower>
        </div>
      </div>
      <Background>
        <BackgroundCloud>
          <Lottie
                options={{
                  autoplay: true,
                  animationData: cloudData,
                }}
                height={1000}
                width={1000}
              />
        </BackgroundCloud>
        <BackgroundMountain>
        <Mountain />
      </BackgroundMountain>
      </Background>
    </HomePageDiv>
  );
};

export default Home;
