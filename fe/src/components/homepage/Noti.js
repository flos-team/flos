import NotiImg from "../../../src/assets/HomeAsset/noti-img.png";
import styled from "@emotion/styled";
import { getNotification } from "../../api/NotificationAPI"

const Selection = styled.div`
  `;

const Noti = (props) => {
    const haveNoti = () => {
        getNotification().then((response) => {
            console.dir(response)
        })
    }
    return (
        <Selection onClick={props.onClick}>
            <img src={NotiImg} onClick={haveNoti}/>
        </Selection>
    )
}

export default Noti;