import React from 'react'
import Red from '../../../assets/icons/tomato-red.svg';
import Green from '../../../assets/icons/tomato-green.svg';

export default function TimerDisplay({mode, formatted}) {
  const TomatoImg = mode === 'study' ? Red : Green;
  return (
    <section className='relative w-140 h-100'>
      <img src={TomatoImg}
           alt='timerdisplay'
           className='w-full h-full object-contain' />
      <div className='absolute inset-0 flex items-center justify-center transform translate-y-6 text-white text-7xl'>
        {formatted}
      </div>
    </section>
  )
}
