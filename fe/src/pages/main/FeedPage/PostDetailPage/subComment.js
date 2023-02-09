import { Link } from "react-router-dom";

import { getTimeDiffText } from "../../../../api/DateModule";

import dayjs from "dayjs";

import {
  getPriComment,
  createComment,
  deleteComment,
} from "../../../../api/CommentAPI";

const url = "https://i8b210.p.ssafy.io/api/file/";

// 자신의 댓글 삭제를 누르면 삭제하는 함수
const commentDeleteBtn = (commentId) => {
  return (
    <div>
      <span
        className="comment-header-right"
        onClick={() => deleteComment(commentId)}
      >
        삭제
      </span>
    </div>
  );
};

// 댓글을 더 보는 함수
const seeMore = (id) => {

  const subComment = [];
  getPriComment(id).then((response) => {
    subComment.push(response);
  });

  console.log(subComment);

  const subCommentList = subComment.map((e) => {
    let commentKey = e.key;
    let commentDay = dayjs(e.createdAt, "YYYY-MM-DD HH:mm:ss");
    let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(commentDay, curDay);

    const result1 =  (
      <div className="comment-item2">
        <Link to={`/other-profile-page/${e.id}`}>
          <img
            className="user-img"
            src={`${url}${e.writer.profileImage.saveName}`}
          />
        </Link>
        <div className="comment-container">
          <div className="comment-header">
            <div>
              <span className="comment-header-left">{e.writer.nickname}</span>
              <span className="comment-header-left">{RegBefore}</span>
            </div>
            {!e.isApprove && e.isMine && !e.isCommented
              ? commentDeleteBtn(e.id)
              : ""}
          </div>
          <div className="comment-main">{e.content}</div>
          <div className="comment-addComment">댓글달기</div>
          {e.isCommented ? (
            <div className="comment-addComment" onClick={() => seeMore(e.id)}>
              더보기
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );

    const result = (
        <div>123123123</div>
    )
    return result;
    // return <div>123</div>;
    // document.getElementById(`{test${id}}`).innerHTML = subCommentList;
  });
//   console.dir(subCommentList)
//   return result
};

export { seeMore };
