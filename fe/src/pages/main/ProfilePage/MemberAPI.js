import axios from "axios";

/**
 * 본 API는 FLOS 서비스의 사용자(member) 정보를 주고 받는 것에 관련한
 * 백엔드 서버와의 통신용 API 입니다.
 */

const MemberAPI = {
  /* getMethod */
  // 중복 이메일 체크 메서드
  getCheckEmail: async (pgNum = 1) => {
    let url = `/post/list?page=${pgNum}`;
    let data = null;
    await axios
      .get(url)
      .then((response) => {
        data = [...response.data.content];
      })
      .then(() => {});
    return data;
  },
};
