import { axiosInstance } from "../../../shared/api/axiosInstance";
import type { IStatisticsStore } from "../types/Statistics";
import { create } from "zustand";

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

  applyFilters: async () => {
    await get().fetchAllStatistics();
  },

  fetchSummaryStats: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/summary?${params.toString()}`);

    set({
      summaryStats: response.data,
    });
  },

  fetchActivityChart: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/chart/activity?${params.toString()}`);

    set({
      activityChart: response.data,
    });
  },

  fetchDecisionsChart: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/chart/decisions?${params.toString()}`);

    set({
      decisionsChart: response.data,
    });
  },

  fetchCategoriesChart: async () => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/chart/categories?${params.toString()}`);

    set({
      categoriesChart: response.data,
    });
  },

  fetchAllStatistics: async () => {
    const { fetchSummaryStats, fetchActivityChart, fetchDecisionsChart, fetchCategoriesChart } = get();
    await Promise.all([fetchSummaryStats(), fetchActivityChart(), fetchDecisionsChart(), fetchCategoriesChart()]);
  },
}));
