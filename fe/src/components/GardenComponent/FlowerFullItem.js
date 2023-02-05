import styled from "@emotion/styled";
import GardenFullComponentDetailData from "./GardenFullComponentDetail"

const FlowerView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
    let flowerInfo = props.flowerInfo;
    let flowerImgData = {
        flowerColor: "red"
    }
    let flowerData = {
        state: "은은한",
        name: "춘식",
        length: 15,
        startDate: "2022-10-11",
        endDate: "2022-10-30"
    }
    return (
        <FullItem>
            <FlowerView>
                이미지
                이미지
                이미지
            </FlowerView>
            <FlowerDetailData>
                <GardenFullComponentDetailData flowerData={flowerData} />
            </FlowerDetailData>
        </FullItem>
    );
}

export default FlowerFullItem;