import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

export default function AuthPage() {
  const [isActive, setActive] = useState('LOGIN');

  const components = [
    { page: 'LOGIN', title: '로그인', component: <LoginForm /> },
    { page: 'SINGUP', title: '회원가입', component: <RegisterForm /> },
  ];

  return (
    <div className=' flex justify-center items-center p-2'>
      <div className='w-lg max-w-4xl bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden'>
        {/* 탭 */}
        <div className='bg-white px-4 py-5'>
          <ul className='flex justify-center items-center gap-8 mt-5'>
            {components.map((value, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setActive(value.page)}
                  className={`
                pb-2 px-1 font-medium text-xl transition-colors duration-200
                ${
                  isActive === value.page
                    ? 'text-[var(--color-primary)] font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}>
                  {value.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 보여지는 곳 */}
        <div className='p-6 md:p-8'>{components.find((comp) => comp.page === isActive)?.component}</div>
      </div>
    </div>
  );
}
