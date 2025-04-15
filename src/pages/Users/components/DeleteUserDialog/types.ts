import { User } from '@app/store/apis/user/types';

export interface DeleteUserDialogProps {
  user: User;
  isOpen?: boolean;
  setIsOpen: (value: null) => void;
}
