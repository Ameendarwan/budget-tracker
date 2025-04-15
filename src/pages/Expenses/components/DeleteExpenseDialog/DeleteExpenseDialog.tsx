import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@app/components/Dialog/Dialog';
import React, { FC } from 'react';

import { Button } from '@app/components/Button/Button';
import { DeleteExpenseDialogProps } from './types';
import { showSuccessToast } from '@app/components/Toast/Toast';
import { useDeleteExpenseMutation } from '@app/store/apis/expense';

const DeleteExpenseDialog: FC<DeleteExpenseDialogProps> = ({ expense, isOpen, setIsOpen }) => {
  const [deleteExpense, { isLoading }] = useDeleteExpenseMutation();

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense({ expenseId: expense._id ?? '' });
      handleClose();
      showSuccessToast('Expense deleted', 'Expense deleted successfully.!');
    } catch {
      console.error('Failed to delete user');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Delete Expense</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Title</p>
              <p className="text-muted-foreground">{expense.title}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Price(PKR)</p>
              <p className="text-muted-foreground">{expense.price}</p>
            </div>
            <div>
              <p className="font-medium">Date</p>
              <p className="text-muted-foreground">{expense.date}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between pt-2">
          <Button
            variant="outline"
            className="flex-1 rounded-[8px] border-grayShades-shade1 text-base font-semibold text-grayShades-shade1"
            type="button"
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            loading={isLoading}
            className="flex-1 rounded-[8px] bg-red-600 text-white hover:bg-red-700"
            onClick={handleDeleteExpense}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExpenseDialog;
