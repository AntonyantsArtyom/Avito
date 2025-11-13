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
