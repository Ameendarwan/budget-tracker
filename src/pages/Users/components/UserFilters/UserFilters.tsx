import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/Select/Select';

import { Input } from '@app/components/Input/Input';
import SVGIcon from '@app/components/SVGIcon';
import { UserFiltersProps } from './types';

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Budget', value: 'budgetLimit' },
];

const UserFilters: FC<UserFiltersProps> = ({ searchValue, setSearchValue, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-row items-center justify-end gap-3">
      <div className="flex flex-row items-center">
        <span className="flex h-[40px] w-[65px] items-center justify-center rounded-bl-md rounded-tl-md border border-r-0 bg-[#E1E8F2] text-xs text-grayShades-shade4">
          Sort By
        </span>
        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger className="rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-sm font-medium text-[#111827] shadow-none hover:bg-[#F3F4F6] focus:ring-0 md:w-36">
            <SelectValue placeholder="All" />
          </SelectTrigger>

          <SelectContent side="bottom" align="end" className="rounded-md border border-gray-200 bg-white shadow-lg">
            <SelectGroup>
              {sortOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer px-4 py-2 pl-8 text-sm text-text hover:bg-gray-100 focus:bg-gray-100">
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-[370px]">
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={ev => setSearchValue(ev.target.value)}
          className="w-full bg-white placeholder-[#BCC0C9]"
          startIcon={<SVGIcon icon="search" />}
        />
      </div>
    </div>
  );
};

export default UserFilters;
