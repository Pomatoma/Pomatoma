export function msUntilNextMidnightKST(){
  const now = new Date();
  const utcMs =now.getTime() + now.getTimezoneOffset() * 60_000;
  const kstMs = utcMs + 9 * 3_600_000;
  const nowKST = new Date(kstMs);

  const nextMidnightKST = new Date(
    nowKST.getFullYear(),
    nowKST.getMonth(),
    nowKST.getDate() +1,
    0,0,0,0
  ).getTime();

  // 로컬 타임으로 변환
  const nextMidnightUtcMs = nextMidnightKST - 9 * 3_600_000;
  return nextMidnightUtcMs - now.getTime();
}

// cb 매일 KST 자정에 호출
export function scheuleDailyMidnight(cb){
  let timer = setTimeout(function tick(){
    cb();
    timer = setTimeout(tick, msUntilNextMidnightKST());
  }, msUntilNextMidnightKST());
  return () =>clearTimeout(timer);
}