import '@testing-library/jest-dom';

import { Mock, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useCreateUserMutation, useUpdateUserMutation } from '@app/store/apis/user';

import AddUserDialog from './AddUserDialog';

// Mock the API functions
vi.mock('@app/store/apis/user', () => ({
  useCreateUserMutation: vi.fn(),
  useUpdateUserMutation: vi.fn(),
}));

describe('AddUserDialog', () => {
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '(555) 123-4567',
    budgetLimit: 10000,
  };

  let createUserMock: Mock;
  let updateUserMock: Mock;

  beforeEach(() => {
    // Reset mocks before each test
    createUserMock = vi.fn().mockResolvedValue({});
    updateUserMock = vi.fn().mockResolvedValue({});

    // Set up the mock return values
    (useCreateUserMutation as Mock).mockReturnValue([createUserMock, { isLoading: false }]);
    (useUpdateUserMutation as Mock).mockReturnValue([updateUserMock, { isLoading: false }]);
  });

  it('renders AddUserDialog with user form fields', () => {
    render(<AddUserDialog isOpen={true} setIsOpen={vi.fn()} defaultValues={mockUser} mode="create" />);

    // ✅ Check for dialog title
    const dialogTitle = screen.getAllByText('Add User');
    expect(dialogTitle.length).toBeGreaterThanOrEqual(2);

    // ✅ Check for form fields
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget Limit (PKR)')).toBeInTheDocument();

    // ✅ Check for buttons
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
  });

  it('calls createUser when Save Changes is clicked in create mode', async () => {
    const setIsOpen = vi.fn();

    render(<AddUserDialog isOpen={true} setIsOpen={setIsOpen} defaultValues={mockUser} mode="create" />);

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane.smith@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    await waitFor(() => {
      expect(createUserMock).toHaveBeenCalledWith({
        body: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phoneNumber: '(555) 123-4567',
          budgetLimit: 10000,
          role: 'admin',
        },
      });
      expect(setIsOpen).toHaveBeenCalledWith(null); // Ensure the dialog closes after submission
    });
  });

  it('calls updateUser when Save Changes is clicked in edit mode', async () => {
    const setIsOpen = vi.fn();

    render(<AddUserDialog isOpen={true} setIsOpen={setIsOpen} defaultValues={mockUser} mode="edit" id="123" />);

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane.smith@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    await waitFor(() => {
      expect(updateUserMock).toHaveBeenCalledWith({
        userId: '123',
        body: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          // phoneNumber and budgetLimit are excluded because they weren’t changed
        },
      });
      expect(setIsOpen).toHaveBeenCalledWith(null);
    });
  });

  it('calls handleClose when Cancel button is clicked', () => {
    const setIsOpen = vi.fn();

    render(<AddUserDialog isOpen={true} setIsOpen={setIsOpen} defaultValues={mockUser} mode="create" />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(setIsOpen).toHaveBeenCalledWith(null); // Ensure the dialog closes when Cancel is clicked
  });
});
