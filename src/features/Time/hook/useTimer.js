import { useEffect, useRef, useState } from "react";

/*
 - studySec : 스터디 시간(초)
 - breakSec : 쉬는 시간(초)
 - cycles : 반복 횟수
 */
export default function useTimer({studySec, breakSec, cycles=1}){
  // 모드 'study' | 'break'
  const [mode, setMode] = useState('study');
  // 남은 시간
  const [remaining, setRemaining] = useState(studySec);
  // 실행 중
  const [isRunning, setIsRunning] = useState(false);
  // 완료된 횟수
  const [completedCycles, setCompletedCycles] = useState(0);
  const timerRef = useRef(null);

  // 시간 포맷
  const formatTime = (sec) => {
    const m = String(Math.floor(sec/60)).padStart(2,'0');
    const s = String(sec%60).padStart(2,'0');
    return `${m}:${s}`
  }

  useEffect(() => {
    if(!isRunning) return;

    timerRef.current = setInterval(() => {
      setRemaining(prev => {
        if(prev<=1){
          clearInterval(timerRef.current);

          // study -> break
          // 카운트 올림
          if(mode === 'study'){
            const count = completedCycles +1;
            setCompletedCycles(count);
            setMode('break');
            return breakSec;
          }

          // break -> study
          // completedCycles < cycles면 다시 study
          // completedCycles >= cycles면 타이머 종료
          if(mode === 'break'){
            if(completedCycles>= cycles){
              setIsRunning(false);
              return 0;
            } else{
              setMode('study');
              return studySec;
            }
          }
        }
        return prev-1;
      })
    },1000)
    return () => clearInterval(timerRef.current);
  },[isRunning, mode, completedCycles, cycles, studySec, breakSec]);

  const start = () => {
    clearInterval(timerRef.current)
    setMode('study')
    setRemaining(studySec)
    setCompletedCycles(0)
    setIsRunning(true)
  };

  const pause = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  };

  const resume = () => {
    if(!isRunning) setIsRunning(true)
  };
  return {
    mode,
    remaining,
    formatted: formatTime(remaining),
    isRunning,
    completedCycles,
    totalCycles: cycles,
    start,
    pause,
    resume,
  };
}
