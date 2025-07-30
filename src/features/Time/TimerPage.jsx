import React from 'react';
import Button from '../../components/Button';
import useTimer from './hook/useTimer';

export default function TimerPage() {
  const {
    mode,
    remaining,
    isRunning,
    start,
    pause,
    resume,
  } = useTimer();

  // 그만두기
  const handleStop = () => {
    console.log('그만두기');
  }
  // 일시정지
  const handlePauseResume = () => {
    console.log('일시정지');
  }
  return (
    <main className='flex flex-col space-y-20'>
      {/* 타이머 */}
      <section className='w-full h-120 border'>타이머 들어갈 공간</section>
      {/* 버튼 컨테이터 */}
      <section className='w-full py-4'>
        <div className='flex justify-center gap-4'>
          <Button size='md' filled='outline' onClick={handleStop}>그만두기</Button>
          <Button size='md' filled='filled' onClick={handlePauseResume}>일시정지</Button>
        </div>
      </section>
    </main>
  )
}
