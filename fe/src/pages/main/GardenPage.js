import FloatingGardenButton from "../../components/FloatingGardenButton";
import {useEffect, useState} from "react";
import GardenFullComponent from "../../components/GardenComponent/GardenFullComponent";
import GardenListComponent from "../../components/GardenComponent/GardenListComponent";
import styled from "@emotion/styled"

const Header = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
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
        if(buttonStatus === true){
            setMainViewComponentImgElement(<GardenFullComponent />);   // Full
        }
        else {
            setMainViewComponentImgElement(<GardenListComponent />);   // List
        }
    }, [buttonStatus]);
        
    return (
        <>
            <Header>
                MY FLOS HISTORY
            </Header>
            {mainViewComponent}
            <FloatingGardenButton status={buttonStatus} clickEvent={FloatingGardenButtonClickEvent}></FloatingGardenButton>
        </>
    );
}

export default Garden;