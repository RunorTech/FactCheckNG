export interface AuthReduxState {
  id: string
}
export interface SharedReduxState {
  toastData: {
    type?: ToastType;
    title?: string;
    message: string;
    showDismissButton?: boolean;
    duration?: number;
  };
}