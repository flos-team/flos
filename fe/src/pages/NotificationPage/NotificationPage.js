import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

/* import img css */
import userImg from "../../assets/DummyData/writerProfileSample.png";

/* import component */
import AlarmItem from "../../components/AlarmItem/AlarmItem"

/* import css */
import "./NotificationPage.css";

const NotificationPage = () => {
    let testText = <><b>김채원</b>님이 <b>사쿠라</b> 님의 댓글에 좋아요를 누르셨습니다.</>
    let testTimeLog = "23시간 전"
    let n = 10;
    const AlarmItemList = [...Array(n)].map((e, i)=><AlarmItem AlarmImg={userImg} AlarmTextJSX={testText} AlarmTimeLog={testTimeLog} ></AlarmItem>)
    return (
        <div style={{backgroundColor:"#e8e8e8"}}>
            <HeaderComponent backVisible={true} pageName={"알림"} optType={0}></HeaderComponent>
            <div className="alarm-container">
                {AlarmItemList}
            </div>
        </div>
    );
}

export default NotificationPage;