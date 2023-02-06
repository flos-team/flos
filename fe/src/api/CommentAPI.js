import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";

/**
 * getCommentList : 게시글의 댓글 리스트
 * @param {id} page 게시물 아이디
 * @returns
 */
const getCommentList = async (id) => {
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
 * @param {*} parentId
 * @param {*} postId
 * @param {*} primitiveId
 * @returns
 */
const createCommentById = async (content, parentId, postId, primitiveId) => {
  let url = `/api/comment/create`;
  let newComment = {
    content,
    parentId,
    postId,
    primitiveId,
  };
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

export { getCommentList };
