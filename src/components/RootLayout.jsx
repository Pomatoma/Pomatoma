import React, { useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import FloatButton from './FloatButton';
import Modal from './Modal';

export default function RootLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        <Outlet />
      </main>
      <FloatButton setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
}
