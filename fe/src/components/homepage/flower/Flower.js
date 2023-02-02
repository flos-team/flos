import { useState } from "react";
import styled from "@emotion/styled";

// import { ReactComponent as Eye1 } from "../../assets/HomeAsset/flower/eye1.svg";
import { ReactComponent as Head1 } from "../../../assets/HomeAsset/flower/head1.svg";
import { ReactComponent as Leaf1 } from "../../../assets/HomeAsset/flower/leaf1.svg";
// import { ReactComponent as Mouth1 } from "../../assets/HomeAsset/flower/mouth1.svg";

import { ReactComponent as Eyes1 } from "../../../assets/HomeAsset/flower/eye1.svg";
import { ReactComponent as Eyes2 } from "../../../assets/HomeAsset/flower/eye2.svg";
import { ReactComponent as Mouth1 } from "../../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Mouth2 } from "../../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Mouth3 } from "../../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Pot1 } from "../../../assets/HomeAsset/flower/pot1.svg";


const COLORS = {
    green: {
        face: "#F1F9F6",
        color: "#53AC8E",
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
      stroke: ${(p) => COLORS[p.colorType].color};
    }
  `;

const Head = styled.div`
    width: 250px;
    text-align: center;
    
    position: absolute;
    bottom: 60px;
  
    path {
      fill: ${(p) => COLORS[p.colorType].color};
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
height: 50px;
display: flex;
justify-content: center;
border-radius: 100%;
top: 110px;
position: relative;
svg {
  fill: ${(p) => COLORS[p.colorType].color};
}
`;


const Flower = () => {
    const colorPickers = ["green", "yellow", "blue", "black"];

    const leafs = [Leaf1]
    const eyes = [Eyes1, Eyes2];
    const mouths = [Mouth1, Mouth2, Mouth3];
    const heads = [Head1];
    const pots = [Pot1];

    const [LeafElement, setLeafElement] = useState(leafs[0]);
    const [EyesElement, setEyesElement] = useState(eyes[0]);
    const [MouthElement, setMouthElement] = useState(mouths[0]);
    const [HeadElement, setHeadElement] = useState(heads[0]);
    const [PotElement, setPotElement] = useState(pots[0]);
    const [color, setColor] = useState("black");


    return (
        <>
            <Leaf colorType="blue">
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
                    <Head colorType={"green"}>
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