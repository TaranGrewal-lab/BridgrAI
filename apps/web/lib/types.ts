export interface Event {
  id: string;
  weddingId: string;
  name: string;
  eventType: string;
  side: "BRIDE" | "GROOM" | "SHARED";
  date: string | null;
  venueName: string | null;
  notes: string | null;
  budget: string;
  status: "PLANNING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export interface ChecklistItem {
  id: string;
  eventId: string;
  name: string;
  notes: string | null;
  isComplete: boolean;
  sortOrder: number;
}

export interface BudgetItem {
  id: string;
  eventId: string;
  name: string;
  category: string | null;
  estimatedCost: string;
  actualCost: string;
  depositPaid: string;
  status: "PLANNED" | "BOOKED" | "DEPOSIT_PAID" | "PAID_IN_FULL";
}
