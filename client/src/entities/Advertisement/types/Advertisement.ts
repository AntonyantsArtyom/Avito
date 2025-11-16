export interface ISeller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string; // ISO date-time
}

interface IModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: "approved" | "rejected" | "requestChanges";
  reason: string | null;
  comment: string;
  timestamp: string; // ISO date-time
}

export interface IAdvertisement {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: "pending" | "approved" | "rejected" | "draft";
  priority: "normal" | "urgent";
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
  images: string[];
  seller: ISeller;
  characteristics: Record<string, string>;
  moderationHistory: IModerationHistory[];
}

export interface IAdvertisementStore {
  limit: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  advertisements: IAdvertisement[];
  advertisement: IAdvertisement | null;

  filters: {
    status: string[];
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search: string;
    sortBy: "createdAt" | "price" | "priority";
    sortOrder: "asc" | "desc";
  };

  fetchAdvertisements: (page?: number, signal?: AbortSignal) => Promise<void>;
  fetchAdvertisement: (id: number, signal?: AbortSignal) => Promise<void>;
  goToPage: (page: number, signal?: AbortSignal) => Promise<void>;
  applyFilters: (signal?: AbortSignal) => Promise<void>;

  setFilters: (filters: Partial<IAdvertisementStore["filters"]>) => void;
  clearFilters: () => void;

  approveAdvertisement: (id: number) => Promise<void>;
  rejectAdvertisement: (id: number, reason: string, comment?: string) => Promise<void>;
  requestChangesAdvertisement: (id: number, reason: string, comment?: string) => Promise<void>;

  getNextAdvertisementId: () => Promise<number | undefined>;
  getPrevAdvertisementId: () => Promise<number | undefined>;
}
