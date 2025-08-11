import { useEffect, useRef, useState } from "react";
import { useTimerStore } from "../../../store/useTimerStore";

/*
 - studySec : 스터디 시간(초)
 - breakSec : 쉬는 시간(초)
 - cycles : 반복 횟수
 */

export default function useTimer({
  studySec,
  breakSec,
  cycles,
  autoStart = true,
} = {}){
  // 모드 'study' | 'break'
  const [mode, setMode] = useState('study');
  // 남은 시간
  const [remaining, setRemaining] = useState(studySec);
  // 실행 중
  const [isRunning, setIsRunning] = useState(false);
  // 완료된 횟수
  // const [completedCycles, setCompletedCycles] = useState(0);
  const timerRef = useRef(null);

  // dailyCount 올리는 함수
  const incrementDaily = useTimerStore((s) => s.incrementDaily);
  const dailyCount = useTimerStore((s) => s.dailyCount);

  // 시간 포맷
  const formatTime = (sec) => {
    const m = String(Math.floor(sec/60)).padStart(2,'0');
    const s = String(sec%60).padStart(2,'0');
    return `${m}:${s}`
  }

  // 마운트 시 자동으로 start
  useEffect(() => {
    if(autoStart) {
      setMode('study');
      setRemaining(studySec);
      // setCompletedCycles(0);
      setIsRunning(true);
    }
  },[]);

  // 시간 1초씩 깍음
  useEffect(() => {
    if(!isRunning) return;

    timerRef.current = setInterval(() => {
      setRemaining((prev) => (prev >0 ? prev -1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  },[isRunning]);

  useEffect(() => {
    if (remaining !== 0) return;
  
    const timeout = setTimeout(() => {
      if (mode === 'study') {
        console.log('incrementDaily 호출');
        incrementDaily();
        setMode('break');
        setRemaining(breakSec);
        return;
      }
  
      if (mode === 'break') {
        if (dailyCount >= cycles) {
          setIsRunning(false);
        } else {
          setMode('study');
          setRemaining(studySec);
        }
      }
    }, 1000);
  
    return () => clearTimeout(timeout);
  }, [remaining, mode, breakSec, studySec, cycles, incrementDaily, dailyCount]);
  

  const start = () => {
    clearInterval(timerRef.current)
    useTimerStore.getState().resetDaily();
    setMode('study')
    setRemaining(studySec)
    setIsRunning(true)
  };

  const pause = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  };

  const resume = () => {
    setIsRunning(true)
  };

  return {
    mode,
    formatted: formatTime(remaining),
    isRunning,
    totalCycles: cycles,
    remaining,
    start,
    pause,
    resume,
  };
}
