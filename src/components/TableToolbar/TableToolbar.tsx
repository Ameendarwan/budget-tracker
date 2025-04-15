import { Popover, PopoverContent, PopoverTrigger } from '@app/components/Popover/Popover';

import { Button } from '@app/components/Button/Button';
import { Calendar } from '@app/components/Calendar/Calendar'; // Assuming shadcn calendar component
import { CalendarIcon } from 'lucide-react';
import { Input } from '@app/components/Input/Input';
import React from 'react';
import { format } from 'date-fns';

const TableToolbar = ({ date, setDate }: { date?: Date | undefined; setDate?: (date: Date | undefined) => void }) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Button variant="outline" className="px-3 text-sm">
          Sort By
        </Button>

        <select className="rounded-md border bg-white px-3 py-2 text-sm text-gray-700">
          <option>All</option>
          <option>Newest</option>
          <option>Oldest</option>
        </select>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[160px] justify-between pl-3 text-left text-sm font-normal">
              {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
              <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>

        {/* Search Input */}
        <Input placeholder="Search" className="w-[200px] text-sm" />
      </div>
    </div>
  );
};

export default TableToolbar;
