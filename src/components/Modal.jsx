import React from 'react';
import Calender from './Calender';

export default function Modal({ setIsModalOpen }) {
  return (
    <div className='fixed inset-0 bg-opacity-10 flex justify-center items-center z-50 '>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>2025</h2>
            <button className='text-zinc-900 text-xl' onClick={() => {
            setIsModalOpen(false);
            }}>X</button>
        </div>
        {/* 이번년도 공부기록 확인 (달력형태) */}
        <div className='flex justify-center items-center'>
            <Calender />
        </div>
      </div>
    </div>
  );
}