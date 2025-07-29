import React from 'react';
import useTimer from './hook/useTimer'

export default function TimerTest() {
  const {
    mode,
    remaining,
    formatted,
    isRunning,
    completedCycles,
    totalCycles,
    start,
    pause,
    resume
  } = useTimer({
    studySec: 7,    // 테스트용으로 짧게 설정 (5초)
    breakSec: 3,    // 쉬는 시간도 짧게
    cycles: 3      // 두 번 반복
  });

  return (
    <div>
      <h1>Pomodoro Timer Test</h1>
      <p>현재 모드: {mode}</p>
      <p>남은 시간: {formatted}</p>
      <p>완료된 사이클: {completedCycles}/{totalCycles}</p>
      <p>진행 상태: {isRunning ? 'Running' : 'Paused'}</p>

      <button onClick={start}>시작</button>
      <button onClick={pause}>일시정지</button>
      <button onClick={resume}>이어하기</button>
    </div>
  );
}
