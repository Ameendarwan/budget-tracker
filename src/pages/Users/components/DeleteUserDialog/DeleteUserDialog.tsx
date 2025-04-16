import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@app/components/Dialog/Dialog';
import React, { FC } from 'react';

import { Button } from '@app/components/Button/Button';
import { DeleteUserDialogProps } from './types';
import { showErrorToast } from '@app/components/Toast/Toast';
import { useDeleteUserMutation } from '@app/store/apis/user';

const DeleteUserDialog: FC<DeleteUserDialogProps> = ({ user, isOpen, setIsOpen }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ userId: user?._id });
      handleClose();
      showErrorToast('User deleted', 'User deleted successfully.!');
    } catch {
      console.error('Failed to delete user');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Delete User</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2 text-sm text-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">First Name</p>
              <p className="text-muted-foreground">{user?.firstName}</p>
            </div>
            <div>
              <p className="font-medium">Last Name</p>
              <p className="text-muted-foreground">{user?.lastName}</p>
            </div>
          </div>

          <div>
            <p className="font-medium">Email</p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-muted-foreground">{user?.phoneNumber}</p>
            </div>
            <div>
              <p className="font-medium">Budget Limit</p>
              <p className="text-muted-foreground">{user?.budgetLimit?.toLocaleString()} PKR</p>
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
            className="flex-1 rounded-[8px] bg-destructive text-white hover:bg-destructive"
            onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
