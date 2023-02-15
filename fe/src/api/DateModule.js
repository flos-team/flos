/**
 * getTimeDiffText : 두 날짜 사이의 시간차이를 계산하여 텍스트로 돌려주는 메서드
 * @param {dayjs} postDay
 * @param {dayjs} curDay
 * @returns
 */
const getTimeDiffText = (postDay, curDay) => {
  const milliSeconds = curDay.diff(postDay);
  //console.log(`post : ${postDay} / cur : ${curDay}`);
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

export { getTimeDiffText };
