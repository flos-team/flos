import {ReactComponent as BottleImg} from "../../assets/GardenAsset/flowerGlassBottle.svg"
import {ReactComponent as FlowerImg} from "../../assets/GardenAsset/flowerGlassFlower.svg"
import styled from "@emotion/styled"
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

/*
* @css
* 꽃 컴포넌트 전체를 구성
*/
const BottleBox = styled.div`
    width: ${(p) => p.width};
    height: ${(p) => p.height};
    position: relative;
    display: flex;
    align-items: end;
    justify-content: center;
`;

/*
* @css
* 유리병을 구성
*/
const Bottle = styled.div`
    width: 100%;
    position: absolute;
`;

/*
* @css
* 꽃을 구성
*/
const Flower = styled.div`
    width: 50%;
    position: absolute;
    bottom: 20px;

    .flowermain {
        fill: ${(p) => p.color.main};
    }

    .flowerlight {
        fill: ${(p) => p.color.light};
    }

    .flowerstrong {
        fill: ${(p) => p.color.strong}
    }

    .flowerblack {
        fill: ${(p) => p.color.black}
    }

    .green {
        fill: #32CD32;
    }
`;

const COLORS = {
    red: {
        main: "#FF5050EE",
        light: "#FF535088",
        strong: "#FF015022",
        black: "#FF012011"
    },
    orange: {
         main: "#FF7F50EE",
         light: "#FF5F5088",
         strong: "#FF2F5022",
         black: "#FF0F5011"
    },
    purple: {
         main: "#C15AF4EE",
         light: "#C150F488",
         strong: "#C12AF422",
         black: "#C12AF411"
    },
    pink: {
         main: "#FF8E99EE",
         light: "#FF8E9988",
         strong: "#FF8E9922",
         black: "#FF8E9911"
    },
    white: {
        main: "#FFF0F5EE",
        light: "#FFC0F588",
        strong: "#FFB0F522",
        black: "#FFA0F511"
    },
    green: {
        main: "#8EE1D2EE",
        light: "#8EC1D288",
        strong: "#8B11D222",
        black: "#8EA1D211"
    },
    yellow: {
         main: "#FFF56EEE",
         light: "#FFE52E88",
         strong: "#FFE52E22",
         black: "#FF122E00"
    },
    blue: {
        main: "#3AA0FFEE",
        light: "#3AFFFF22",
        strong: "#3AFFFF00",
        black: "#3AA0FF11"
    },
    mango: {
        main: "linear-gradient( to bottom,  #FFF56E, #FF7F50)",
        light: "linear-gradient( to bottom,  #FFF86E, #FF6F50)",
        strong: "linear-gradient( to bottom,  #FFFE6E, #FF8F50)",
        black: "linear-gradient( to bottom,  #FFFE6E, #FF9F50)"
    },
    grapefruit: {
        main: "linear-gradient( to bottom,  #FF8E99, #FF5050)",
        light: "linear-gradient( to bottom,  #FF6E99, #FF5250)",
        strong: "linear-gradient( to bottom,  #FFAE99, #FF5350)",
        black: "linear-gradient( to bottom,  #FFCE99, #FF5550)"
    },
  };

const FlowerGlassBottle = (props) => {
    const flowerRef = useRef();
    const BottleRef = useRef();

    useEffect(() => {
        gsap.timeline({ repeat: Infinity, yoyo: true, repeatDelay: 0, defaults: { duration: 1 } })
        .fromTo(flowerRef.current, { y: -5, rotate: 5 }, { y: 5, rotate: -5 });
        
        gsap.timeline({ repeat: Infinity, yoyo: true, repeatDelay: 0, defaults: { duration: 1 } })
        .fromTo(BottleRef.current, { y: -2, rotate: -3 }, { y: 2, rotate: 3 });
    }, []);

    return (
        <BottleBox width={props.width} height={props.height}>
            <Bottle ref={BottleRef}>
                <BottleImg />
            </Bottle>
            <Flower ref={flowerRef} color={COLORS[props.color]}>
                <FlowerImg />
            </Flower>
        </BottleBox>
    );
}

export default FlowerGlassBottle;