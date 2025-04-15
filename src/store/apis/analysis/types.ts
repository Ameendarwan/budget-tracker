export interface BudgetTrendEntry {
  month: string;
  value: number;
}

export interface BudgetTrend {
  userId: string;
  range: 'Last Month' | 'Last 6 Months' | 'Last 12 Months';
  data: BudgetTrendEntry[];
}
