import { create } from "zustand";
import type { IAdvertisementStore } from "../types/Advertisement";
import axios from "axios";

export const useAdvertisementStore = create<IAdvertisementStore>((set, get) => ({
  advertisements: [],
  advertisement: null,
  limit: 10,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  filters: {
    status: [],
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  fetchAdvertisements: async (page = 1) => {
    const { limit, filters } = get();

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("sortBy", filters.sortBy);
    params.append("sortOrder", filters.sortOrder);

    filters.status.forEach((status) => {
      params.append("status", status);
    });

    if (filters.category) {
      params.append("category", filters.category.toString());
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

    const response = await axios.get(`http://localhost:3001/api/v1/ads?${params.toString()}`);

    set({
      advertisements: response.data.ads,
      totalPages: response.data.pagination.totalPages,
      currentPage: response.data.pagination.currentPage,
      totalItems: response.data.pagination.totalItems,
    });
  },

  fetchAdvertisement: async (id: number) => {
    const response = await axios.get(`http://localhost:3001/api/v1/ads/${id}`);
    set({ advertisement: response.data });
  },

  goToPage: async (page) => {
    const state = get();
    await state.fetchAdvertisements(page);
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
        category: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    });
  },

  applyFilters: () => {
    const state = get();
    state.fetchAdvertisements(1);
  },

  approveAdvertisement: async (id: number) => {
    const response = await axios.post(`http://localhost:3001/api/v1/ads/${id}/approve`);

    set((state) => ({
      advertisements: state.advertisements.map((advertisements) => (advertisements.id === id ? response.data.ad : advertisements)),
    }));

    if (get().advertisement?.id === id) {
      get().fetchAdvertisement(id);
    }
  },

  rejectAdvertisement: async (id: number, reason: string, comment: string = "") => {
    const response = await axios.post(`http://localhost:3001/api/v1/ads/${id}/reject`, { reason, comment });

    set((state) => ({
      advertisements: state.advertisements.map((advertisements) => (advertisements.id === id ? response.data.ad : advertisements)),
    }));

    if (get().advertisement?.id === id) {
      get().fetchAdvertisement(id);
    }
  },

  requestChangesAdvertisement: async (id: number, reason: string, comment: string = "") => {
    const response = await axios.post(`http://localhost:3001/api/v1/ads/${id}/request-changes`, { reason, comment });

    set((state) => ({
      advertisements: state.advertisements.map((advertisements) => (advertisements.id === id ? response.data.ad : advertisements)),
    }));

    if (get().advertisement?.id === id) {
      get().fetchAdvertisement(id);
    }
  },

  getNextAdvertisementId: async () => {
    const { advertisement, advertisements, currentPage, goToPage, totalPages } = get();
    const currentIndex = advertisements.findIndex((advertisements) => advertisements.id === advertisement?.id);

    if (currentIndex < advertisements.length - 1) {
      return advertisements[currentIndex + 1]?.id;
    }

    if (currentPage < totalPages) {
      await goToPage(currentPage + 1);
      const { advertisements: newAds } = get();
      return newAds[0]?.id;
    }
  },

  getPrevAdvertisementId: async () => {
    const { advertisement, advertisements, currentPage, goToPage } = get();

    const currentIndex = advertisements.findIndex((ad) => ad.id === advertisement?.id);

    if (currentIndex > 0) {
      return advertisements[currentIndex - 1]?.id;
    }

    if (currentIndex === 0 && currentPage > 1) {
      await goToPage(currentPage - 1);
      const { advertisements: newAds } = get();
      return newAds[newAds.length - 1]?.id;
    }
  },
}));
