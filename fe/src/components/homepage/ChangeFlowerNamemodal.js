import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";

const Modal = styled.div`
    width: 60%;
    height: 20vh;
    padding: 30px;
    background-color: white;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
`;

const ChangeNameInput = styled.input`
    width: 80%;
    height: 20px;
    margin: 10px 5px;
    border: 1px solid #FFFFFF;
    background-color: #efefef;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    z-index: 49;
`;

const ModalText = styled.div`
    font-weight: 600;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
`;
const ChangeButton = styled.button`
    border: 0px;
    padding: 6px;
    flex-grow: 1;
    margin-right: 6px;
    border-radius: 10px;
    background-color: green;
    color: white;
`;

const CancelButton = styled.button`
    border: 0px;
    padding: 6px;
    flex-grow: 1;
    border-radius: 10px;
    background-color: red;
    color: white;
`;

const ChangeFlowerNamemodal = (props) => {
    const [name, setName] = useState('');

    useEffect(() => {
        setName(props.oldName);
    }, []);

    const onChange = useCallback(e => {
        setName(e.target.value);
    }, []);

    return (
        <>
            <Background onClick={props.cancelOnclick}></Background>
            <Modal>
                <ModalText>이름 바꾸기</ModalText>
                <ChangeNameInput value={name} onChange={onChange}></ChangeNameInput>
                <ButtonContainer>
                    <ChangeButton onClick={() => props.changeOnclick(name)}>변경</ChangeButton>
                    <CancelButton onClick={props.cancelOnclick}>취소</CancelButton>
                </ButtonContainer>
            </Modal>
        </>
    )
}

export default ChangeFlowerNamemodal;