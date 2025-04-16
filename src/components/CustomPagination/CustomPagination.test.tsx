import { fireEvent, render, screen } from '@testing-library/react';

import CustomPagination from './CustomPagination';
import { vi } from 'vitest';

describe('CustomPagination Component', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(<CustomPagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<CustomPagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(<CustomPagination page={3} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<CustomPagination page={1} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<CustomPagination page={5} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });
});
