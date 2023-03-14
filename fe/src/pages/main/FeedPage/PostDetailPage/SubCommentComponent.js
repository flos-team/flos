import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import { seeMore } from "./subComment";

import { getTimeDiffText } from "../../../../api/DateModule";

import dayjs from "dayjs";
import sunnyActivate from "../../../../assets/GlobalAsset/sunny-activate.png";
import sunnyDeActivate from "../../../../assets/GlobalAsset/sunny-deactivate.png";
import { getPriComment, deleteComment } from "../../../../api/CommentAPI";

import "./PostDetailPage.css";

const url = "********";

const SubCommentComponent = ({ parentId }) => {
  const user = useSelector((state) => state.user.userData);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getPriComment(parentId).then((response) => {
      setComments(response);
    });
  }, []);


  useEffect(() => {}, [comments]);

  // 자신의 댓글 삭제를 누르면 삭제하는 함수
  const commentDeleteBtn = (commentId) => {
    return (
      <div>
        <span className="comment-header-right" onClick={() => deleteComment(commentId)}>
          삭제
        </span>
      </div>
    );
  };

  // 타인의 프로필로 이동하는 함수
  const toProfile = (userId) => {
    navigate(`/other-profile-page/${userId}`);
  };

  const commentsList = comments.map((comment) => {
    let commentDay = dayjs(comment.createdAt, "YYYY-MM-DD HH:mm:ss");
    let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(commentDay, curDay);

    const result = (
      <div className="comment-item-reply">
        <img
          className="user-img"
          src={`${url}${comment.writer.profileImage.saveName}`}
          onClick={() => {
            toProfile(comment.writer.id);
          }}
        />
        <div className="comment-container">
          <div className="comment-header">
            <div>
              <span className="comment-header-left">{comment.writer.nickname}</span>
              <span className="comment-header-left">{RegBefore}</span>
            </div>
            {!comment.isApprove && comment.isMine && !comment.isCommented
              ? commentDeleteBtn(comment.id)
              : ""}
          </div>
          <div className="comment-main">{comment.content}</div>
        </div>
      </div>
    );
    return result;
  });

  
  return commentsList;
};

export default SubCommentComponent;
