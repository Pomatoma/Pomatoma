import React from 'react';
import tomato from '../assets/icons/tomato.svg';

export default function FloatButton({ setIsModalOpen, isModalOpen }) {
  return (
    <div className='z-10'>
      <button className='absolute bottom-5 right-10 w-20 h-20' onClick={() => {
        setIsModalOpen(!isModalOpen);
      }}>
        <img src={tomato} className="w-20 h-20" />
      </button>
    </div>
  );
}
