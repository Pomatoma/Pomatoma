import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function AuthPage() {
  const location = useLocation();
  
  const components = [
    { page: 'login', title: '로그인', component: <LoginForm /> },
    { page: 'register', title: '회원가입', component: <RegisterForm /> },
  ];


  return (
    <div className=' flex justify-center items-center p-2'>
      <div className='w-lg max-w-4xl bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden'>
        {/* 탭 */}
        <div className='bg-white px-4 py-5'>
          <ul className='flex justify-center items-center gap-8 mt-5'>
            {components.map((value, idx) => (
              <li key={idx}>
                <NavLink
                  to={`/auth/${value.page}`}
                  className={`
                pb-2 px-1 font-medium text-xl transition-colors duration-200
                ${
                  location.pathname === `/auth/${value.page}`
                    ? 'text-[var(--color-primary)] font-bold border-b-2 border-[var(--color-primary)]'
                    : 'border-transparent text-gray-500 hover:text-[var(--color-primary)] hover:border-b-2 hover:border-[var(--color-primary)]'
                }
              `}>
                  {value.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* 보여지는 곳 */}
        <div className='p-6 md:p-8'><Outlet /></div>
      </div>
      <Toaster position='top-center' />
    </div>
  );
}
