import {ReactComponent as Bottle1} from "../../assets/GardenAsset/flowerGlassBottle.svg"
import styled from "@emotion/styled"

const BottleImg = styled.div`
    width: 200px;
    height: 200px;
`;

const FlowerGlassBottle = (props) => {
    // 색상 가져오고
    // 각 정보를 가져와서 클릭하면 

    return (
        <BottleImg>
            <Bottle1></Bottle1>
        </BottleImg>
    );
}

export default FlowerGlassBottle;