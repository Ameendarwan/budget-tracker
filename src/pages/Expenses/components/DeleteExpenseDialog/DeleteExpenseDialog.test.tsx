import '@testing-library/jest-dom';

import { Mock, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DeleteExpenseDialog from './DeleteExpenseDialog';
import { useDeleteExpenseMutation } from '@app/store/apis/expense';

// Mock API functions
vi.mock('@app/store/apis/expense', () => ({
  useDeleteExpenseMutation: vi.fn(),
}));

describe('DeleteExpenseDialog', () => {
  const mockExpense = {
    _id: '123',
    title: 'Lunch',
    price: 300,
    date: '2025-04-16',
  };

  let deleteExpenseMock: Mock;

  beforeEach(() => {
    // Reset the mock before each test
    deleteExpenseMock = vi.fn().mockResolvedValue({});

    // Ensure the mock is properly set for useDeleteExpenseMutation
    (useDeleteExpenseMutation as Mock).mockReturnValue([deleteExpenseMock, { isLoading: false }]);
  });

  it('renders DeleteExpenseDialog with expense details', () => {
    render(<DeleteExpenseDialog expense={mockExpense} isOpen={true} setIsOpen={vi.fn()} />);

    // ✅ Check for dialog title
    expect(screen.getByText('Delete Expense')).toBeInTheDocument();

    // ✅ Check for expense details in the dialog
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText(mockExpense.title)).toBeInTheDocument();
    expect(screen.getByText('Price(PKR)')).toBeInTheDocument();
    expect(screen.getByText(mockExpense.price.toString())).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText(mockExpense.date)).toBeInTheDocument();

    // ✅ Check for buttons
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('calls handleDeleteExpense when Delete button is clicked', async () => {
    const setIsOpen = vi.fn();

    render(<DeleteExpenseDialog expense={mockExpense} isOpen={true} setIsOpen={setIsOpen} />);

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() => {
      expect(deleteExpenseMock).toHaveBeenCalledWith({ expenseId: mockExpense._id });
      expect(setIsOpen).toHaveBeenCalledWith(null); // Check if setIsOpen is called to close the dialog
    });
  });

  it('calls handleClose when Cancel button is clicked', () => {
    const setIsOpen = vi.fn();

    render(<DeleteExpenseDialog expense={mockExpense} isOpen={true} setIsOpen={setIsOpen} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(setIsOpen).toHaveBeenCalledWith(null); // Check if setIsOpen is called to close the dialog
  });

  it('handles error in deletion gracefully', async () => {
    const setIsOpen = vi.fn();
    const errorMock = vi.fn().mockRejectedValue(new Error('Failed to delete expense'));

    // Mock the deleteExpense function to reject the promise
    (useDeleteExpenseMutation as Mock).mockReturnValue([errorMock, { isLoading: false }]);

    render(<DeleteExpenseDialog expense={mockExpense} isOpen={true} setIsOpen={setIsOpen} />);

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() => {
      expect(errorMock).toHaveBeenCalled();
      expect(setIsOpen).not.toHaveBeenCalled(); // Ensure setIsOpen is not called on failure
    });
  });
});
