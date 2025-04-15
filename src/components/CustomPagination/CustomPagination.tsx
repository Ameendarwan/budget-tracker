import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@app/components/Pagination/Pagination';

import { Button } from '@app/components/Button/Button';
import { FC } from 'react';

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  className?: string;
}

const getPageList = (page: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
    }
  }
  return pages;
};

const CustomPagination: FC<CustomPaginationProps> = ({ page, totalPages, onPageChange, className = '' }) => {
  const pages = getPageList(page, totalPages);

  return (
    <Pagination className={`flex justify-center ${className}`}>
      <PaginationContent className="flex items-center space-x-1">
        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="text-gray-500 hover:!bg-primary hover:!text-white">
            <PaginationPrevious />
          </Button>
        </PaginationItem>

        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {typeof p === 'number' ? (
              <Button
                variant={p === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(p)}
                className="rounded-md px-3 py-1 text-sm hover:!bg-primary hover:!text-white">
                {p}
              </Button>
            ) : (
              <span className="px-2 py-1 text-sm text-gray-500">...</span>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="text-gray-500 hover:text-black">
            <PaginationNext />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
