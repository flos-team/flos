import { useEffect, useState } from "react";
import GardenFullComponent from "../../components/GardenComponent/GardenFullComponent";
import backgroundData from "../../assets/GardenAsset/110535-spring-background-1.json";
import styled from "@emotion/styled"
import Lottie from "react-lottie";
import background from "../../assets/GardenAsset/garden-background-img.jpg"
const GardenPage = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-image: url(${(p) => p.url});
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
`;

const Header = styled.div`
    font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;;
    font-weight: bold;
    letter-spacing: -4px;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9C9DB1;
    font-size: 3rem;

    text-shadow: 0 8px 9px #868798, 0px -2px 1px #D3D5EA;
`;

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    z-index: -1;

`;

const Garden = () => {
    return (
        <GardenPage url={background}>
            <Header>
                MY FLOS
            </Header>
            <GardenFullComponent />
        </GardenPage>
    );
}

export default Garden;