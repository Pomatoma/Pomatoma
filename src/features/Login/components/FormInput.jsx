import React from 'react';
import { useFormState } from 'react-hook-form';

export default function FormInput({ label, type, placeholder, name, control, ...rest }) {
  const { errors } = useFormState({ control });
  const error = errors[name];

  return (
    <div className='flex flex-col gap-2 mb-4'>
      <label className='text-sm font-semibold text-gray-500'>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 text-gray-900 bg-white border-2 rounded-xl 
          placeholder-gray-400 focus:outline-none focus:ring-4 
          transition-all duration-200
          ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300'
          }
        `}
        {...rest}
      />
      {error && <span className='text-sm text-red-500 mt-1'>{error.message}</span>}
    </div>
  );
}
