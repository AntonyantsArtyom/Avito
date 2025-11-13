import { create } from "zustand";
import type { IAdvertisement } from "../types/Advertisement";

interface IAdvertisementStore {
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  advertisements: IAdvertisement[];
  fetchAdvertisements: (page?: number) => Promise<void>;
  goToPage: (page: number) => void;
}

export const useAdvertisementStore = create<IAdvertisementStore>((set, get) => ({
  advertisements: [],
  limit: 15,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  fetchAdvertisements: async (page = 1) => {
    const { limit } = get();
    const response = await fetch(`http://localhost:3001/api/v1/ads?page=${page}&limit=${limit}`);
    const data = await response.json();
    set({ advertisements: data.ads, totalPages: data.pagination.totalPages, currentPage: data.pagination.currentPage, totalItems: data.pagination.totalItems });
  },

  goToPage: (page) => {
    const state = get();
    state.fetchAdvertisements(page);
  },
}));
