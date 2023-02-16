import React from "react";
import styles from "./AdminPage.module.css";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMaliciousList, postHandleReport } from "../../../api/ReportAPI";

function AdminPage() {
  const [lists, setLists] = useState([]);
  const [listType, setListType] = useState(1);

  const [conclusion, setConclusion] = useState("BAN_1DAY");

  useEffect(() => {
    getMaliciousList().then((response) => {
      console.log(response);
      setLists(response);
    });
  }, []);

  useEffect(() => {
    console.log(conclusion);
  }, [conclusion]);

  useEffect(() => {
    console.log(listType);
  }, [listType]);

  const conclusionSelect = (e) => {
    setConclusion(e.target.value);
  };
  const sendReport = (id) => {
    console.log(conclusion);
    postHandleReport(conclusion, id).then(() => {
      // console.log(response);
    });
  };

  const viewList = lists.map((key) => {
    const date = dayjs(key.createdAt, "YYYY.MM.DD");
    return (
      <div className={styles.tablecontainer}>
        <div className={styles.pk}>{key.id}</div>

        <div className={styles.reporter}>{key.reporter.nickname}</div>
        <div className={styles.defendant}>{key.target.nickname}</div>
        <div className={styles.detail}>{key.description}</div>
        <div className={styles.result}>
          {key.conclusion ? key.conclusion : "1달 정지"}
        </div>
        <div className={styles.reportTime}>{date.format("YY/MM/DD")}</div>
        <div className={styles.resultTime}>{key.conclusion ? "O" : "X"}</div>
        <div className={styles.confirmDiv}>
          <select name="pickbook" onChange={(e) => conclusionSelect(e)}>
            <option value="BAN_1DAY">1일 정지</option>
            <option value="BAN_7DAY">7일 정지</option>
            <option value="BAN_30DAY ">30일 정지</option>
            <option value="BAN_FOREVER">영구 정지</option>
            <option value="REJECT">철회</option>
          </select>
          <button className={styles.confirm} onClick={() => sendReport(key.id)}>
            처리하기
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
    <h1>신고 관리</h1>
      <div className={styles.wrap}>
        <div className={styles.footer}>
          <Link to="memberManager">
            <div>회원 관리</div>
          </Link>
          <Link to="/admin">
            <div>신고 관리</div>
          </Link>
          <Link to="/main">
            <div>서비스로 이동</div>
          </Link>
        </div>
      </div>

      <div className={styles.searchcontainer}>
        <select
          name="pickbook"
          onChange={(e) => {
            setListType(e.target.value);
          }}
        >
          <option value="1">전체 보기</option>
          <option value="2">신고자 이름으로 조회</option>
          <option value="3">피신고자 이름으로 조회</option>
          <option value="4">미처리 신고 건 조회</option>
          <option value="5">처리완료 신고 건 조회</option>
        </select>
        <form>
          <input type="text" id="searchInput" name="q" />
          <button type="submit">검색</button>
        </form>
      </div>
      <div className={styles.tablecontainer}>
        <div className={styles.pkTitle}>pk</div>
        <div className={styles.reporterTitle}>신고자</div>
        <div className={styles.defendant}>피신고자</div>
        <div className={styles.detailTitle}>신고 내용</div>
        <div className={styles.resultTitle}>&nbsp;&nbsp;&nbsp;처리 결과</div>
        <div className={styles.reportTime}>접수 시간</div>
        <div className={styles.resultTime}>처리 여부</div>
        <div> 형량</div>
        <div className={styles.confirmTitle}>접수</div>
      </div>
      {viewList}
    </>
  );
}

export default AdminPage;
