import React, { useState, useEffect } from "react";
import axios from "axios";

import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../components/PostItem/PostItem";
import MoveToTopToggle from "../../components/MoveToTop/MoveToTopToggle.js";

import SearchIcon from "../../assets/GlobalAsset/Search.png";
import FilterIcon from "../../assets/GlobalAsset/Filter.png";
import SunnyIcon from "../../assets/GlobalAsset/sunny.png";
import CloudyIcon from "../../assets/GlobalAsset/cloudy.png";
import RainyIcon from "../../assets/GlobalAsset/rainy.png";

import styles from "./GlobalPage.module.css";

function Global() {
  axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";
  // axios.defaults.baseURL = "http://localhost:8080/";
  axios.defaults.withCredentials = false;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/post/list?page=1")
      .then((response) => {
        setPosts(response.data.content);
      })
      .catch((error) => {
        console.log("error : " + error);
        console.dir(axios.defaults);
      });
  }, []);

  const postList = posts.map(({ id, writer, weather, regDate, content }) => (
    <PostItem
      key={id}
      postId={id}
      writer={writer}
      weather={weather}
      regDate={regDate}
      content={content}
    ></PostItem>
  ));
  const noPost = <div>게시물이 없습니다.</div>;

  const [filtering, setFiltering] = useState(false); // 필터링 아이콘 누른 상태 확인
  const [filterStandard, setFilterStandard] = useState(1); // 정렬 기준 (1: 최신순 2: 댓글 많은 순 3: 맑음 4: 흐림 5: 비)

  const clickFilterIcon = () => {
    if (filtering === false) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
  };

  return (
    <div className={styles.feedRoot}>
      <HeaderComponent pageName={"둘러보기"} optType={0}></HeaderComponent>
      <div className={styles.globalroot}>
        <div className={styles.searchdiv}>
          <img src={SearchIcon} className={styles.searchicon} alt=""></img>
          <input className={styles.searchbar} alt=""></input>
          <img
            src={FilterIcon}
            className={styles.filtericon}
            alt=""
            onClick={clickFilterIcon}
          ></img>
        </div>
        {/* 필터 아이콘 누른 상태 */}
        {filtering ? (
          <div className={styles.filterselectbox}>
            <div className={styles.filtertextdiv}>
              <span
                className={
                  filterStandard === 1
                    ? styles.filtertextstandard
                    : styles.filtertext
                }
                onClick={() => setFilterStandard(1)}
              >
                최신순
              </span>
              <span
                className={
                  filterStandard === 2
                    ? styles.filtertextstandard
                    : styles.filtertext
                }
                onClick={() => setFilterStandard(2)}
              >
                댓글 많은 순
              </span>
            </div>
            <div className={styles.filtertextdiv}>
              <img
                src={SunnyIcon}
                alt=""
                className={
                  filterStandard === 3
                    ? styles.filterweatherstandard
                    : styles.filterweathericon
                }
                onClick={() => setFilterStandard(3)}
              ></img>
              <img
                src={CloudyIcon}
                alt=""
                className={
                  filterStandard === 4
                    ? styles.filterweatherstandard
                    : styles.filterweathericon
                }
                onClick={() => setFilterStandard(4)}
              ></img>
              <img
                src={RainyIcon}
                alt=""
                className={
                  filterStandard === 5
                    ? styles.filterweatherstandard
                    : styles.filterweathericon
                }
                onClick={() => setFilterStandard(5)}
              ></img>
            </div>
          </div>
        ) : null}
        <div className={styles.main}>
          {posts.length === 0 ? noPost : postList}
        </div>
      </div>

      <MoveToTopToggle></MoveToTopToggle>
    </div>
  );
}

export default Global;
