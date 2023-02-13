import styled from "@emotion/styled";

// App.js
import { useState, useCallback } from "react";
import { createFlower } from "../../api/FlowerAPI"

const Modal = styled.div`
    width: 80%;
    height: 30vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    z-index: 50;
`;

const Header = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Main = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FlowerSelector = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
`;

const FlowerNameInputContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

const FlowerNameInput = styled.input`
    border: 0px;
    background: #FFFFFF;
    color: black;
`;

const Footer = styled.div`

`;

const SubmitButton = styled.button`
    border-radius: 10px;
    border: 0px;
    padding: 10px;

    &:hover {
        background-color: red;
    }
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    z-index: 49;
`;

const MakeFlowerModal = (props) => {
    const [type, setType] = useState("Tulip");
    const [name, setName] = useState("");


    const typeOnChange = useCallback(e => {
        setType(e.target.value);
    }, []);

    const nameOnChange = useCallback(e => {
        setName(e.target.value);
    }, []);

    const submit = async () => {
        if(name !== ""){
            await createFlower(type, name);
        }
        props.makeOnclick(name);
    }

    return (
        <>
            <Background></Background>
            <Modal>
                <Header>
                    꽃 생성하기
                </Header>
                <Main>
                    <FlowerSelector>
                        <div>
                            꽃 종류 선택
                        </div>
                        <select value={type} onChange={typeOnChange}>
                            <option value="Tulip">튤립</option>
                        </select>
                    </FlowerSelector>
                    <FlowerNameInputContainer>
                        <div>
                            꽃이름
                        </div>
                        <FlowerNameInput value={name} onChange={nameOnChange} placeholder="새로운 이름을 입력해주세요." />
                    </FlowerNameInputContainer>
                </Main>
                <Footer>
                    <SubmitButton onClick={() => {submit();}}>
                        꽃 생성하기
                    </SubmitButton>
                </Footer>
            </Modal>
        </>
    );
};

export default MakeFlowerModal;