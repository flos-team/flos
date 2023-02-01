import HeaderComponent from "../../../components/HeaderComponent";
function WritePost() {
  return (
    <div>
      <HeaderComponent
        backVisible={true}
        pageName={"나의 마음 포스트 작성하기"}
        optType={0}
      ></HeaderComponent>
      Setting Page
    </div>
  );
}

export default WritePost;
