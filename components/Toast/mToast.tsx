'use client';

import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { cn } from "@/lib/utils"


import { setToastData } from '@/utils/store/redux/slices/shared.slice';
import { Toast } from './toast';

import './toast.css';
import { SharedReduxState } from '@/types/reduxStore';

export enum ToastType {
  error = 'danger',
  warning = 'secondary',
  info = 'primary',
  success = 'success',
}

const toastContentClassNameMap = {
  [ToastType.error]: {
    defaultTitle: 'Error alert',
    icon: 'text-notification-error-icon',
    container:
      'border-notification-error-border bg-notification-error-background',
  },
  [ToastType.info]: {
    defaultTitle: 'Information alert',
    icon: 'text-notification-info-icon',
    container:
      'border-notification-info-border bg-notification-info-background',
  },
  [ToastType.warning]: {
    defaultTitle: 'Warning alert',
    icon: 'text-notification-warning-icon',
    container:
      'border-notification-warning-border bg-notification-warning-background',
  },
  [ToastType.success]: {
    defaultTitle: 'Success alert',
    icon: 'text-notification-success-icon',
    container:
      'border-notification-success-border bg-notification-success-background',
  },
};

export const MToast = () => {
  const {
    title,
    message,
    duration,
    showDismissButton,
    type = ToastType.info,
  } = useSelector<CombinedReducerType, SharedReduxState['toastData']>(
    ({ shared }) => shared.toastData,
  );

  const reduxDispatch = useDispatch();

  const handleDismiss = () => {
    reduxDispatch(setToastData({ message: '' }))
  };

  return (
    <Toast
      message={
        <div className="flex flex-row gap-x-4">
          <div
            className={cn(
              'flex justify-center items-center border rounded-lg w-8 h-8',
              toastContentClassNameMap[type as ToastType].container,
            )}
          >
            <CancelOutlinedIcon
              className={cn(
                'scale-[0.6]',
                toastContentClassNameMap[type as ToastType].icon,
              )}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Typography
              className=" !text-base leading-6"
              variant="h6"
            >
              {title ||
                toastContentClassNameMap[type as ToastType].defaultTitle}
            </Typography>
            <Typography
              className=" !text-sm font-[350]"
              variant="subtitle1"
            >
              {message}
            </Typography>
          </div>
        </div>
      }
      open={!!message}
      slideProps={{ direction: 'up' }}
      duration={duration}
      dismissRender={<CancelOutlinedIcon />}
      onClose={handleDismiss}
      showDismissButton={showDismissButton}
      ContentProps={{
        classes: {
          root: cn(
            'content-wrapper  p-5 !rounded-[10px]',
          ),
        },
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      dismissBtnClassName=" opacity-50"
    />
  );
};
