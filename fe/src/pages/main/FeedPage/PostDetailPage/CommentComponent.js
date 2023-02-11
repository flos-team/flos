import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { getTimeDiffText } from "../../../../api/DateModule";

import dayjs from "dayjs";
import sunnyActivate from "../../../../assets/GlobalAsset/sunny-activate.png";
import sunnyDeActivate from "../../../../assets/GlobalAsset/sunny-deactivate.png";
import {
  getCommentList,
  getPriComment,
  commentApprove,
  deleteComment,
  createReply,
} from "../../../../api/CommentAPI";

import "./PostDetailPage.css";

const url = "https://i8b210.p.ssafy.io/api/file/";

const CommentComponent = ({ comment, postWriterId }) => {
  // console.log(comment);
  const user = useSelector((state) => state.user.userData);

  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [reply, setReply] = useState([]);
  const [replyOnChange, setReplyOnChange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getPriComment(comment.id).then((response) => {
      // console.log(response);
      setReply(response);
    });
  }, [replyOnChange]);

  const handleCommentInputValue = (e) => {
    setInputValue(e.target.value);
    // setReplyOnChange(!replyOnChange);
  };

  // 자신의 댓글 삭제를 누르면 삭제하는 함수
  const commentDeleteBtn = (commentId) => {
    return (
      <div>
        <span
          className="comment-header-right"
          onClick={() => {
            deleteComment(commentId).then(() => {
              setReplyOnChange(!replyOnChange);
            });
          }}
        >
          삭제
        </span>
      </div>
    );
  };

  // 타인의 프로필로 이동하는 함수
  const toProfile = (userId) => {
    if (user.id !== userId) {
      navigate(`/other-profile-page/${userId}`);
    }
  };

  const addComment = (
    <div
      className="comment-addComment"
      onClick={() => {
        // 댓글 달기 누르면 입력 폼이 나오도록
        setInputFocus(true);
      }}
    >
      댓글달기
    </div>
  );
  let replyList = "";
  if (reply) {
    replyList = reply.map((comment) => {
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
                <span className="comment-header-left">
                  {comment.writer.nickname}
                </span>
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
  }

  const replyInput = (
    <div>
      <input
        className="comment-input"
        autoFocus
        value={inputValue}
        onChange={handleCommentInputValue}
        onBlur={() => {
          setInputFocus(false);
          if (inputValue) {
            // 입력된 값이 있으면
            createReply(
              inputValue,
              comment.postId,
              comment.id,
              comment.id
            ).then((response) => {
              console.log(response);
              setReply(response);
              setReplyOnChange(!replyOnChange);
            });
          }
          setInputValue("");
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter" && inputValue) {
            createReply(
              inputValue,
              comment.postId,
              comment.id,
              comment.id
            ).then(() => {
              setReplyOnChange(!replyOnChange);
              setInputValue("");
            });
          }
        }}
      ></input>
      <button>제출</button>
    </div>
  );

  let commentDay = dayjs(comment.createdAt, "YYYY-MM-DD HH:mm:ss");
  let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
  let RegBefore = getTimeDiffText(commentDay, curDay);

  const result = (
    <>
      <div className="comment-item">
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
              <span className="comment-header-left">
                {comment.writer.nickname}
              </span>
              <span className="comment-header-left">{RegBefore}</span>
            </div>
            {!comment.isApprove && comment.isMine && !comment.isCommented
              ? commentDeleteBtn(comment.id)
              : ""}
          </div>
          <div className="comment-main">{comment.content}</div>
          {inputFocus ? replyInput : addComment}
        </div>
        {/* 포스트 작성자거나, 댓글이 채택되었을 때만 표시한다. */}
        {user.id === postWriterId || comment.isApprove ? (
          <img
            className="check-btn"
            id="ApproveIcon"
            onClick={() => {
              commentApprove(comment.id);
            }}
            src={comment.isApprove ? sunnyActivate : sunnyDeActivate}
          />
        ) : (
          ""
        )}

        {/* <SubCommentComponent parentId={comment.id}></SubCommentComponent> */}
      </div>
      {replyList ? replyList : ""}
    </>
  );

  return result;
};

export default CommentComponent;
