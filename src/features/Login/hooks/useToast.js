// src/hooks/useToast.js
import { toast } from 'react-hot-toast';

export default function useToast(message = '성공적으로 처리되었습니다.') {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 3000,
    });
  };

  const showError = (message = '오류가 발생했습니다.') => {
    toast.error(message, {
      duration: 3000,
    });
  };

  const showInfo = (message = '알림입니다.') => {
    toast(message, {
      duration: 3000,
    });
  };

  // 로딩 토스트를 표시하고 Promise를 반환하는 객체를 제공하는 함수
  const showLoading = (message = '처리 중입니다...') => {
    const toastId = toast.loading(message); // 단순 ID 반환
    return {
      success: (successMessage = '성공적으로 완료되었습니다!') => {
        toast.success(successMessage, { id: toastId });
      },
      error: (errorMessage = '오류가 발생했습니다.') => {
        toast.error(errorMessage, { id: toastId });
      },
      dismiss: () => {
        toast.dismiss(toastId);
      },
    };
  };

  // 비동기 작업(프로미스)을 toast로 감싸서 로딩/성공/실패 상태를 보여주는 함수입니다.
  const showPromise = ({ promise, loading = '처리 중입니다...', success = '성공적으로 완료되었습니다!', error = '오류가 발생했습니다.' }) => {
    toast.promise(
      promise,
      {
        loading,
        success,
        error,
      }
    );
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showLoading,
    showPromise,
  };
}
