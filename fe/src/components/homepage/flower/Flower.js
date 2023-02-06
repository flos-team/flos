import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";

// import { ReactComponent as Eye1 } from "../../assets/HomeAsset/flower/eye1.svg";
import { ReactComponent as Head1 } from "../../../assets/HomeAsset/flower/head1.svg";
import { ReactComponent as Leaf1 } from "../../../assets/HomeAsset/flower/leaf1.svg";
import { ReactComponent as Leaf2 } from "../../../assets/HomeAsset/flower/leaf2.svg"
// import { ReactComponent as Mouth1 } from "../../assets/HomeAsset/flower/mouth1.svg";

import { ReactComponent as Eyes1 } from "../../../assets/HomeAsset/flower/eye1.svg";
import { ReactComponent as Eyes2 } from "../../../assets/HomeAsset/flower/eye2.svg";
import { ReactComponent as Mouth1 } from "../../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Mouth2 } from "../../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Mouth3 } from "../../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Pot1 } from "../../../assets/HomeAsset/flower/pot1.svg";
import { ReactComponent as Stem1 } from "../../../assets/HomeAsset/flower/stem1.svg";
import { ReactComponent as Flower1 } from "../../../assets/HomeAsset/flower/flower1.svg";
import { ReactComponent as Flower2 } from "../../../assets/HomeAsset/flower/flower2.svg";




const COLORS = {
    green: {
        face: "#F1F9F6",
        color: "#59C727",
    },
    yellow: {
        face: "#FFFBEB",
        color: "#F8C100",
    },
    blue: {
        face: "#ECF6FF",
        color: "#3AA0FF",
    },
    black: {
        face: "#000000",
        color: "#000000"
    }
};

const Avatars = styled.div`
    display: flex;
    align-items: center;
    .title {
      min-width: 20px;
      margin: 20px;
    }
    .box {
      padding: 0px 20px;
      cursor: pointer;
    }
  `;

const ButtonGroup = styled.div`
    display: flex;
  `;

const FacePicker = styled.button`
    border: 0;
    padding: 20px;
    margin: 20px;
    border-radius: 20px;
    min-width: 130px;
    background-color: ${(p) => COLORS[p.colorType].face};
    color: ${(p) => COLORS[p.colorType].color};
  
    cursor: pointer;
  `;

const Eyes = styled.div`
    width: 50px;
    text-align: center;
    position: absolute;
    z-index: 10;
    top: 125px;
    svg {
      fill: ${(p) => COLORS[p.colorType].color};
    }
    path {
      stroke: ${(p) => COLORS[p.colorType].color};
    }
    circle {
      stroke: ${(p) => COLORS[p.colorType].color};
      fill: ${(p) => COLORS[p.colorType].color};
    }
  `;
const Mouth = styled.div`
    width: 18px;
    text-align: center;
    
    position: absolute;
    bottom: 70px;
    z-index: 10;
    path {
      stroke: #000000;
    }
  `;

const Head = styled.div`
    width: 250px;
    text-align: center;
    
    position: absolute;
    bottom: 60px;
  
    path {
      fill: #FFE8A4;
    }
  `;


const Face = styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    border-radius: 100%;

    bottom: -38px;
    position: relative;
  `;

const FlowerPot = styled.div`
width: 100%;
height: 240px;
display: flex;
justify-content: center;
border-radius: 100%;

position: relative;
`;

const Pot = styled.div`
width: 300px;
text-align: center;

position: absolute;
bottom: -8px;

path {
  stroke: ${(p) => COLORS[p.colorType].color};
}
`;

const Leaf = styled.div`
width: 100%;
height: ${(p) => p.height};
display: flex;
justify-content: center;
border-radius: 100%;
top: 110px;
position: relative;
transition-duration: 1s;
path {
  fill: ${(p) => COLORS[p.colorType].color};
}
`;

const Stem = styled.div`
width: 100%;
height: ${(p) => p.height};
display: flex;
justify-content: center;
border-radius: 100%;
top: 200px;
position: relative;
transition-duration: 1s;
path {
  fill: ${(p) => COLORS[p.colorType].color};
}
`;

const FlowerDiv = styled.div`
width: 100%;
height: ${(p) => p.height};
display: flex;
justify-content: center;
border-radius: 100%;
top: 205px;
z-index: 20;
position: relative;
transition-duration: 2s;
path {
  fill: ${(p) => COLORS[p.colorType].color};
}
`;


const Flower = (props) => {
    const colorPickers = ["green", "yellow", "blue", "black"];

    const flowers = [Flower1, Flower2];
    const stems = [Stem1];
    const leafs = [Leaf1, Leaf2]
    const eyes = [Eyes1, Eyes2];
    const mouths = [Mouth1, Mouth2, Mouth3];
    const heads = [Head1];
    const pots = [Pot1];

    const [FlowerElement, setFlowerElement] = useState(flowers[0]);
    const [StemElement, setStemElement] = useState(stems[0]);
    const [LeafElement, setLeafElement] = useState(leafs[1]);
    const [EyesElement, setEyesElement] = useState(eyes[0]);
    const [MouthElement, setMouthElement] = useState(mouths[0]);
    const [HeadElement, setHeadElement] = useState(heads[0]);
    const [PotElement, setPotElement] = useState(pots[0]);

    const [color, setColor] = useState("green");
    const [flowerColor, setFlowerColor] = useState("red");
    const [leafHeight, setLeafHeight] = useState("50px");
    const [stemHeight, setStemHeight] = useState("50px");
    const [flowerHeight, setFlowerHeight] = useState("50px");

    const [isStemAvailable, setIsStemAvailable] = useState(false);
    const [isFlowerAvailable, setIsFlowerAvailable] = useState(false);

    useEffect(() => {
      const timeline = gsap.timeline({
        repeat:Infinity, yoyo: true, repeatDelay: 0.5, defaults: {duration: 1}
      });
  
      timeline.to(Leaf, {x: 170, scale:2});
    }, []);

    useEffect(() => {
      console.log("Flower UseEffect", leafHeight);
      const percent = props.flowerInfo.CurrentGrowthValue / props.flowerInfo.MaxGrowthValue * 100;
      console.log(percent+"% 만큼 나옴");
      if(percent >= 0 && percent < 25){
        setIsFlowerAvailable(false);
        setLeafElement(leafs[0]);
        // height 50px
        setLeafHeight("50px");
        setColor("green");
      }
      else if(percent >= 25 && percent < 50){
        setIsFlowerAvailable(false);
        setLeafElement(leafs[1]);
        if(percent < 30){
          setLeafHeight("100px");
        }
        else if(percent < 35){
          setLeafHeight("110px");
        }
        else if(percent < 40){
          setLeafHeight("120px");
        }
        else if(percent < 45){
          setLeafHeight("130px");
        }
        else if(percent < 50){
          setLeafHeight("140px");
        }
        setColor("green");
      }
      else if(percent >= 50 && percent < 75){
        setIsFlowerAvailable(false);
        setLeafElement(leafs[1]);
          // height 150px
          if(percent < 55){
            setLeafHeight("150px");
          }
          else if(percent < 60){
            setLeafHeight("160px");
          }
          else if(percent < 65){
            setLeafHeight("170px");
            setIsStemAvailable(true);
            setStemHeight("50px");
          }
          else if(percent < 70){
            setLeafHeight("180px");
            setStemHeight("60px");
          }
          else if(percent < 75){
            setLeafHeight("190px");
            setStemHeight("70px");
          }
          setColor("green");
      }
      else if(percent >= 75 && percent < 100){  // 꽃 등장
        setLeafElement(leafs[1]);
        // height 200px
        setIsFlowerAvailable(true);
        setIsStemAvailable(true);
        if(percent < 80){
          setLeafHeight("200px");
          setFlowerHeight("30px");
        }
        else if(percent < 85){
          setLeafHeight("210px");
          setFlowerHeight("40px");
        }
        else if(percent < 90){
          setLeafHeight("220px");
          setFlowerHeight("60px");
          setFlowerElement(flowers[1]);
        }
        else if(percent < 95){
          setLeafHeight("230px");
          setFlowerHeight("70px");
          setFlowerElement(flowers[1]);
        }
        else if(percent < 100){
          setLeafHeight("240px");
          setFlowerHeight("80px");
          setFlowerElement(flowers[1]);
        }
      }
      else if(percent == 100){  // 개화
        setIsFlowerAvailable(true);
        setIsStemAvailable(true);
        setLeafElement(leafs[1]);
        setFlowerHeight("80px");
        setLeafHeight("250px");
        props.makeFullfilled();
      }
      else {
        console.log("오류가 발생했습니다. 적절한 값이 아닙니다.");
      }
    }, [props.flowerInfo.CurrentGrowthValue]);

    return (
        <>
          {(isFlowerAvailable ? <FlowerDiv colorType={"blue"} height={flowerHeight}><FlowerElement /></FlowerDiv> : null)}
          {(isStemAvailable ? <Stem colorType={color} height={stemHeight}>
            <StemElement />
          </Stem> : null)}
            <Leaf colorType={color} height={leafHeight}>
              <LeafElement />
            </Leaf>
            <Face colorType={color}>
                {EyesElement && (
                    <Eyes colorType={color}>
                        <EyesElement />
                    </Eyes>
                )}
                {MouthElement && (
                    <Mouth colorType={color}>
                        <MouthElement />
                    </Mouth>
                )}
                {HeadElement && (
                    <Head colorType={color}>
                        <HeadElement />
                    </Head>
                )
                }
            </Face>
            <FlowerPot>
                <Pot colorType={color}>
                    <PotElement />
                </Pot>
            </FlowerPot>
        </>
    );
}


export default Flower;