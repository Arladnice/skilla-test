export default function Filters(calls, paramCallType) {
  const result = calls.filter((call) => call["in_out"] === paramCallType);
  return result;
}
