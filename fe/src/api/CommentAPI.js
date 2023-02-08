import axios from "axios";
/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
// axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";
axios.defaults.baseURL = "https://i8b210.p.ssafy.io";
axios.defaults.withCredentials = true;

/**
 * getCommentList : 게시글의 댓글 리스트
 * @param {id} page 게시물 아이디
 * @returns
 */
const getCommentList = async (id, page = 2) => {
  // let url = `/post/list?page=${page}`;
  let url = `/api/comment/list/post/${id}`;
  let commentList = [];
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        commentList = [...response.data.content];
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return commentList;
};
/**
 * 해당 게시글에 댓글을 추가 각 인자 머임?
 * @param {*} content
 * @param {*} parentId :
 * @param {*} postId
 * @param {*} primitiveId
 * @returns
 */
const createComment = async (
  content,
  postId,
  parentId = 0,
  primitiveId = 0
) => {
  let url = `/api/comment/`;
  let newComment = {
    content: content,
    parentId: parentId,
    postId: postId,
    primitiveId: primitiveId,
  };
  console.log(newComment);
  let isCreated = false;
  await axios
    .post(url, newComment)
    .then((response) => {
      if (response.status === 200) {
        console.dir(response);
        isCreated = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return isCreated;
};

const commentApprove = async (commentId) => {
  let url = `/api/comment/approve`;
  console.log(commentId);
  const data = {
    id: commentId,
  };
  await axios
    .post(url, data)
    .then((response) => {
      if (response.status === 200) {
        console.dir(response);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const modifyComment = async (content, id, postId) => {
  const url = `/api/comment`;
  const data = {
    content: content,
    id: id,
    postId: postId,
  };
  await axios
    .put(url, data)
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteComment = async (id) => {
  const url = `/api/comment/${id}`;
  axios
    .delete(url)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getCommentList, createComment, commentApprove, modifyComment, deleteComment };
