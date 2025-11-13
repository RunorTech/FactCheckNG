import { cn } from "@/lib/utils"

import React from 'react';

import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { Slide, SlideProps } from '@mui/material';

export enum ToastType {
  error = 'danger',
  warning = 'warning',
  info = 'primary',
  success = 'success',
}

export interface ToastProps extends Omit<SnackbarProps, 'onClose'> {
  duration?: number;
  action?: React.ReactNode;
  dismissRender?: React.ReactNode;
  showDismissButton?: boolean;
  dismissBtnClassName?: string;
  onClose?: () => void;
  slideProps?: Omit<SlideProps, 'children'>;
}

export const Toast: React.FC<ToastProps> = ({
  action,
  onClose,
  dismissRender,
  dismissBtnClassName,
  showDismissButton = true,
  duration = 3000,
  slideProps,
  ...props
}) => {
  return (
    <Snackbar
      {...props}
      autoHideDuration={duration}
      onClose={() => onClose?.()}
      TransitionComponent={(props) => (
        <Slide
          {...props}
          {...slideProps}
        />
      )}
      action={
        action ||
        (showDismissButton && (
          <button
            className={cn(
              'py-1 px-2 opacity-70 ',
              dismissBtnClassName,
            )}
            onClick={() => onClose?.()}
          >
            {dismissRender || 'Dismiss'}
          </button>
        ))
      }
    />
  );
};
