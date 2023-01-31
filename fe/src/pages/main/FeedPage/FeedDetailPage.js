// import HeaderComponent from "../../components/HeaderComponent";
import { useLocation } from "react-router-dom";
import styles from "./FeedDetailPage.module.css";
import HeaderComponent from "../../../components/HeaderComponent";
import PostItem from "../../../components/PostItem";

import userImg from "../../../assets/GlobalAsset/user-img.png";
import moodImg from "../../../assets/GlobalAsset/sunny.png";
import emptySunny from "../../../assets/GlobalAsset/empty-sunny.png";
import sendImg from "../../../assets/FeedAsset/fi-br-paper-plane.png";

function FeedDetailPage() {
  const location = useLocation();
  /** value : PostItem으로부터 전달받은 postId */
  const value = location.state.postId;
  // console.log(value);
  const userName = "wonny";
  const postTime = "1시간 전";

  const commentRendering = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <div className={styles.comment}>
          <div className={styles.left}>
            <div className={styles.emptyDiv}>
              <img className={styles.profile} src={userImg}></img>
            </div>
          </div>

          <div className={styles.right}>
            <span className={styles.nickname}>tykimdream</span>
            <span className={styles.time}>34분 전</span>

            <div className={styles.emptyDiv}>
              <img className={styles.emotion} src={emptySunny}></img>
            </div>
            <div className={styles.content}>
              이 분은 철학자인가.이 분은 철학자인가.이 분은 철학자인가..
            </div>
          </div>
        </div>
      );
    }
    return result;
  };

  return (
    <div className={styles.feedRoot}>
      <HeaderComponent
        backVisible={true}
        pageName={"돌아가기"}
        optType={0}
      ></HeaderComponent>
      <div className={styles.main}>
        <PostItem mood={"RAINY"} userName={"wonnny"} postId={value}></PostItem>
        {/* props로 넘어온 id : {value} */}
        <div className={styles.commentFrame}>{commentRendering()}</div>
      </div>
      <div className={styles.commentInputFrame}>
        <div className={styles.inputLeft}>
          <img className={styles.currentProfile} src={userImg}></img>
        </div>
        <div className={styles.commentInputDiv}>
          <form className={styles.commentForm}>
            <input
              className={styles.commentInput}
              type="text"
              placeholder="댓글달기..."
            ></input>
            <img className={styles.sendBtn} src={sendImg}></img>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedDetailPage;
