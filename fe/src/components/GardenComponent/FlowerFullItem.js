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
    overflow: hidden;
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

    background: linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.0572917) 50.99%, rgba(255, 255, 255, 0) 100%);
    border: 0px;
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
    align-items: center;
    flex-direction: column;
    top: 0px;
    padding-top: 40px;
    z-index: 50;
`;

const ContributorListItem = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 5px;
    background-color: #f9f9f9;
`;

const ContributorModalContainerTitle = styled.div`
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;

    &:after {
        border: 1px;
    }
`;

const ContributorModalContainerContent = styled.div`
    width: 100%;
    overflow: auto;
`;

const ContributorListItemImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const ContributorListItemId = styled.div`
    margin-left: 25px;
`;

const FlowerFullItem = (props) => {
    const [contributorModal, setContributorModal] = useState(false);
    const [contributorButtonColor, setContributorButtonColor] = useState("linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.0572917) 50.99%, rgba(255, 255, 255, 0) 100%)");
    const [contributorList, setContributorList] = useState([]);

    const EndingPlayButtonOnClick = () => {
        // console.log("엔딩 가져와야 함");
    };

    const ContributorButtonOnClick = () => {
        setContributorModal(!contributorModal);
        if(contributorModal){
            setContributorButtonColor("linear-gradient(360deg, #FFFFFF 0%, rgba(255, 255, 255, 0.0872917) 50.99%, rgba(255, 255, 255, 0) 100%)");
        }
        else {
            setContributorButtonColor("linear-gradient(360deg, #FFFFFF 0%, rgba(100, 100, 100, 0.5) 50.99%, rgba(0, 0, 0, 0) 100%)");
            getFlowerContributorList(props.flowerInfo.id).then((res) => {
                // console.log("기여자 가져와서 페이지 전환해야 함");
                // console.log(res);
                setContributorList([...res].map((e, i) => {
                    return (<ContributorListItem key={i}>
                        <ContributorListItemImg src={`https://i8b210.p.ssafy.io/api/file/${e.profileImage.saveName}`} />
                        <ContributorListItemId>{e.nickname}</ContributorListItemId>
                    </ContributorListItem>);
                }));
            });
        }
    };

    return (
        <ItemContainer>
            {contributorModal ? 
                <ContributorModalContainer>
                    <ContributorModalContainerTitle>도움 주신 분들</ContributorModalContainerTitle>
                    <ContributorModalContainerContent>
                        {(contributorList.length == 0 ? "도움 주신 분들이 없어요!" : contributorList)}
                    </ContributorModalContainerContent>
                </ContributorModalContainer> : null}
            <FullItem>
                <FlowerView>
                    <FlowerGlassBottle width={"200px"} height={"200px"} color={props.flowerInfo.flowerColor}></FlowerGlassBottle>
                </FlowerView>
                <FlowerDetailData>
                    <GardenFullComponentDetailData flowerData={props.flowerInfo} />
                </FlowerDetailData>
                <ButtonArea>
                    <Link to={`/flower-end-page/${props.flowerInfo.id}`}>
                    <EndingPlayButton onClick={EndingPlayButtonOnClick}><EndingPlayImg /></EndingPlayButton>
                    </Link>
                    <ContributorButton onClick={ContributorButtonOnClick} background={contributorButtonColor}><ContributorImg /></ContributorButton>
                </ButtonArea>
            </FullItem>
        </ItemContainer>
    );
}

export default FlowerFullItem;