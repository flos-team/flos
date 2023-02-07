import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {ReactComponent as FullIcon } from "../assets/GardenAsset/book.svg"
import {ReactComponent as ListIcon } from "../assets/GardenAsset/list-bullet.svg"

const Button = styled.button`
    width: 40px;
    height: 40px;
    position: fixed;
    right: 30px;
    bottom: 100px;
    border-radius: 100%;
    border: none;
    background-color: #69BE94;
    z-index: 30;
`;


function FloatingGardenButton(props) {
    let [ButtonImg, setButtonImgElement] = useState(<ListIcon></ListIcon>);

    useEffect(() => {
        if(props.status === true){
            setButtonImgElement(<ListIcon></ListIcon>);   // Full
        }
        else {
            setButtonImgElement(<FullIcon></FullIcon>);   // List
        }
    }, [props.status]);
    
    return (
    <>
        <Button onClick={() => props.clickEvent()}>
            {ButtonImg}
        </Button>
    </>
    );
};

export default FloatingGardenButton;