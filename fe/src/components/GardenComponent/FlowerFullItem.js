import styled from "@emotion/styled";
import GardenFullComponentDetailData from "./GardenFullComponentDetail"
import FlowerGlassBottle from "./FlowerGlassBottleItem";
import { ReactComponent as ContributorImg } from "../../assets/GardenAsset/users.svg"
import { ReactComponent as EndingPlayImg } from "../../assets/GardenAsset/play-circle.svg"
import { getFlowerContributorList } from "../../api/FlowerAPI";
import { useState } from "react";
import { Link } from "react-router-dom";

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FlowerView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

const FlowerDetailData = styled.div`
    flex-grow: 1;
`;

const FullItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ContributorButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0px;

    box-sizing: border-box;

    background: ${(p) => p.background}
`;

const EndingPlayButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0px;
    
    box-sizing: border-box;

    background: white;
    border: 1px solid #FBFBFB;
`;

const ButtonArea = styled.div`
    display: flex;
    height: 5vh;
    margin-bottom: 30px;
    width: 100%;
    justify-content: space-evenly;
`;

const ContributorModalContainer = styled.div`
    width: 80%;
    height: 470px;
    background-color: white;
    position: fixed;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0px;
`;

const ContributorListItem = styled.div`
    width: 100%;
    display: flex;
    margin-left: 50px;
    justify-content: left;
    align-items: center;
`;

const ContributorModalContainerTitle = styled.div`
    margin-bottom: 20px;


    &:after {
        border: 1px;
    }
`;

const ContributorListItemImg = styled.div`
`;

const ContributorListItemId = styled.div`
    margin-left: 25px;
`;

const FlowerFullItem = (props) => {
    const [contributorModal, setContributorModal] = useState(false);
    const [contributorButtonColor, setContributorButtonColor] = useState("linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.0572917) 50.99%, rgba(255, 255, 255, 0) 100%)");
    const [contributorList, setContributorList] = useState([]);

    const EndingPlayButtonOnClick = () => {
        console.log("엔딩 가져와야 함");
    };

    const ContributorButtonOnClick = () => {
        setContributorModal(!contributorModal);
        if(contributorModal){
            setContributorButtonColor("linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.0872917) 50.99%, rgba(255, 255, 255, 0) 100%)");
            getFlowerContributorList(0, props.flowerInfo.id).then((res) => {
                console.log("기여자 가져와서 페이지 전환해야 함");
                console.log(res);
                setContributorList(...res.map(() => {
                    <ContributorListItem>
                        <ContributorListItemImg>이미지</ContributorListItemImg>
                        <ContributorListItemId>아이디</ContributorListItemId>
                    </ContributorListItem>
                }));
            });
        }
        else {
            setContributorButtonColor("linear-gradient(360deg, #FFFFFF 0%, rgba(100, 100, 100, 0.5) 50.99%, rgba(0, 0, 0, 0) 100%)");
            
        }
    };

    return (
        <ItemContainer>
            {contributorModal ? 
                <ContributorModalContainer>
                    <ContributorModalContainerTitle>기여자 리스트</ContributorModalContainerTitle>
                    {contributorList}
                </ContributorModalContainer> : null}
            <FullItem>
                <FlowerView>
                    <FlowerGlassBottle width={"200px"} height={"200px"}></FlowerGlassBottle>
                </FlowerView>
                <FlowerDetailData>
                    <GardenFullComponentDetailData flowerData={props.flowerInfo} />
                </FlowerDetailData>
                <ButtonArea>
                    <Link to="/flower-end-page">
                    <EndingPlayButton onClick={EndingPlayButtonOnClick}><EndingPlayImg /></EndingPlayButton>
                    </Link>
                    <ContributorButton onClick={ContributorButtonOnClick} background={contributorButtonColor}><ContributorImg /></ContributorButton>
                </ButtonArea>
            </FullItem>
        </ItemContainer>
    );
}

export default FlowerFullItem;