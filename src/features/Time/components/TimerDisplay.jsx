import React from 'react'

export default function TimerDisplay({mode, formatted}) {

  return (
    <div className='relative w-64 h-56'>
      {/* 토마토이미지 넣기 */}
      <div className='absolute inset-0 flex items-center justify-center text-red-300 text-5xl'>
        {formatted}
      </div>
    </div>
  )
}
