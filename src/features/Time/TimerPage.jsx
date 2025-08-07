import React, { useEffect } from 'react';
import Button from '../../components/Button';
import useTimer from './hook/useTimer';
import { useNavigate } from 'react-router-dom';
import TimerDisplay from './components/TimerDisplay';
import { useTimerStore } from '../../store/useTimerStore';

export default function TimerPage() {
  const navigate = useNavigate();
  const {studyTime, breakTime, cycles} = useTimerStore();
  const {
    mode,
    isRunning,
    start,
    pause,
    resume,
    formatted
  } = useTimer({
    studySec: studyTime * 60,
    breakSec: breakTime * 60,
    cycles: cycles,
  });

  useEffect(() => {
    start()
  }, []);

  // 그만두기
  const handleStop = () => {
    pause();
    if(window.confirm('그만 두시겠습니까? (스터디는 이전까지 기록됩니다)')){
      start();
      navigate('/');
    } else {
      setTimeout(() => {
        resume();
      }, 0);
    }
  }
  
  // 일시정지
  const handlePauseResume = () => {
    isRunning ? pause() : resume()
  }

  return (
    <main className='flex flex-col h-[66vh]'>
      {/* 타이머 */}
      <section className='flex-1 flex items-center justify-center'>
        <TimerDisplay mode={mode} formatted={formatted} />
        </section>
      {/* 버튼 컨테이터 */}
      <section className='w-full py-4'>
        <div className='flex justify-center gap-4'>
          <Button size='md' filled='outline' onClick={handleStop}>그만두기</Button>
          <Button size='md' filled='filled' onClick={handlePauseResume}>
            {isRunning ? '일시정지' : '이어하기'}
          </Button>
        </div>
      </section>
    </main>
  )
}
