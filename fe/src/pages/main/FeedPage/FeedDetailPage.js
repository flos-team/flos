// import HeaderComponent from "../../components/HeaderComponent";
import HeaderComponent from "../../../components/HeaderComponent";
import { useLocation } from "react-router-dom";

function FeedDetailPage() {

  const location = useLocation();
  /** value : PostItem으로부터 전달받은 id */
  const value = location.state.id;
  
  return (
    <div>
      <HeaderComponent
        backVisible={true}
        pageName={"알림"}
        optType={0}
      ></HeaderComponent>
      value를 기반으로 fetch해오자
      {value}
      {/* {data} */}
    </div>
  );
}

export default FeedDetailPage;
