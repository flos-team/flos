import InfoImg from "../../../src/assets/HomeAsset/info-circle-img.png";
import styled from "@emotion/styled";

const Selection = styled.div`
  `;

const Info = (props) => {
    return (
        <Selection onClick={props.onClick}>
            <img src={InfoImg}/>
        </Selection>
    )
}

export default Info;