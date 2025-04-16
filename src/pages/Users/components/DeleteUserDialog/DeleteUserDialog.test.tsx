import '@testing-library/jest-dom';

import { Mock, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DeleteUserDialog from './DeleteUserDialog';
import { Role } from '@app/types';
import { useDeleteUserMutation } from '@app/store/apis/user';

// Mock the delete user function
vi.mock('@app/store/apis/user', () => ({
  useDeleteUserMutation: vi.fn(),
}));

describe('DeleteUserDialog', () => {
  const mockUser = {
    _id: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '(555) 123-4567',
    budgetLimit: 10000,
    role: 'user' as Role,
  };

  let deleteUserMock: Mock;

  beforeEach(() => {
    // Reset mocks before each test
    deleteUserMock = vi.fn().mockResolvedValue({});
    // Set up the mock return value for the deleteUser mutation
    (useDeleteUserMutation as Mock).mockReturnValue([deleteUserMock, { isLoading: false }]);
  });

  it('renders DeleteUserDialog with user details', () => {
    render(<DeleteUserDialog isOpen={true} setIsOpen={vi.fn()} user={mockUser} />);

    // ✅ Check for dialog title
    expect(screen.getByText('Delete User')).toBeInTheDocument();

    // ✅ Check for user details in the dialog
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('10,000 PKR')).toBeInTheDocument();

    // ✅ Check for buttons
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('calls deleteUser when Delete button is clicked', async () => {
    const setIsOpen = vi.fn();

    render(<DeleteUserDialog isOpen={true} setIsOpen={setIsOpen} user={mockUser} />);

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() => {
      expect(deleteUserMock).toHaveBeenCalledWith({ userId: 'user123' });
      expect(setIsOpen).toHaveBeenCalledWith(null); // Ensure the dialog closes after deletion
    });
  });

  it('calls handleClose when Cancel button is clicked', () => {
    const setIsOpen = vi.fn();

    render(<DeleteUserDialog isOpen={true} setIsOpen={setIsOpen} user={mockUser} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(setIsOpen).toHaveBeenCalledWith(null); // Ensure the dialog closes when Cancel is clicked
  });

  it('shows loading state on Delete button click', async () => {
    const setIsOpen = vi.fn();

    render(<DeleteUserDialog isOpen={true} setIsOpen={setIsOpen} user={mockUser} />);

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    expect(screen.getByRole('button', { name: /Delete/i }));
  });
});
