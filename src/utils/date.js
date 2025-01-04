const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const formatISO = (iso) => {
  if (!iso) return "";

  const now = new Date();
  const date = new Date(iso);
  const diff = now.getTime() - date.getTime();

  if (diff < MINUTE) {
    return "방금 전";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < WEEK) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / WEEK)}주 전`;
  } else if (diff < YEAR) {
    return `${Math.floor(diff / MONTH)}달 전`;
  } else {
    return `${Math.floor(diff / YEAR)}년 전`;
  }
};
