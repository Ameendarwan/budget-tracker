export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  budgetLimit: number;
}

export interface AddUserDialogProps {
  id?: string;
  defaultValues?: Partial<UserPayload>;
  mode?: 'create' | 'edit';
  isOpen?: boolean;
  setIsOpen: (value: null) => void;
}
