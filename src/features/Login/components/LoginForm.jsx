import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import Button from '../../../components/Button';
import { login } from '../service/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { useUserStore } from '../../../store/userStore';

export default function LoginForm() {
  const navigate = useNavigate();
  const { isLoading } = useUserStore();
  const { showLoading } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      userid: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
   
    // 로딩 시작
    const loadingToast = showLoading('로그인 중...');
    
    try {
      const result = await login(data); 
      
      if(result.success === true) {
        // 로딩 종료 및 성공 메시지
        loadingToast.success('로그인 되었습니다!');
        
        // 잠시 후 메인 페이지로 이동
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.log(result.error);
        // 로딩 종료 및 에러 메시지
        loadingToast.error(result.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      // 로딩 종료 및 에러 메시지
      loadingToast.error('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name={'userid'}
            label={'이메일'}
            type={'text'}
            placeholder={'test@email.com'}
            maxLength='20'
            control={control}
            {...register('userid', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '옳바르지 않은 메일 형식입니다.',
              },
            })}
          />

          <FormInput
            name={'password'}
            label={'비밀번호'}
            type={'password'}
            placeholder={'비밀번호를 입력해주세요'}
            control={control}
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: { value: 6, message: '6자 이상 20자 이하로 입력해주세요.' },
              maxLength: { value: 20, message: '6자 이상 20자 이하로 입력해주세요.' },
              pattern: { value: /^[a-zA-Z0-9]+$/, message: '영문과 숫자조합으로 입력해주세요' },
            })}
          />
          <div className='flex justify-end mb-4'>
            <NavLink to='/auth/forgot-password' className='text-sm text-gray-500 hover:text-gray-700'>비밀번호 찾기</NavLink>
          </div>
          <Button size='full' filled='filled' disabled={isLoading} type='submit'>
            로그인
          </Button>
          <div className='mt-4'>
            <p className=' text-center text-sm text-gray-500 my-4'>아직 회원이 아니신가요?</p>
          <Button size='full' filled='outline' disabled={isLoading} type='button' onClick={() => navigate('/auth/register')}>
            회원가입
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
