const HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;
const THOUSAND = 1000;

export const formatLikeCount = (count) => {
  if (count >= HUNDRED_MILLION) {
    return `${(count / HUNDRED_MILLION).toFixed(1)}만`;
  } else if (count >= TEN_THOUSAND) {
    return `${(count / TEN_THOUSAND).toFixed(1)}만`;
  } else if (count >= THOUSAND) {
    return `${(count / THOUSAND).toFixed(1)}천`;
  } else return `${count}`;
};
