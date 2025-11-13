import { create } from "zustand";
import type { IAdvertisement } from "../types/Advertisement";

interface IAdvertisementStore {
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  advertisements: IAdvertisement[];

  filters: {
    status: string[];
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    search: string;
  };

  fetchAdvertisements: (page?: number) => Promise<void>;
  goToPage: (page: number) => void;

  setFilters: (filters: Partial<IAdvertisementStore["filters"]>) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

export const useAdvertisementStore = create<IAdvertisementStore>((set, get) => ({
  advertisements: [],
  limit: 15,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  filters: {
    status: [],
    categoryId: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: "",
  },

  fetchAdvertisements: async (page = 1) => {
    const { limit, filters } = get();

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    filters.status.forEach((status) => {
      params.append("status", status);
    });

    if (filters.categoryId) {
      params.append("categoryId", filters.categoryId.toString());
    }

    if (filters.minPrice !== undefined) {
      params.append("minPrice", filters.minPrice.toString());
    }

    if (filters.maxPrice !== undefined) {
      params.append("maxPrice", filters.maxPrice.toString());
    }

    if (filters.search) {
      params.append("search", filters.search);
    }

    const response = await fetch(`http://localhost:3001/api/v1/ads?${params.toString()}`);
    const data = await response.json();

    set({
      advertisements: data.ads,
      totalPages: data.pagination.totalPages,
      currentPage: data.pagination.currentPage,
      totalItems: data.pagination.totalItems,
    });
  },

  goToPage: (page) => {
    const state = get();
    state.fetchAdvertisements(page);
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        status: [],
        categoryId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        search: "",
      },
    });
  },

  applyFilters: () => {
    const state = get();
    state.fetchAdvertisements(1);
  },
}));
