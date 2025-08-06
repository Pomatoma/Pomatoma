import React from 'react';
import Button from './Button';
import TomatoIcon from '../assets/icons/tomato.svg'; // ReactComponent로 import
import { useUserStore } from '../store/userStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { isAuthenticated, logout } = useUserStore();
  let navigate = useNavigate();
  return (
    <div className='py-2 px-8 w-full bg-[var(--color-secondary)] flex flex-row justify-between items-center'>
      <Link to={'/'}>
        <img src={TomatoIcon} alt='Tomato' width={50} height={45} className='inline-block' />
      </Link>
      <div>
        {isAuthenticated ? (
          <Button
            size='sm'
            filled='filled'
            disabled={false}
            onClick={() => {
              logout();
              navigate('/');
            }}>
            로그아웃
          </Button>
        ) : (
          <Button
            size='sm'
            filled='outline'
            disabled={false}
            onClick={() => {
              navigate('/auth/login');
            }}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}
