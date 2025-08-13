import { useEffect, useRef, useState } from "react";
import { useTimerStore } from "../../../store/useTimerStore";
import { getKstDateString } from "../../../utils/dateKST";
import { get, ref, set } from "firebase/database";
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
  const lastTickRef = useRef(null);
  const scheduleSetRef = useRef(false); // 중복 스케줄 방지

  const incrementDaily = useTimerStore((s) => s.incrementDaily);
  const setDailyCount = useTimerStore((s) => s.setDailyCount);
  const dailyCount = useTimerStore((s) => s.dailyCount);

  const userInfo = useAuthStore((s) => s.userInfo);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // 시간 포맷
  const formatTime = (sec) => {
    const m = String(Math.floor(sec/60)).padStart(2,'0');
    const s = String(sec%60).padStart(2,'0');
    return `${m}:${s}`
  }

  // DB에서 오늘 count값 가져오기 (없으면 0으로 초기화)
  const initDailyCount = async (uid) => {
    const dateKey = getKstDateString();
    const userDailyRef = ref(db, `users/${uid}/dailyRecord/${dateKey}/count`);
    try{
      const snapshot = await get(userDailyRef);
      if(snapshot.exists()){
        return snapshot.val();
      } else {
        await set(userDailyRef, 0);
        return 0;
      }
    } catch(err){
      console.error('초기 dailyCount 가져오기 실패',err);
      return 0;
    }
  };

  // DB 저장 함수
  const saveDailyCountToDB = (count) => {
    const dateKey = getKstDateString();
    const uid = userInfo?.userUid ?? auth.currentUser?.uid;
    
    if(!uid){
      console.error('해당 uid가 없습니다. 저장을 건너뜁니다', {
        userInfo, 
        authUser: auth.currentUser});
      return;
    }
    // console.log('날짜, 사용자 uid : ', { dateKey, uid });
    const userDailyRef = ref(db, `users/${uid}/dailyRecord/${dateKey}/count`);
    set(userDailyRef, count)
      .then(() => console.log('DB 저장 성공: ',count))
      .catch((err) => console.log('DB 저장 실패: ',err));
  };

  // 추가 : 날짜 변경 감지 초기화 (앱 재시작 시)
  useEffect(() => {
    if(!isAuthenticated || !userInfo?.userUid) return;
    
    const todayKey = getKstDateString();
    const lastDateKey = useTimerStore.getState().lastDateKey;

    if(lastDateKey !==todayKey){
      console.log("날짜 변경 감지, dailyCount 초기화");
      useTimerStore.getState().resetDaily();
      saveDailyCountToDB(0);
    }

    (async () => {
      const countFromDB = await initDailyCount(userInfo.userUid);
      console.log('초기 daliyCount 세팅: ',countFromDB);
      setDailyCount(countFromDB);
      useTimerStore.setState({lastDateKey: todayKey});
    })();
  
  }, [isAuthenticated, userInfo?.userUid, setDailyCount]);

  // 초기 dailyCount 가져와서 세팅
  // useEffect(() => {
  //   if (!isAuthenticated || !userInfo?.userUid) return;
  //   (async () => {
  //     const countFromDB = await initDailyCount(userInfo.userUid);
  //     console.log('초기 daliyCount 세팅: ',countFromDB);
  //   })();
  // },[isAuthenticated, userInfo?.userUid, setDailyCount]);

  // 자정 초기화
  useEffect(() => {
    if (!isAuthenticated || !userInfo?.userUid) return;
    if (scheduleSetRef.current) return;

    scheduleSetRef.current = true;

    const cancelSchedule = scheuleDailyMidnight(() => {
      console.log('firebase 저장 및 초기화');
      const {dailyCount, resetDaily} = useTimerStore.getState();
      saveDailyCountToDB(dailyCount);
      resetDaily();
      useTimerStore.setState({lastDateKey: getKstDateString()});
    });
    return cancelSchedule;
  },[isAuthenticated, userInfo?.userUid]);

  // 마운트 시 자동으로 start
  useEffect(() => {
    if(autoStart) {
      setMode('study');
      setRemaining(studySec);
      lastTickRef.current = Date.now();
      setIsRunning(true);
    }
  },[]);

  // 타이머 - 타임스탬프 기반 보정
  useEffect(() => {
    if(!isRunning) return;

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - lastTickRef.current)/1000); // 경과 초
      if(delta > 0){
        setRemaining((prev) => Math.max(prev - delta, 0));
        lastTickRef.current = now;
      }
    }, 200); // 0.2초 단위 체크
    return () => clearInterval(timerRef.current);
  },[isRunning]);

  // 모드 전환
  useEffect(() => {
    if (remaining !== 0) return;
  
    const timeout = setTimeout(() => {
      if (mode === 'study') {
        console.log('incrementDaily 호출');
        incrementDaily();
        saveDailyCountToDB(dailyCount +1);
        setMode('break');
        setRemaining(breakSec);
        lastTickRef.current = Date.now();
        return;
      }
  
      if (mode === 'break') {
        if (dailyCount >= cycles) {
          setIsRunning(false);
        } else {
          setMode('study');
          setRemaining(studySec);
          lastTickRef.current = Date.now();
        }
      }
    }, 1000);
  
    return () => clearTimeout(timeout);
  }, [remaining, mode, breakSec, studySec, cycles, incrementDaily, dailyCount]);
  

  const start = () => {
    clearInterval(timerRef.current);
    setMode('study');
    setRemaining(studySec);
    lastTickRef.current = Date.now();
    setIsRunning(true);
  };

  const pause = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resume = () => {
    lastTickRef.current = Date.now();
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
