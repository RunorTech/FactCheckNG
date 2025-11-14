import { useDispatch } from 'react-redux';

import { ToastType } from '@/components/Toast';
import { setToastData } from '@/utils/store/redux/slices/shared.slice';

interface ToastProps {
  type?: ToastType;
  title?: string;
  duration?: number;
  showDismissButton?: boolean;
}

export function useToast() {
  const reduxDispatch = useDispatch();

  function toast(message: string, options?: ToastProps) {
    reduxDispatch(setToastData({ message, ...options }));
  }

  function errorToast(message: string, options?: ToastProps) {
    reduxDispatch(
      setToastData({
        ...options,
        message,
        type: ToastType.error,
      }),
    );
  }

  function successToast(message: string, options?: ToastProps) {
    reduxDispatch(
      setToastData({
        ...options,
        message,
        type: ToastType.success,
      }),
    );
  }

  function infoToast(message: string, options?: ToastProps) {
    reduxDispatch(
      setToastData({
        ...options,
        message,
        type: ToastType.info,
      }),
    );
  }

  function warningToast(message: string, options?: ToastProps) {
    reduxDispatch(
      setToastData({
        ...options,
        message,
        type: ToastType.warning,
      }),
    );
  }

  return { toast, infoToast, errorToast, successToast, warningToast };
}
