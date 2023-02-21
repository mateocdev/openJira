export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  status: EntryStatus; // pending, in progress, done
}

export type EntryStatus = "pending" | "in-progress" | "done";