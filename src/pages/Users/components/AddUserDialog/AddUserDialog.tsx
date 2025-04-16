import { AddUserDialogProps, UserPayload } from './types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@app/components/Dialog/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useCreateUserMutation, useUpdateUserMutation } from '@app/store/apis/user';

import { Button } from '@app/components/Button/Button';
import { Input } from '@app/components/Input/Input';
import { showSuccessToast } from '@app/components/Toast/Toast';
import { useForm } from 'react-hook-form';
import { userSchema } from './AddUserDialog.utils';
import { yupResolver } from '@hookform/resolvers/yup';

const AddUserDialog: FC<AddUserDialogProps> = ({ id, defaultValues, mode = 'create', isOpen, setIsOpen }) => {
  const [open, setOpen] = useState(false);

  const [createUser, { isLoading: createLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const form = useForm<UserPayload>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      budgetLimit: 0,
    },
  });

  useEffect(() => {
    if (isOpen) form.reset({ ...defaultValues });
  }, [isOpen]);

  const handleClose = () => {
    form.reset();
    setIsOpen(null);
    setOpen(false);
  };

  const onSubmit = (data: UserPayload) => {
    try {
      // Check for changed fields by comparing with defaultValues
      const updatedData: any = {};

      Object.keys(data).forEach(key => {
        if (key && data[key as keyof UserPayload] !== defaultValues?.[key as keyof UserPayload]) {
          if (data[key as keyof UserPayload] !== undefined) {
            updatedData[key as keyof UserPayload] = data[key as keyof UserPayload];
          }
        }
      });
      if (mode === 'create') {
        createUser({
          body: {
            ...data,
            role: 'admin',
          },
        }).unwrap();

        showSuccessToast('User created', 'User created successfully.!');
      } else {
        updateUser({
          userId: id ?? '',
          body: updatedData,
        }).unwrap();
        showSuccessToast('User Updated', 'User edited successfully.!');
      }
      handleClose();
      form.reset();
    } catch {
      console.error('Failed to update user');
    }
  };

  const isLoading = useMemo(() => createLoading || updateLoading, [createLoading, updateLoading]);

  return (
    <Dialog open={open || isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-md [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{mode === 'edit' ? 'Edit User' : 'Add User'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Steve" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Jorden" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="example@email.com" disabled={mode === 'edit'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="(406) 555-0120" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="budgetLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Limit (PKR)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="30000" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-between pt-2">
              <Button
                variant="outline"
                className="flex-1 rounded-[8px] border-grayShades-shade1 text-base font-semibold text-grayShades-shade1"
                type="button"
                onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 rounded-[8px]" loading={isLoading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
