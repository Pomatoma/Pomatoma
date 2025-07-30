import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import FloatButton from './FloatButton';

export default function RootLayout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        <Outlet />
      </main>
      {/* <FloatButton /> */}
    </div>
  );
}
