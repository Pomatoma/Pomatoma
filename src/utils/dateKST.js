export function getKstDateString(date = new Date()){
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60_000;
  const kstMs = utcMs + 9 * 3_600_000;
  return new Date(kstMs).toISOString().slice(0,10);
}