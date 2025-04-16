import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Users from '../Users';

// 🔌 Mock API hook
vi.mock('@app/store/apis/user', () => ({
  useGetAllUsersQuery: () => ({
    data: {
      users: [
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890',
          role: 'admin',
        },
      ],
      total: 1,
      totalPages: 1,
    },
    isLoading: false,
  }),
}));

// 🧩 Utility & UI mocks
vi.mock('@app/hooks/useDebounce', () => ({
  useDebounce: (val: any) => val,
}));

vi.mock('@app/components/Loader/Loader', () => ({
  __esModule: true,
  default: ({ isFullPageLoader }: any) => (
    <div data-testid="loader">Loader - {isFullPageLoader ? 'Full Page' : 'Inline'}</div>
  ),
}));

vi.mock('@app/components/CustomPagination', () => ({
  __esModule: true,
  default: ({ page }: any) => <div data-testid="pagination">Page: {page}</div>,
}));

vi.mock('@app/components/PaginationInfo', () => ({
  __esModule: true,
  default: ({ total, page }: any) => <div data-testid="pagination-info">{`Total: ${total}, Page: ${page}`}</div>,
}));

vi.mock('./components/UserFilters', () => ({
  __esModule: true,
  default: () => <div data-testid="filters">User Filters</div>,
}));

vi.mock('./components/AddUserDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="add-user-dialog">Add/Edit User Dialog</div>,
}));

vi.mock('./components/DeleteUserDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="delete-user-dialog">Delete User Dialog</div>,
}));

describe('Users Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );
  });

  it('renders the Users page title', () => {
    expect(screen.getByLabelText('Users page title')).toBeInTheDocument();
    const usersHeadings = screen.getAllByText('Users');
    expect(usersHeadings.length).toBeGreaterThanOrEqual(2);
  });

  it('renders filters and table structure', () => {
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /users table/i })).toBeInTheDocument();
  });

  it('renders a user row with proper data', () => {
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('renders pagination info and controls', () => {
    expect(screen.getByTestId('pagination-info')).toHaveTextContent('Total: 1, Page: 1');
    expect(screen.getByTestId('pagination')).toHaveTextContent('Page: 1');
  });
});
