import React, { useState, useEffect, useCallback } from "react";
import {getPostList, getPostListByWeather, getPostListByComment} from "../../api/PostAPI"

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
  const [posts, setPosts] = useState([]);
  const [filtering, setFiltering] = useState(false); // 필터링 아이콘 누른 상태 확인
  const [filterStandard, setFilterStandard] = useState(1); // 정렬 기준 (1: 최신순 2: 댓글 많은 순 3: 맑음 4: 흐림 5: 비)


  useEffect(() => {
    getPostList().then((response) => {
      setPosts(response.postList);
    });
    getPostListByComment(0).then((res)=>{
      // console.dir(res.postList);
      
    });
}, []);


  useEffect(() => {
    onFilter();
  }, [filterStandard])


  // 필터
  const changeFilterStandard = (num) => {
    setFilterStandard(num)
  }

  const onFilter = () => {
    if (filterStandard === 1) {
      getPostList().then((response) => {
        setPosts(response.postList) // 작동 됨
        console.log(response.postList)
        console.log(filterStandard)
      }
    )} else if (filterStandard === 2) {
      getPostListByComment().then((response) => {
        setPosts(response.postList) // 작동 됨
        console.log(response.postList)
        console.log(filterStandard)
      })
    } else if (filterStandard === 3) {
      getPostListByWeather(0, 'SUNNY').then((response) => {
        setPosts(response);
        console.log(filterStandard)
    }
    )} else if (filterStandard === 4) {
      getPostListByWeather(0, 'CLOUDY').then((response) => {
        setPosts(response);
        console.log(filterStandard)
      }
    )} else if (filterStandard === 5) {
      getPostListByWeather(0, 'RAINY').then((response) => {
        setPosts(response);
        console.log(filterStandard)
    }
    )}
  }

  const postList = posts.map((EachPost) => <PostItem post={EachPost}></PostItem>);
  const noPost = <div>게시물이 없습니다.</div>;

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
                onClick={() => {
                  changeFilterStandard(1);
                }}
              >
                최신순
              </span>
              <span
                className={
                  filterStandard === 2
                    ? styles.filtertextstandard
                    : styles.filtertext
                }
                onClick={() => {
                  changeFilterStandard(2);
                }}
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
                onClick={() => {
                  changeFilterStandard(3);
                }}
              ></img>
              <img
                src={CloudyIcon}
                alt=""
                className={
                  filterStandard === 4
                    ? styles.filterweatherstandard
                    : styles.filterweathericon
                }
                onClick={() => {
                  changeFilterStandard(4);
                }}
              ></img>
              <img
                src={RainyIcon}
                alt=""
                className={
                  filterStandard === 5
                    ? styles.filterweatherstandard
                    : styles.filterweathericon
                }
                onClick={() => {
                  changeFilterStandard(5);
                }}
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
