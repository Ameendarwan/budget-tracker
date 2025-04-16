import { AddExpenseDialogProps, ExpensePayload } from './types';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@app/components/Dialog/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@app/components/Form/Form';
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/Popover/Popover';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useCreateExpenseMutation, useUpdateExpenseMutation } from '@app/store/apis/expense';

import { Button } from '@app/components/Button/Button';
import { Calendar } from '@app/components/Calendar/Calendar';
import { Input } from '@app/components/Input/Input';
import SVGIcon from '@app/components/SVGIcon';
import { expenseSchema } from './AddExpenseDialog.utils';
import { format } from 'date-fns';
import { showSuccessToast } from '@app/components/Toast/Toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const AddExpenseDialog: FC<AddExpenseDialogProps> = ({ id, defaultValues, mode = 'create', isOpen, setIsOpen }) => {
  const [open, setOpen] = useState(false);

  const [createExpense, { isLoading: createLoading }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: updateLoading }] = useUpdateExpenseMutation();

  const form = useForm<ExpensePayload>({
    resolver: yupResolver(expenseSchema),
    defaultValues: {
      title: '',
      price: 0,
      date: `${new Date()}`,
    },
  });

  useEffect(() => {
    if (isOpen) form.reset({ ...defaultValues });
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(null);
    setOpen(false);
  };

  const onSubmit = (data: ExpensePayload) => {
    try {
      // Check for changed fields by comparing with defaultValues
      const updatedData: any = {};

      Object.keys(data).forEach(key => {
        if (key && data[key as keyof ExpensePayload] !== defaultValues[key as keyof ExpensePayload]) {
          if (data[key as keyof ExpensePayload] !== undefined) {
            updatedData[key as keyof ExpensePayload] = data[key as keyof ExpensePayload];
          }
        }
      });

      if (mode === 'create') {
        createExpense({
          body: {
            ...data,
          },
        }).unwrap();

        showSuccessToast('Expense created', 'Expense created successfully!');
      } else {
        // Only send fields that have changed
        updateExpense({
          expenseId: id ?? '',
          body: updatedData,
        }).unwrap();
        showSuccessToast('Expense Updated', 'Expense edited successfully!');
      }
    } catch {
      console.error('Failed to update');
    }
    form.reset();
    handleClose();
  };

  const isLoading = useMemo(() => createLoading || updateLoading, [createLoading, updateLoading]);

  return (
    <Dialog open={open || isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {mode === 'edit' ? 'Edit Expense' : 'Add Expense'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter expense title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (PKR)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Input
                            readOnly
                            value={field.value ? format(field.value, 'dd/MM/yyyy') : ''}
                            placeholder="Pick a date"
                            className="w-full cursor-pointer rounded-md py-2 pl-3 pr-8 text-left font-normal"
                            icon={<SVGIcon icon="calendar" />}
                            onClick={() => {}}
                          />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
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
                {mode === 'create' ? 'Add' : 'Edit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
