export function getKstDateString(date = new Date()){
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60_000;
  const kstMs = utcMs + 9 * 3_600_000;
  const kstDate = new Date(kstMs);

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth()+1).padStart(2,'0');
  const day = String(kstDate.getDate()).padStart(2,'0');

  return `${year}-${month}-${day}`;
}