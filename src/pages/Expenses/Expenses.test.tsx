import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Expenses from '../Expenses';
import React from 'react';

// 🔌 Mock API hook
vi.mock('@app/store/apis/expense', () => ({
  useGetAllExpensesQuery: () => ({
    data: {
      expenses: [
        {
          id: '1',
          title: 'Lunch',
          price: 500,
          date: new Date().toISOString(),
          userId: {
            firstName: 'Alice',
            lastName: 'Smith',
          },
        },
      ],
      total: 1,
      totalPages: 1,
    },
    isLoading: false,
  }),
}));

// 🧩 Mocks for child components
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

vi.mock('@app/components/Progress/Progress', () => ({
  __esModule: true,
  Progress: ({ value }: any) => <div data-testid="progress">{`Progress: ${value}`}</div>,
}));

vi.mock('./components/ExpenseFilters', () => ({
  __esModule: true,
  default: () => <div data-testid="filters">Filters</div>,
}));

vi.mock('./components/AddExpenseDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="add-dialog">Add/Edit Dialog</div>,
}));

vi.mock('./components/DeleteExpenseDialog', () => ({
  __esModule: true,
  default: () => <div data-testid="delete-dialog">Delete Dialog</div>,
}));

describe('Expenses Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Expenses />
      </BrowserRouter>
    );
  });

  it('renders the Expenses title', () => {
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('renders filters and table', () => {
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /expenses table/i })).toBeInTheDocument();
  });

  it('renders a single expense row with actions', () => {
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
  });

  it('renders pagination info and controls', () => {
    expect(screen.getByTestId('pagination-info')).toHaveTextContent('Total: 1, Page: 1');
    expect(screen.getByTestId('pagination')).toHaveTextContent('Page: 1');
  });
});
