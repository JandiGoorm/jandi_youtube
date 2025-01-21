const HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;
const THOUSAND = 1000;

export const formatHitCount = (count) => {
  const formatNumber = (number) => {
    return number
    .toFixed(1)
      .replace(/(\.\d*?)0+$/g, "$1")
      .replace(/\.$/, "");
  };

  if (count >= HUNDRED_MILLION) {
    return `${formatNumber(count / HUNDRED_MILLION)}억 회`;
  } else if (count >= TEN_THOUSAND) {
    return `${formatNumber(count / TEN_THOUSAND)}만 회`;
  } else if (count >= THOUSAND) {
    return `${formatNumber(count / THOUSAND)}천 회`;
  } else return `${count} 회`;
};
