import { ExpensePayload } from '../AddExpenseDialog/types';

export interface DeleteExpenseDialogProps {
  expense: Partial<ExpensePayload>;
  isOpen?: boolean;
  setIsOpen: (value: null) => void;
}
