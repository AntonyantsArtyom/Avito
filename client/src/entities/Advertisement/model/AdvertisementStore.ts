import { create } from "zustand";
import type { IAdvertisement } from "../types/Advertisement";

interface IAdvertisementStore {
  currentPage: number;
  totalPages: number;
  advertisements: IAdvertisement[];
  fetchAdvertisements: (page?: number) => Promise<void>;
  goToPage: (page: number) => void;
}

export const useAdvertisementStore = create<IAdvertisementStore>((set, get) => ({
  advertisements: [],
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  limit: 15,

  fetchAdvertisements: async (page = 1) => {
    const limit = 10;
    const response = await fetch(`http://localhost:3001/api/v1/ads?page=${page}&limit=${limit}`);
    const data = await response.json();
    set({ advertisements: data.ads, totalPages: data.pagination.totalPages, currentPage: data.pagination.currentPage });
  },

  goToPage: (page) => {
    const state = get();
    state.fetchAdvertisements(page);
  },
}));
