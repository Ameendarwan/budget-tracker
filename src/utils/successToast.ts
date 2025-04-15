import { toast } from 'sonner';

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    style: {
      background: 'white',
      color: '#7539FF',
    },
    className: 'rounded-md shadow-md',
  });
