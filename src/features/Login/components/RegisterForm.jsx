import React from 'react';
import FormInput from './FormInput';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';

export default function RegisterForm() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      userid: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name={'username'}
            label={'이름'}
            type={'text'}
            placeholder={'이름을 입력해주세요'}
            control={control}
            {...register('username', {
              required: '이름을 입력해주세요',
            })}
          />

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

          <FormInput
            name={'passwordConfirm'}
            label={'비밀번호 확인'}
            type={'password'}
            placeholder={'비밀번호를 입력해주세요'}
            control={control}
            {...register('passwordConfirm', {
              required: '비밀번호를 입력해주세요',
              minLength: { value: 6, message: '6자 이상 20자 이하로 입력해주세요.' },
              maxLength: { value: 20, message: '6자 이상 20자 이하로 입력해주세요.' },
              validate: {
                check: (val) => {
                  if (getValues('password') !== val) {
                    return '비밀번호가 일치하지 않습니다.';
                  }
                },
              },
            })}
          />

          <Button size='full' filled='filled' disabled={false} type='submit'>
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
