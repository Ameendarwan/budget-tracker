import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AddExpenseDialog from './AddExpenseDialog';
import { vi } from 'vitest';

// Mock API functions
vi.mock('@app/store/apis/expense', () => ({
  useCreateExpenseMutation: () => [vi.fn().mockResolvedValue({}), { isLoading: false }],
  useUpdateExpenseMutation: () => [vi.fn().mockResolvedValue({}), { isLoading: false }],
}));

describe('AddExpenseDialog', () => {
  it('renders AddExpenseDialog in create mode', async () => {
    render(
      <AddExpenseDialog
        isOpen={true}
        setIsOpen={vi.fn()}
        mode="create"
        defaultValues={{
          title: '',
          price: 0,
          date: `${new Date()}`,
        }}
      />
    );

    const addButton = screen.getAllByText('Add Expense');
    expect(addButton.length).toBeGreaterThanOrEqual(2);

    // Labels
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price \(PKR\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();

    // Submit and Cancel buttons
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('renders AddExpenseDialog in edit mode', async () => {
    render(
      <AddExpenseDialog
        isOpen={true}
        setIsOpen={vi.fn()}
        mode="edit"
        id="123"
        defaultValues={{
          title: 'Lunch',
          price: 300,
          date: new Date().toString(),
        }}
      />
    );

    expect(screen.getByText('Edit Expense')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Lunch')).toBeInTheDocument();
    expect(screen.getByDisplayValue('300')).toBeInTheDocument();
  });

  it('calls submit on form submit', async () => {
    const setIsOpen = vi.fn();
    render(
      <AddExpenseDialog
        isOpen={true}
        setIsOpen={setIsOpen}
        mode="create"
        defaultValues={{ title: '', price: 0, date: `${new Date()}` }}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter expense title/i), {
      target: { value: 'Dinner' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
      target: { value: '250' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    await waitFor(() => {
      expect(setIsOpen).toHaveBeenCalled(); // Dialog should close
    });
  });
});
