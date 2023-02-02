import FloatingGardenButton from "../../components/FloatingGardenButton";
import {useEffect, useState} from "react";

const Garden = () => {

    const [buttonStatus, setButtonStatusElement] = useState(true);

    const FloatingGardenButtonClickEvent = () => {
        
        console.log("clicked - 버튼 클릭됨");
        console.log(buttonStatus);
    
        setButtonStatusElement(!buttonStatus);
    }
    
    return (
        <>
            <div>
                Header
            </div>
            <div>
                
            </div>
            <FloatingGardenButton status={buttonStatus} clickEvent={FloatingGardenButtonClickEvent}></FloatingGardenButton>
        </>
    );
}

export default Garden;