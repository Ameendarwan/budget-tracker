import React from 'react';

interface PaginationInfoProps {
  page: number;
  pageSize?: number;
  total: number;
  className?: string;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({ page, pageSize = 10, total, className = '' }) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <span className={`whitespace-nowrap text-sm text-grayShades-shade4 ${className}`}>
      Showing {start}–{end} of {total}
    </span>
  );
};

export default PaginationInfo;
