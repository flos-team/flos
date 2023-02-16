import React from 'react'
import styles from './AdminPage.module.css'

function AdminPage() {

  return (
    <>
      <div className={styles.searchcontainer}>
        <select name="pickbook">
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

      <div className={styles.tablecontainerHeader}>
        <div className={styles.pk}>pk</div>
        <div className={styles.reporter}>신고자</div>
        <div className={styles.defendant}>피신고자</div>
        <div className={styles.detail}>신고내용</div>
        <div className={styles.result}>처리결과</div>
        <div className={styles.reportTime}>신고Time</div>
        <div className={styles.resultTime}>처리Time</div>
      </div>
      <div className={styles.tablecontainer}>
        <div className={styles.pk}>1</div>
        <div className={styles.reporter}>임범규</div>
        <div className={styles.defendant}>김성태</div>
        <div className={styles.detail}>이 사람 이상해요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ1ㅠㅠㅠㅠㅠㅠㅠ2ㅠㅠㅠㅠ3ㅠㅠㅠㅠ4ㅠㅠㅠ3ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠnnnnnnnnnnnnnnnnnnn</div>
        <div className={styles.result}>7일 정지</div>
        <div className={styles.reportTime}>2022/10/10</div>
        <div className={styles.resultTime}>2022/11/11</div>
      </div>      
      <div className={styles.tablecontainer}>
        <div className={styles.pk}>2</div>
        <div className={styles.reporter}>임범2규</div>
        <div className={styles.defendant}>김성2태</div>
        <div className={styles.detail}>이 사람2 이상해요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ1ㅠㅠㅠㅠㅠㅠㅠ2ㅠㅠㅠㅠ3ㅠㅠㅠㅠ4ㅠㅠㅠ3ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠnnnnnnnnnnnnnnnnnnn</div>
        <div className={styles.result}>7일 정지2</div>
        <div className={styles.reportTime}>2022/10/10</div>
        <div className={styles.resultTime}>2022/11/11</div>
      </div>
    </>
  )
}

export default AdminPage;
