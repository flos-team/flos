import FloatingGardenButton from "../../components/FloatingGardenButton";

let buttonStatus = true;

const FloatingGardenButtonClickEvent = () => {
    console.log("clicked - 버튼 클릭됨");
    console.log(buttonStatus);
    if(buttonStatus == true){
        buttonStatus = false;
    }
    else {
        buttonStatus = true;
    }
}

const Garden = () => {
    return (
        <>
            <FloatingGardenButton status={buttonStatus} clickEvent={FloatingGardenButtonClickEvent}></FloatingGardenButton>
            너 머임?
        </>
    );
}

export default Garden;