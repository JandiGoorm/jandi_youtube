export const formatDuration = (duration) => {
  if (!duration) return;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return;
  const hours = match[1] ? String(match[1]).padStart(2, "0") : "00";
  const minutes = match[2] ? String(match[2]).padStart(2, "0") : "00";
  const seconds = match[3] ? String(match[3]).padStart(2, "0") : "00";

  if (hours != "00") {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

//1분 1초 이하라면 shorts로 판단
export const isShortVideo = (duration) => {
  try {
    const formatted = formatDuration(duration);
    if (!formatted) return;
    const parts = formatted.split(":").map(Number);

    let total = 0;

    if (parts.length === 2) {
      total = parts[0] * 60 + parts[1];
    } else {
      total = parts[0] * 3600 + parts[1] * 60 + (parts[2] ?? 0);
    }

    return total <= 239;
  } catch (e) {
    console.log("isShortVideo 에러", e);
  }
};
