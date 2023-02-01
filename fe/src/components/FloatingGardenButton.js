import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {ReactComponent as FullIcon } from "../assets/GardenAsset/book.svg"
import {ReactComponent as ListIcon } from "../assets/GardenAsset/list-bullet.svg"

function FloatingGardenButton(props) {
    let ButtonImg;

    // useEffect(() => {
    //     console.log("유즈 이펙트");
    //     if(props.status === true){
    //        ButtonImg = <ListIcon></ListIcon>;   // Full
    //     }
    //     else {
    //         ButtonImg = <FullIcon></FullIcon>;   // List
    //     }
    // }, []);
    
    return (
    <>
        <button onClick={props.clickEvent}>
            <img src={ButtonImg} />
            {/* <ButtonImg /> */}
        </button>
    </>
    );
};

export default FloatingGardenButton;