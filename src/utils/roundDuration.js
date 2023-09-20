export default function roundDuration(time) {
  const second = Math.trunc(time % 60);
  const minutes = Math.trunc((time / 60) % 60);
  const timer = `${minutes < 10 ? `${minutes}` : `${minutes}`}:${
    second < 10 ? `0${second}` : `${second}`
  }`;
  return timer;
}
