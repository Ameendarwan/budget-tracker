import { Card, CardContent } from '@app/components/Card/Card';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/Select/Select';

import AnalysisLineChart from './components/AnalysisLineChart';
import Loader from '@app/components/Loader/Loader';
import { Separator } from '@app/components/Separator/Separator';
import TitleSection from '@app/components/TitleSection';
import { useGetExpenseAnalysisQuery } from '@app/store/apis/expense';

const Analysis = () => {
  const [sortBy, setSortBy] = useState('');

  const { data, isLoading } = useGetExpenseAnalysisQuery({ range: sortBy });

  const sortOptions = [
    { label: 'Last Month', value: 'last_month' },
    { label: 'Last 6 months', value: 'last_6_months' },
    { label: 'Last 12 months', value: 'last_12_months' },
  ];

  if (isLoading) return <Loader isFullPageLoader />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row flex-wrap items-center justify-between">
        <h4 className="text-[32px] font-semibold text-text">Analysis</h4>
      </div>
      <Separator />
      <Card>
        <TitleSection title="Expense">
          <div className="flex flex-row items-center">
            <span className="flex h-[32px] w-[65px] items-center justify-center rounded-bl-md rounded-tl-md border border-r-0 bg-[#E1E8F2] text-xs text-grayShades-shade4">
              Range
            </span>
            <Select onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger className="h-[32px] w-36 rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-sm font-medium text-[#111827] shadow-none hover:bg-[#F3F4F6] focus:ring-0">
                <SelectValue placeholder="All" />
              </SelectTrigger>

              <SelectContent side="bottom" align="end" className="rounded-md border border-gray-200 bg-white shadow-lg">
                <SelectGroup>
                  {sortOptions.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer px-4 py-2 pl-8 text-sm text-[#374151] hover:bg-gray-100 focus:bg-gray-100">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </TitleSection>
        <CardContent className="p-4">
          <AnalysisLineChart data={data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
