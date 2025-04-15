import { Popover, PopoverTrigger } from '@app/components/Popover/Popover';
import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/Select/Select';

import { Calendar } from '@app/components/Calendar/Calendar';
import { ExpenseFiltersProps } from './types';
import { Input } from '@app/components/Input/Input';
import { PopoverContent } from '@radix-ui/react-popover';
import SVGIcon from '@app/components/SVGIcon';
import { format } from 'date-fns';

const sortOptions = [
  { label: 'Price: Highest to lowest', value: 'price_desc' },
  { label: 'Price: Lowest to highest', value: 'price_asc' },
  { label: 'Date: Newest to oldest', value: 'date_desc' },
  { label: 'Date: Oldest to newest', value: 'date_asc' },
];

const ExpenseFilters: FC<ExpenseFiltersProps> = ({
  searchValue,
  setSearchValue,
  sortBy,
  setSortBy,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="flex flex-row items-center justify-end gap-3 max-md:flex-wrap">
      {/* Sort by dropdown */}
      <div className="flex flex-row items-center">
        <span className="flex h-[32px] min-w-[65px] items-center justify-center rounded-bl-md rounded-tl-md border border-r-0 bg-[#E1E8F2] text-xs text-grayShades-shade4">
          Sort By
        </span>
        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger
            aria-label="Sort by option"
            className="h-[32px] rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-sm font-medium text-[#111827] shadow-none hover:bg-[#F3F4F6] focus:ring-0 md:min-w-36">
            <SelectValue placeholder="All" />
          </SelectTrigger>

          <SelectContent side="bottom" align="end" className="rounded-md border border-gray-200 bg-white shadow-lg">
            <SelectGroup>
              {sortOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer px-4 py-2 pl-8 text-sm text-[#374151] hover:bg-gray-100 focus:bg-gray-100"
                  aria-label={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Date picker using popover */}
      <div className="flex flex-row items-center">
        <span className="flex h-[32px] min-w-[65px] items-center justify-center rounded-bl-md rounded-tl-md border border-r-0 bg-[#E1E8F2] text-xs text-grayShades-shade4">
          By Date
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Input
              readOnly
              value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
              placeholder="Pick a date"
              aria-label="Pick a date"
              className="h-[32px] w-full cursor-pointer rounded-md rounded-bl-none rounded-tl-none py-2 pl-3 pr-8 text-left font-normal md:min-w-[150px]"
              icon={<SVGIcon icon="calendar" />}
            />
          </PopoverTrigger>
          <PopoverContent className="!z-50 w-auto bg-white p-0 !shadow-custom">
            <Calendar
              mode="single"
              disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search input field */}
      <div className="w-full lg:w-[370px]">
        <Input
          placeholder="Search"
          aria-label="Search expenses"
          value={searchValue}
          onChange={ev => setSearchValue(ev.target.value)}
          className="h-[32px] w-full bg-white placeholder-[#BCC0C9]"
          startIcon={<SVGIcon icon="search" />}
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
