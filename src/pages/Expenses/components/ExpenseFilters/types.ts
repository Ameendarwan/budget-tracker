import { SortOption } from '@app/store/apis/expense/types';

export interface ExpenseFiltersProps {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (value: Date | undefined) => void;
}
