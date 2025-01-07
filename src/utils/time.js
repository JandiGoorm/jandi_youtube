export const formatDuration = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = match[1] ? String(match[1]).padStart(2, '0') : "00";
  const minutes = match[2] ? String(match[2]).padStart(2, '0') : "00";
  const seconds = match[3] ? String(match[3]).padStart(2, '0') : "00";
  
  if (hours!="00") {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};
