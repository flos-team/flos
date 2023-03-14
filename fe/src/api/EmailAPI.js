import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 * sendResetPasswordMail : 사용자 비밀번호 재설정 이메일 전송
 * @param {string} email 사용자 이메일
 * @param {string} code 인증 코드
 * @returns
 */
const sendResetPasswordMail = async (email, code) => {
  let url = `/api/email/reset-password?code=${code}&email=${email}`;
  let value = null;
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("비밀번호 초기화 메일 전송 중 오류 발생");
    });
  return value;
};

/**
 * sendSignUpEmail : 회원 가입용 인증메일 보내기
 * @param {string} email 사용자 이메일
 * @param {string} code 인증 코드
 * @returns
 */
const sendSignUpEmail = async (email, code) => {
  let url = `/api/email/sign-up?code=${code}&email=${email}`;
  let value = null;
  await axios
    .get(url)
    .then((response) => {
      value = response;
    })
    .catch((err) => {
      console.log("회원가입 이메일 전송 중 오류 발생");
    });
  return value;
};

/////* POST *///////////////////
/**
 * verifyResetPasswordCode : 비밀번호 초기화 시 인증 코드 확인? 메서드
 * @param {string} email 사용자 이메일
 * @param {string} code 인증 코드
 * @returns
 */
const verifyResetPasswordCode = async (email, code) => {
  let url = `/api/email/reset-password`;
  let data = {
    code,
    email,
  };
  await axios
    .post(url, data)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("비밀번호 초기화 확인 이메일 요청중 에러 발생");
    });
};

/**
 * verifySignUpCode : 회원가입 시 인증 코드 확인용 메서드
 * @param {string} code 인증 코드
 * @param {string} email 사용자 이메일
 * @returns
 */
const verifySignUpCode = async (email, code) => {
  let url = `/api/email/sign-up`;
  let data = {
    code,
    email,
  };
  await axios
    .post(url, data)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("회원가입 인증용 이메일 확인 중 오류 발생");
    });
};

const ComplaintReceived = async(message, sender) =>{
  let url = `/api/email/report`
  console.log(message)
  let data = {
    message,
    sender
  }
  await axios.post(url, data).then(response => {
    console.log(response)
  })
}

export { sendResetPasswordMail, sendSignUpEmail, verifyResetPasswordCode, verifySignUpCode, ComplaintReceived };
