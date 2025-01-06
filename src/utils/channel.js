const HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;
const THOUSAND = 1000;

export const formatSubscriberCount = (count) => {
  const formatNumber = (number) => {
    return number
      .toString()
      .replace(/(\.\d*?)0+$/g, "$1")
      .replace(/\.$/, "");
  };

  if (count >= HUNDRED_MILLION) {
    return `${formatNumber(count / HUNDRED_MILLION)}억명`;
  } else if (count >= TEN_THOUSAND) {
    return `${formatNumber(count / TEN_THOUSAND)}만명`;
  } else if (count >= THOUSAND) {
    return `${formatNumber(count / THOUSAND)}천명`;
  } else return `${count}명`;
};

export const formatDescriptionText = (description) => {
  if (!description || !description.includes("\n")) {
    return [description];
  }

  const MAX_LINE_LENGTH = 70;
  const lines = description.split("\n").filter((line) => line.trim() !== "");

  return lines
    .reduce((formatted, currentLine) => {
      const lastLine = formatted[formatted.length - 1] || "";
      if (currentLine.length > MAX_LINE_LENGTH) {
        if (lastLine) {
          return [...formatted, currentLine];
        }
        return [...formatted, currentLine];
      }

      if (
        lastLine &&
        (lastLine + " " + currentLine).length <= MAX_LINE_LENGTH
      ) {
        return [...formatted.slice(0, -1), `${lastLine} ${currentLine}`];
      }

      return [...formatted, currentLine];
    }, [])
    .slice(0, 2);
};
