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
    margin-bottom: 5px;
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
    margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
    width: 80%;
    display: flex;
`;
const ChangeButton = styled.button`
    flex-grow: 1;
`;

const CancelButton = styled.button`
flex-grow: 1;
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
                <ModalText>바꿀 이름을 입력해주세요.</ModalText>
                <ChangeNameInput value={name} onChange={onChange}></ChangeNameInput>
                <ButtonContainer>
                    <ChangeButton onClick={() => props.changeOnclick(name)}>바꾸기</ChangeButton>
                    <CancelButton onClick={props.cancelOnclick}>취소하기</CancelButton>
                </ButtonContainer>
            </Modal>
        </>
    )
}

export default ChangeFlowerNamemodal;