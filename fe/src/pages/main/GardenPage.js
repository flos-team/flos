import FloatingGardenButton from "../../components/FloatingGardenButton";
import { useEffect, useState } from "react";
import GardenFullComponent from "../../components/GardenComponent/GardenFullComponent";
import GardenListComponent from "../../components/GardenComponent/GardenListComponent";
import backgroundData from "../../assets/GardenAsset/110535-spring-background-1.json";
import styled from "@emotion/styled"
import Lottie from "react-lottie";

const Graden = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const Header = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
`;

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    z-index: -1;

`;

const SwipeRight = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #12121212;
    z-index:10;
    pointer-events: none;
    color: white;
    font-size: 1.5rem;
    text-shadow: -2px 0 #FFF, 0 2px #FFF, 0 2px #FFF, 0 -2px #FFF;
`;

const Garden = () => {

    const [buttonStatus, setButtonStatusElement] = useState(true);
    let [mainViewComponent, setMainViewComponentImgElement] = useState(<GardenFullComponent />);

    const FloatingGardenButtonClickEvent = () => {

        console.log("clicked - 버튼 클릭됨");
        console.log(buttonStatus);

        setButtonStatusElement(!buttonStatus);
    }

    useEffect(() => {
        if (buttonStatus === true) {
            setMainViewComponentImgElement(<GardenFullComponent />);   // Full
        }
        else {
            setMainViewComponentImgElement(<GardenListComponent />);   // List
        }
    }, [buttonStatus]);

    return (
        <Graden>
            {/* <SwipeRight>></SwipeRight> */}
            {/* <Background>
                <Lottie options={{
                    autoplay: true,
                    animationData: backgroundData,
                }} height={1000} width={1000} />
            </Background> */}
            <Header>
                MY FLOS
            </Header>
            {mainViewComponent}
            <FloatingGardenButton status={buttonStatus} clickEvent={FloatingGardenButtonClickEvent}></FloatingGardenButton>
        </Graden>
    );
}

export default Garden;