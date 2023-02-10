import React, { useState, useEffect } from "react";
import { getPostList, getPostListByWeather, getPostListByComment, getPostListByNickname, getPostListByTagName } from "../../api/PostAPI"

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
  const [searchInput, setSearchInput] = useState('') // 검색 : # 포함 -> 태그검색, # 미포함 -> 사용자검색
  const [isSearching, setIsSearching] = useState(false)
  
  // 기본 렌더링 = 최신순
  useEffect(() => {
    getPostList().then((response) => {
      setPosts(response.postList);
      // setIsSearching(false)
    })
    },[]);

  // 필터기준이 바뀌면 onFilter() 함수 실행
  useEffect(() => {
    onFilter();
  }, [filterStandard])


  // 필터를 위한 상태관리
  const changeFilterStandard = (num) => {
    setFilterStandard(num)
    setIsSearching(false)
  }
  // 상태관리에 따른 필터
  const onFilter = () => {
    if (filterStandard === 1) {
      getPostList().then((response) => {
        setPosts(response.postList)
        setIsSearching(false)
      }
    )} else if (filterStandard === 2) {
      getPostListByComment().then((response) => {
        setPosts(response.content)
        setIsSearching(false)
      })
    } else if (filterStandard === 3) {
      getPostListByWeather('SUNNY').then((response) => {
        setPosts(response.content);
        setIsSearching(false)
    }
    )} else if (filterStandard === 4) {
      getPostListByWeather('CLOUDY').then((response) => {
        setPosts(response.content);
        setIsSearching(false)
      }
    )} else if (filterStandard === 5) {
      getPostListByWeather('RAINY').then((response) => {
        setPosts(response.content);
        setIsSearching(false)
    }
    )}
  }

  const postList = posts.map((EachPost) => <PostItem post={EachPost}></PostItem>);

  const clickFilterIcon = () => {
      setFiltering((pre) => !pre)
  };

  // 검색기능
  // 입력값이 변경할 때마다 발동하는 함수
  const searchValue = (e) => {
    // 태그 검색
    if ((e.target.value.substr(0, 1) === '#') && e.target.value.length >= 2) {
      getPostListByTagName(e.target.value.substr(1))
        .then((response) => {
          setIsSearching(true)
          setSearchInput(e.target.value)
          setPosts(response.content)
        })
      }
      // 사용자 검색
      else if (e.target.value.substr(0, 1) !== '#' && e.target.value.length >= 2) {
        getPostListByNickname(e.target.value)
          .then((response) => {
            if (response.content) {
              setIsSearching(true)
              setSearchInput(e.target.value)
              setPosts(response.content)
            } else {
              setSearchInput(e.target.value)
              setIsSearching(true)
              setPosts([])
            }
          })
        }
        // 검색하다가 비웠을 때
        else if (e.target.value.length === 0){
        getPostList()
          .then((response) => {
          setPosts(response.postList)
          setIsSearching(false)
        })
      }
    }

  const noPost = <div>게시물이 없습니다.</div>
  const searchResult =
    <div>
      <div>"{searchInput}"에 대한 검색 결과입니다.</div>
      <div>{postList}</div>
    </div>
  const noSearchResult = <div>"{searchInput}"에 대한 검색 결과가 없습니다.</div>

  // 태그 검색기능
  // 입력값이 변경할 때마다 발동하는 함수



  return (
    <div className={styles.feedRoot}>
      <HeaderComponent pageName={"둘러보기"} optType={0}></HeaderComponent>
      <div className={styles.globalroot}>
        <div className={styles.searchdiv}>
          <img src={SearchIcon} className={styles.searchicon} alt=""></img>
          <input className={styles.searchbar} alt="" onChange={searchValue}></input>
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
        <div className={`${styles.main} ${styles.scroll}`} id = "postMain">
        {isSearching ?
          posts.length === 0 ? noSearchResult : searchResult
        : posts.length === 0 ? noPost : postList}
        </div>
      </div>

      <MoveToTopToggle></MoveToTopToggle>
    </div>
  );
}

export default Global;
