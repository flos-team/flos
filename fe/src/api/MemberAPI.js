import axios from "axios";

/**
 * @author 1-hee
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 * getCheckEmail : 사용자 이메일 중복 확인 메서드
 * @param {string} email 사용자 이메일
 * @returns {Promise} A Promise object containing a boolean value
 */
const getCheckEmail = async (email) => {
  let url = `/member/check/email?email=${email}`;
  let value = null;
  await axios
    .get(url)
    .then((response) => {
      value = response.data;
    })
    .catch((err) => {
      console.log("이메일 중복 검사 중 에러 발생");
    });
  return value;
};

/**
 * getCheckNickname : 사용자 닉네임 중복 체크 메서드
 * @param {string} nickname 사용자 이메일
 * @returns {Promise} A Promise object containing a boolean value
 */
const getCheckNickname = async (nickname) => {
  let url = `/member/check/nickname?nickname=${nickname}`;
  let value = null;
  await axios
    .get(url)
    .then((response) => {
      value = response.data;
    })
    .catch((err) => {
      console.log("닉네임 중복 검사 중 에러 발생");
    });
  return value;
};

/**
 * getMemberInfo : 사용자 정보 요청 메서드
 * @returns {Promise} A Promise object containing a UserInfoObject
 */
const getMemberInfo = async () => {
  let url = "/member/info";
  let userObject = {};
  await axios
    .get(url)
    .then((response) => (userObject = { ...response.data }))
    .catch((err) => {
      console.log("회원정보 가져오는 중 에러 발생");
    });
  return userObject;
};

/**
 * logout : 사용자 로그아웃 메서드
 * 로그아웃시 헤더에 담긴 엑세스 토큰이 만료됩니다.
 * @returns {Promise} A Promise object containing a boolean value
 */
// TODO....
const logout = async () => {
  let url = "/member/logout";
  let isLogout = false;
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("로그아웃 중 오류 발생");
    });
  return isLogout;
};

/**
 * sendCodeToEmail : 사용자 비밀번호 코드 요청 메서드
 * @param {string} email 사용자 이메일
 * @returns {Promise} A Promise object containing a boolean value
 */
// AFTER : 회원가입 페이지 등에서 사용한 후에 데이터 처리되면 콘솔 찍히는거 수정해야함.
const sendCodeToEmail = async (email) => {
  let url = `/email/reset-password?email=${email}`;
  let isComplete = false;
  await axios
    .get(url)
    .then((response) => {
      //console.dir(response);
      if (response.status === 204) {
        console.log("정상 전송");
        alert("이메일이 전송되었습니다.");
        isComplete = true;
      }
    })
    .catch((error) => {
      //console.dir(error);
      alert("회원 정보가 존재하지 않습니다.");
    });
  return isComplete;
};

/////////* POST *//////////////////
/**
 * doLogin : 로그인 메서드
 * 테스트용 계정
 *  email: "onehee@ssafy.com",
    password: "dnjsgml1234",
 * @param {string} email 
 * @param {string} password 
 */
const doLogin = async (email, password) => {
  let loginInfo = {
    email,
    password,
  };
  await axios
    .post("/member/login", loginInfo)
    .then((response) => {
      console.dir(response);
      if (response.status === 200) console.log("로그인 성공");
      const accessToken = response.data.atk;
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      // console.dir(axios.defaults)
    })
    .catch((err) => {
      console.log("로그인 중 에러가 발생하였습니다.");
    });
};

/**
 * signUpUser : 자체 회원가입 메서드
 * @param {string} code
 * @param {string} email
 * @param {string} nickname
 * @param {string} password
 */
const signUpUser = async (code, email, nickname, password) => {
  let url = "/member/sign-up";
  let newUser = {
    code,
    email,
    nickname,
    password,
  };
  await axios
    .post(url, newUser)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("회원가입 중 에러가 발생하였습니다.");
    });
};

/////////* PUT *//////////////////
/**
 * modifyUserInfo : 회원정보 수정 메서드
 * @param {string} nickname 사용자 이름
 * @param {ImageBitmap} profileImage 이미지 비트맵 파일
 * @returns {Promise} A Promise object containing a boolean value
 */
// TODO....
// 스웨거 보면서 파라미터 등을 어떻게 보내줄지?
// Stringify 안해도 되는지? JSON으로 보내야 할텐데 어케할지?
const modifyUserInfo = async (nickname, profileImage) => {
  let url = "/member/info";
  let isUpdated = false;
  await axios
    .put(url, {})
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("회원정보 수정 중 오류 발생");
    });
  return isUpdated;
};

/**
 * resetUserPassword : 비밀번호 재설정 메서드
 * 비밀번호를 재설정합니다. 승인된 이메일 인증번호를 함께 보내야 합니다.
 * @param {string} code 이메일로 발송된 인증번호
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 비밀번호
 * @returns {Promise} A Promise object containing a boolean value
 */
// TODO....
const resetUserPassword = async (code, email, password) => {
  let url = "/member/reset-password";
  let modifiedUserInfo = {
    code,
    email,
    password,
  };
  await axios
    .put(url, modifiedUserInfo)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("회원 비밀번호 수정중 오류 발생");
    });
};

/////////* DELETE *//////////////////
/**
 * withdrawalUser : 회원 탈퇴 메서드
 * 회원을 비활성화 상태로 만듭니다.
 */
// TODO...
// 성태형한테 로직 물어보기
const withdrawalUser = async () => {
  let url = "/member/quit";
  await axios
    .delete(url)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("로그아웃 중 오류 발생");
    });
};

/**
 * 본 API는 FLOS 서비스의 사용자(member) 정보를 주고 받는 것에 관련한
 * 백엔드 서버와의 통신용 API 입니다.
 * | GET >>
 * @property {functional} getCheckEmail 사용자 이메일 중복 확인 메서드
 * @property {functional} getCheckNickname 사용자 닉네임 중복 체크 메서드
 * @property {functional} getMemberInfo 사용자 정보 요청 메서드
 * @property {functional} logout 사용자 로그아웃 메서드
 * @property {functional} sendCodeToEmail 사용자 비밀번호 코드 요청 메서드
 * | POST >>
 * @property {functional} doLogin 로그인 메서드
 * @property {functional} signUpUser 자체 회원가입 메서드
 * | PUT >>
 * @property {functional} modifyUserInfo 회원정보 수정 메서드
 * @property {functional} resetUserPassword 비밀번호 재설정 메서드
 * | DELETE >>
 * @property {functional} withdrawalUser 회원 탈퇴 메서드
 */
const MemberAPI = {
  getCheckEmail,
  getCheckNickname,
  getMemberInfo,
  logout,
  sendCodeToEmail,
  doLogin,
  signUpUser,
  modifyUserInfo,
  resetUserPassword,
  withdrawalUser,
};

export {
  getCheckEmail,
  getCheckNickname,
  getMemberInfo,
  logout,
  sendCodeToEmail,
  doLogin,
  signUpUser,
  modifyUserInfo,
  resetUserPassword,
  withdrawalUser,
};

export default MemberAPI;
