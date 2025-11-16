export interface SummaryStats {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityChartData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsChartData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface CategoriesChartData {
  [category: string]: number;
}

export interface IStatisticsStore {
  summaryStats: SummaryStats | null;
  activityChart: ActivityChartData[];
  decisionsChart: DecisionsChartData | null;
  categoriesChart: CategoriesChartData | null;
  filters: {
    period: "today" | "week" | "month";
  };

  setFilters: (filters: IStatisticsStore["filters"]) => void;
  clearFilters: () => void;
  fetchSummaryStats: () => Promise<void>;
  fetchActivityChart: () => Promise<void>;
  fetchDecisionsChart: () => Promise<void>;
  fetchCategoriesChart: () => Promise<void>;
  fetchAllStatistics: () => Promise<void>;
  applyFilters: () => Promise<void>;
}
