import NotiImg from "../../../src/assets/HomeAsset/noti-img.png";
import styled from "@emotion/styled";

const Selection = styled.div`
  `;

const Noti = (props) => {
    return (
        <Selection onClick={props.onClick}>
            <img src={NotiImg}/>
        </Selection>
    )
}

export default Noti;