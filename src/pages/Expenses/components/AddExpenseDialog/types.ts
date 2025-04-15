export interface ExpensePayload {
  _id?: string;
  title: string;
  price: number;
  date: string;
}

export interface AddExpenseDialogProps {
  id?: string;
  defaultValues: Partial<ExpensePayload>;
  mode?: 'create' | 'edit';
  isOpen?: boolean;
  setIsOpen: (value: null) => void;
}
