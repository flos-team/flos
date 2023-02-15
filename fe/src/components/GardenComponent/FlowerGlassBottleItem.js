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
        black: "#FF012000"
    },
    orange: {
         main: "#FF7F50EE",
         light: "#FF5350EE",
         strong: "#FF5350EE",
         black: "#FF5350EE"
    },
    purple: {
         main: "#C15AF4EE",
         light: "#FF5350EE",
         strong: "#FF5350EE",
         black: "#FF5350EE"
    },
    pink: {
         main: "#FF8E9944",
         light: "#f0b3d0EE",
         strong: "#e297bf",
         black: "#c3669b"
    },
    white: {
        main: "#FFF0F5EE",
        light: "#FF5350EE",
        strong: "FF5350EE",
        black: "FF5350EE"
    },
    green: {
        main: "#8EE1D2EE",
        light: "#FF5350EE",
        strong: "#FF5350EE",
        black: "#FF5350EE"
    },
    yellow: {
         main: "#FFF56EEE",
         light: "#FF535066",
         strong: "FF535022",
         black: "FF535000"
    },
    blue: {
        main: "#3AA0FFEE",
        light: "#3AFFFF22",
        strong: "#3AFFFF00",
        black: "#3AA0FF00"
    },
    mango: {
        main: "linear-gradient( to bottom,  #FFF56E, #FF7F50)",
        light: "#FF5350EE",
        strong: "#FF5350EE",
        black: "#FF5350EE"
    },
    grapefruit: {
        main: "linear-gradient( to bottom,  #FF8E99, #FF5050)",
        light: "#FF5350EE",
        strong: "#FF5350EE",
        black: "#FF5350EE"
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