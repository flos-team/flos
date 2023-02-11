import styled from "@emotion/styled";
import GardenFullComponentDetailData from "./GardenFullComponentDetail"
import FlowerGlassBottle from "./FlowerGlassBottleItem";

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

const FlowerFullItem = (props) => {
    return (
        <FullItem>
            <FlowerView>
                <FlowerGlassBottle width={"200px"} height={"200px"}></FlowerGlassBottle>
            </FlowerView>
            <FlowerDetailData>
                <GardenFullComponentDetailData flowerData={props.flowerInfo} />
            </FlowerDetailData>
        </FullItem>
    );
}

export default FlowerFullItem;