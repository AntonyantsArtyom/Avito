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

  applyFilters: async (signal?: AbortSignal) => {
    await get().fetchAllStatistics(signal);
  },

  fetchSummaryStats: async (signal?: AbortSignal) => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/summary?${params.toString()}`, { signal });

    set({
      summaryStats: response.data,
    });
  },

  fetchActivityChart: async (signal?: AbortSignal) => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/chart/activity?${params.toString()}`, { signal });

    set({
      activityChart: response.data,
    });
  },

  fetchDecisionsChart: async (signal?: AbortSignal) => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/chart/decisions?${params.toString()}`, { signal });

    set({
      decisionsChart: response.data,
    });
  },

  fetchCategoriesChart: async (signal?: AbortSignal) => {
    const { filters } = get();
    const params = new URLSearchParams();
    params.append("period", filters.period);

    const response = await axiosInstance.get(`stats/chart/categories?${params.toString()}`, { signal });

    set({
      categoriesChart: response.data,
    });
  },

  fetchAllStatistics: async (signal?: AbortSignal) => {
    const { fetchSummaryStats, fetchActivityChart, fetchDecisionsChart, fetchCategoriesChart } = get();
    await Promise.all([fetchSummaryStats(signal), fetchActivityChart(signal), fetchDecisionsChart(signal), fetchCategoriesChart(signal)]);
  },
}));
