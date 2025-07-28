import React from 'react';
import Button from './Button';
import TomatoIcon from '../assets/icons/tomato.svg'; // ReactComponent로 import
import { useUserStore } from '../store/userStore';

export default function Header() {
  const { isAuthenticated } = useUserStore();
  return (
    <div className='py-2 px-8 w-full bg-[var(--color-secondary)] flex flex-row justify-between items-center'>
      <img src={TomatoIcon} alt='Tomato' width={50} height={45} className='inline-block' />
      <div>
        {isAuthenticated ? (
          <Button size='sm' filled='filled' disabled={false} onClick={() => {}}>
            로그아웃
          </Button>
        ) : (
          <Button size='sm' filled='outline' disabled={false} onClick={() => {}}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}
