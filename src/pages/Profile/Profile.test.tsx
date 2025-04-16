import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile';
import React from 'react';

// Mock external modules
vi.mock('@app/store/apis/user', () => ({
  useGetUserQuery: () => ({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Software Engineer',
      phoneNumber: '123-456-7890',
      email: 'john.doe@example.com',
      city: 'New York',
      profilePic: '',
    },
    isLoading: false,
  }),
  useUploadProfilePictureMutation: () => [vi.fn(), { isLoading: false }],
}));

vi.mock('@app/utils/auth', () => ({
  default: {
    getDecodedToken: () => ({ id: '123' }),
  },
}));

vi.mock('@app/components/Toast/Toast', () => ({
  showSuccessToast: vi.fn(),
}));

// Mock components
vi.mock('./components/EditAccountDetails', () => ({
  default: () => <div>EditAccountDetails Component</div>,
}));

vi.mock('./components/ViewAccountDetails', () => ({
  default: () => <div>ViewAccountDetails Component</div>,
}));

// Optional: mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Profile Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
  });

  it('renders Profile page title', () => {
    expect(screen.getByLabelText('Profile page title')).toHaveTextContent('Profile');
  });

  it('renders ViewAccountDetails by default', () => {
    expect(screen.getByText('ViewAccountDetails Component')).toBeInTheDocument();
  });

  it('switches to EditAccountDetails on tab click', () => {
    const myAccountTab = screen.getByRole('tab', { name: /My account/i });
    fireEvent.click(myAccountTab);

    expect(screen.getByText('EditAccountDetails Component')).toBeInTheDocument();
  });
});
