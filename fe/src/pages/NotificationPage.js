import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

function Setting() {
    return (
        <div>
            <HeaderComponent backVisible = {true} pageName={"알림"} optType={0}></HeaderComponent>
            Setting Page
        </div>
    );
}

export default Setting;