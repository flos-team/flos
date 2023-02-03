import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

/* import img css */
import userImg from "../../assets/DummyData/writerProfileSample.png";

/* import css */
import "./NotificationPage.css";

const NotificationPage = () => {
    return (
        <div>
            <HeaderComponent backVisible={true} pageName={"알림"} optType={0}></HeaderComponent>

        </div>
    );
}

export default NotificationPage;