import { useState } from "react";
import styled from "@emotion/styled";

// import { ReactComponent as Eye1 } from "../../assets/HomeAsset/flower/eye1.svg";
// import { ReactComponent as Head1 } from "../../assets/HomeAsset/flower/head1.svg";
// import { ReactComponent as Leaf1 } from "../../assets/HomeAsset/flower/leaf1.svg";
// import { ReactComponent as Mouth1 } from "../../assets/HomeAsset/flower/mouth1.svg";

import { ReactComponent as Eyes1 } from "../../assets/HomeAsset/flower/eye1.svg";
import { ReactComponent as Eyes2 } from "../../assets/HomeAsset/flower/eye1.svg";
import { ReactComponent as Mouth1 } from "../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Mouth2 } from "../../assets/HomeAsset/flower/mouth1.svg";
import { ReactComponent as Mouth3 } from "../../assets/HomeAsset/flower/mouth1.svg";


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
    width: 240px;
    text-align: center;
  
    position: absolute;
    top: 80px;
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
    width: 240px;
    text-align: center;
  
    position: absolute;
    bottom: 70px;
  
    path {
      stroke: ${(p) => COLORS[p.colorType].color};
    }
  `;

const Face = styled.div`
    background: ${(p) => COLORS[p.colorType].face};
    width: 240px;
    height: 240px;
    margin-left: 100px;
    margin-top: 30px;
  
    border-radius: 100%;
  
    position: relative;
  `;

const Flower = () => {
    // const [LeafElement, setLeafElement] = useState(null);
    // const [HeadElement, setHeadElement] = useState(null);
    // const [EyesElement, setEyesElement] = useState(null);
    // const [MouthElement, setMouthElement] = useState(null);
    // const Leafs = [Leaf1];
    // const Heads = [Head1];
    // const Eyes = [Eye1];
    // const Mouths = [Mouth1];

    // setLeafElement(Leafs[0]);
    // setHeadElement(Heads[0]);
    // setEyesElement(Eyes[0]);
    // setMouthElement(Mouths[0]);
    // console.dir(Leaf1);

    // return (
    //     <Face colorType="green">
    //         {LeafElement && (
    //             <Leafs colorType={"green"}>
    //                 <LeafElement />
    //             </Leafs>
    //         )}
    //         {HeadElement && (
    //             <Heads colorType={"green"}>
    //                 <HeadElement />
    //             </Heads>
    //         )}
    //         {EyesElement && (
    //             <Eyes colorType={"green"}>
    //                 <EyesElement />
    //             </Eyes>
    //         )}
    //         {MouthElement && (
    //             <Mouth colorType={"green"}>
    //                 <MouthElement />
    //             </Mouth>
    //         )}
    //     </Face>
    // );
    const [EyesElement, setEyesElement] = useState(null);
    const [MouthElement, setMouthElement] = useState(null);
    const [color, setColor] = useState("green");
    const colorPickers = ["green", "yellow", "blue"];

    const eyes = [Eyes1, Eyes2];
    const mouths = [Mouth1, Mouth2, Mouth3];

    return (
        <>
            <ButtonGroup>
                {colorPickers.map((value) => {
                    return (
                        <FacePicker
                            colorType={value}
                            onClick={() => setColor(value)}
                            key={value}
                        >
                            {value}
                        </FacePicker>
                    );
                })}
            </ButtonGroup>
            <Face colorType={color}>
                <Eyes1 />
                <Mouth1 />
            </Face>
        </>
    );
}


export default Flower;