// convert secs (integer) into HH:MM:SS format (string)
//
const pad = (num) => ('0'+num).slice(-2);

export default function hhmmss(secs) {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs - (hours * 3600)) / 60);
  const seconds = Math.round(
    ( Math.floor((secs - (hours * 3600) - (minutes * 60))) * 100 ) / 100
  );
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
};
