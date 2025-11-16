import { create } from "zustand";
import axios from "axios";
import type { IStatisticsStore } from "../types/Statistics";

export const useStatisticsStore = create<IStatisticsStore>((set, get) => ({
  summaryStats: null,
  activityChart: [],
  decisionsChart: null,
  categoriesChart: null,

  filters: {
    period: "week",
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        period: "week",
      },
    });
  },

  fetchSummaryStats: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axios.get(`http://localhost:3001/api/v1/stats/summary?${params.toString()}`);

    set({
      summaryStats: response.data,
    });
  },

  fetchActivityChart: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axios.get(`http://localhost:3001/api/v1/stats/chart/activity?${params.toString()}`);

    set({
      activityChart: response.data,
    });
  },

  fetchDecisionsChart: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axios.get(`http://localhost:3001/api/v1/stats/chart/decisions?${params.toString()}`);

    set({
      decisionsChart: response.data,
    });
  },

  fetchCategoriesChart: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axios.get(`http://localhost:3001/api/v1/stats/chart/categories?${params.toString()}`);

    set({
      categoriesChart: response.data,
    });
  },

  fetchAllStatistics: async () => {
    const { fetchSummaryStats, fetchActivityChart, fetchDecisionsChart, fetchCategoriesChart } = get();
    await Promise.all([fetchSummaryStats(), fetchActivityChart(), fetchDecisionsChart(), fetchCategoriesChart()]);
  },
}));
