import axios from "axios";

const doLogin = () => {
  const loginInfo = {
    email: "onehee@ssafy.com",
    password: "dnjsgml1234",
  };
  axios
    .post("/member/login", loginInfo)
    .then((response) => {
      const accessToken = response.data.atk;
      // console.log(accessToken)
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
      // console.dir(axios.defaults)
    })
    .then(() => {
      axios
        .get("/member/info")
        .then((response) => {
          console.dir(response);
          // navigate("/main");
        })
        .catch((error) => {
          console.dir("error : " + error);
          console.dir(axios.defaults);
        });
    })
    .catch((error) => {
      console.dir(error);
      console.dir(axios.defaults);
    });
};

const getPost = async (pgNum = 1) => {
  let url = `/post/list?page=${pgNum}`;
  let data = null;
  await axios
    .get(url)
    .then((response) => {
      data = [...response.data.content];
    })
    .then(() => {});
  return data;
};
export { doLogin, getPost };
