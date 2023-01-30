import HeaderComponent from "../components/HeaderComponent";
function Setting() {
  return (
    <div>
      <HeaderComponent
        backVisible={true}
        pageName={"설정"}
        optType={0}
      ></HeaderComponent>
      Setting Page
    </div>
  );
}

export default Setting;
