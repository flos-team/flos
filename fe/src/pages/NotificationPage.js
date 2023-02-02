import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

function Setting() {
    return (
        <div>
            <HeaderComponent backVisible = {true} pageName={"알림"} optType={0}></HeaderComponent>
            notification Page
        </div>
    );
}

export default Setting;