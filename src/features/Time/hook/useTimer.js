import { useEffect, useRef, useState } from "react";
import { useTimerStore } from "../../../store/useTimerStore";
import { useUserStore } from "../../../store/userStore";
import { getKstDateString } from "../../../utils/dateKST";
import { ref, set } from "firebase/database";
import { auth, db } from "../../../../config/firbaseConfig";
import { scheuleDailyMidnight } from "../../../utils/scheduleMidnight";
import { useAuthStore } from "../../../store/useAuthStore";

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
  const [mode, setMode] = useState('study');
  const [remaining, setRemaining] = useState(studySec);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const incrementDaily = useTimerStore((s) => s.incrementDaily);
  const resetDaily = useTimerStore((s) => s.resetDaily);
  const dailyCount = useTimerStore((s) => s.dailyCount);

  const userInfo = useAuthStore((s) => s.userInfo);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);


  // 시간 포맷
  const formatTime = (sec) => {
    const m = String(Math.floor(sec/60)).padStart(2,'0');
    const s = String(sec%60).padStart(2,'0');
    return `${m}:${s}`
  }

  // DB 저장 함수
  const saveDailyCountToDB = (count) => {
    const dateKey = getKstDateString();
    const uid = userInfo?.userUid ?? auth.currentUser?.uid;
    
    if(!uid){
      console.error('해당 uid가 없습니다. 저장을 건너뜁니다', {userInfo, authUser: auth.currentUser});
      return;
    }
    console.log('→ attempt to save dailyRecord', { dateKey, uid });
    const userDailyRef = ref(db, `users/${uid}/dailyRecord/${dateKey}/count`);
    set(userDailyRef, count)
      .then(() => console.log('DB 저장 성공: ',count))
      .catch((err) => console.log('DB 저장 실패: ',err));
  };

  // 자정 초기화
  useEffect(() => {
    if (!isAuthenticated || !userInfo?.userUid) return;

    const cancelSchedule = scheuleDailyMidnight(() => {
      console.log('firebase 저장 및 초기화');
      saveDailyCountToDB(dailyCount);
      resetDaily();
    });
    return () => {
      if(cancelSchedule) cancelSchedule();
    }
  },[dailyCount, isAuthenticated, userInfo?.userUid]);

  // 마운트 시 자동으로 start
  useEffect(() => {
    if(autoStart) {
      setMode('study');
      setRemaining(studySec);
      setIsRunning(true);
    }
  },[autoStart, studySec]);

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
        saveDailyCountToDB(dailyCount +1);
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
    clearInterval(timerRef.current);
    resetDaily();
    setMode('study');
    setRemaining(studySec);
    setIsRunning(true);
  };

  const pause = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
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
