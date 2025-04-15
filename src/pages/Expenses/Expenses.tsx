import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/Table/Table';

import AddExpenseDialog from './components/AddExpenseDialog';
import CustomPagination from '@app/components/CustomPagination';
import DeleteExpenseDialog from './components/DeleteExpenseDialog';
import ExpenseFilters from './components/ExpenseFilters';
import { ExpensePayload } from './components/AddExpenseDialog/types';
import Loader from '@app/components/Loader/Loader';
import PaginationInfo from '@app/components/PaginationInfo';
import { Progress } from '@app/components/Progress/Progress';
import SVGIcon from '@app/components/SVGIcon';
import { Separator } from '@app/components/Separator/Separator';
import { SortOption } from '@app/store/apis/expense/types';
import TitleSection from '@app/components/TitleSection';
import { format } from 'date-fns';
import { useDebounce } from '@app/hooks/useDebounce';
import { useGetAllExpensesQuery } from '@app/store/apis/expense';

const Expenses = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [editExpense, setEditExpense] = useState<ExpensePayload | null>(null);
  const [deleteExpense, setDeleteExpense] = useState<ExpensePayload | null>(null);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading } = useGetAllExpensesQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    sortOption: sortBy,
    ...(selectedDate && { sortDate: format(new Date(selectedDate), 'yyyy-MM-dd') }),
  });

  if (isLoading) return <Loader isFullPageLoader />;

  return (
    <div className="flex flex-col gap-2">
      {/* Header with title and AddExpenseDialog */}
      <div className="flex flex-row flex-wrap items-center justify-between">
        <h4 className="text-[32px] font-semibold text-text">Expenses</h4>
        <AddExpenseDialog
          mode={!!editExpense ? 'edit' : 'create'}
          setIsOpen={setEditExpense}
          isOpen={!!editExpense}
          defaultValues={{ ...editExpense }}
          id={editExpense?._id ?? ''}
        />
      </div>

      {/* Delete expense confirmation dialog */}
      {!!deleteExpense && (
        <DeleteExpenseDialog
          setIsOpen={setDeleteExpense}
          isOpen={!!deleteExpense}
          expense={{ ...(deleteExpense ?? {}) }}
        />
      )}

      <Separator className="mb-3 bg-border" />

      <div className="rounded-md shadow-md">
        {/* Filters Section */}
        <TitleSection title="Expense" className="!px-4">
          <ExpenseFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </TitleSection>

        {/* Expenses Table */}
        <Table className="w-full border border-t-0 border-border" aria-label="Expenses table">
          <TableHeader>
            <TableRow className="bg-[#F7F7F7]">
              {['Expense', 'Total Expenditure', 'Price(PKR)', 'Date', 'User'].map(header => (
                <TableHead key={header} className="text-sm font-semibold text-text">
                  {header}
                </TableHead>
              ))}
              <TableHead className="text-right text-sm font-semibold text-text">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping expenses into rows */}
            {data?.expenses?.map(expense => (
              <TableRow key={expense.id} className="bg-white">
                <TableCell className="text-sm text-text">{expense.title}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2" aria-label="Expenditure progress">
                    <Progress value={40} className="h-2" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                    <span className="text-sm font-medium text-[#344054]">50%</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-text">{expense.price}</TableCell>
                <TableCell className="text-sm text-text">{format(new Date(expense.date), 'dd MMM yyyy')}</TableCell>
                <TableCell className="text-sm text-text">
                  {`${expense?.userId?.firstName} ${expense?.userId?.lastName}`}
                </TableCell>
                <TableCell className="flex flex-row items-center justify-end gap-6 text-right">
                  {/* Delete expense icon */}
                  <SVGIcon
                    icon="trash"
                    className="cursor-pointer"
                    onClick={() => setDeleteExpense(expense)}
                    aria-label={`Delete expense ${expense.title}`}
                  />
                  {/* Edit expense icon */}
                  <SVGIcon
                    icon="pencil"
                    className="cursor-pointer"
                    onClick={() => setEditExpense(expense)}
                    aria-label={`Edit expense ${expense.title}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="r flex items-center justify-between border-x bg-white p-4">
          <PaginationInfo total={data?.total ?? 0} page={page} />
          <CustomPagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={setPage}
            className="flex items-center justify-end gap-2 text-text"
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
