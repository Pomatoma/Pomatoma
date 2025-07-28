import React from 'react';

/**
 * size: 크기  full / lg / md / sm
 * disabled: 비활성화 여부 (default: false)
 * filled: 채움 여부 filled / outline
 * onClick: onClick 함수
 */

export default function Button({ size = 'lg', filled = 'filled', disabled = false, onClick, children }) {
  const baseClasses =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    full: 'py-2 w-full text-base',
    lg: 'py-2 w-lg text-base',
    md: 'py-2 w-sm text-base',
    sm: 'py-1 px-6 text-sm',
  };

  const variantClasses = {
    filled: {
      enabled:
        'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white focus:ring-[var(--color-primary)]/50 active:scale-95',
      disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
    },
    outline: {
      enabled:
        'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-white hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]/50 active:scale-95',
      disabled: 'border-2 border-gray-300 text-gray-400 bg-transparent cursor-not-allowed',
    },
  };

  const className = [baseClasses, sizeClasses[size], variantClasses[filled][disabled ? 'disabled' : 'enabled']].join(
    ' '
  );

  return (
    <button className={className} disabled={disabled} onClick={!disabled ? onClick : undefined}>
      {children}
    </button>
  );
}
