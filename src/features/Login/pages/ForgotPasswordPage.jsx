import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { findPassword } from '../provider/authProvider';
import FormInput from '../components/FormInput';
import Button from '../../../components/Button';
import { Toaster } from 'react-hot-toast';
import useToast from '../hooks/useToast';
import { useAuthStore } from '../../../store/useAuthStore';

export default function ForgotPasswordPage() {
  const { showLoading } = useToast();
  const { isLoading } = useAuthStore();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const navigate = useNavigate();

  // 비밀번호 재설정 이메일 보내기
  const onSubmit = async (data) => {
    const { username, email } = data;
    const loadingToast = showLoading('비밀번호 재설정 메일 보내는 중...');
    if(!username) {
      const showError = showError('이름을 입력해주세요.');
      return;
    }
    if(!email) {
      const showError = showError('이메일을 입력해주세요.');
      return;
    }
    // 실제 있는 계정인지 확인 해야함
    const result = await findPassword({username, email});
    
    if(result.success) {
      loadingToast.success(result.message);
      navigate('/auth/login');
    } else {
      loadingToast.error(result.error);
    }
  }
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[var(--color-primary)] font-bold text-xl mb-5'>비밀번호 재설정</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center w-full'>
        <div className='w-full'>
          <FormInput
            label='이름'
            type='text'
            placeholder='가입하신 이름을 입력해주세요.'
            name='username'
            control={control}
            {...register('username', {
              required: '이름을 입력해주세요.',
            })}
          />
          <FormInput 
            label='이메일'
            type='email'
            placeholder='가입하신 이메일을 입력해주세요.'
            name='email'
            control={control}
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '옳바르지 않은 메일 형식입니다.',
              },
            })}
          />
        </div>
        <p className='text-sm text-gray-600 mt-5 mb-5'>가입하신 이메일로 메일을 발송해드립니다!</p>
        <Button 
          type='submit' 
          size='full' 
          filled='filled' 
          disabled={isLoading}
        >비밀번호 재설정</Button>
      </form>
      <Toaster />
    </div>
  );
}
