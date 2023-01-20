
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "In Progress: Next.js",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Pending: React Native",
      status: "pending",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Done: Web3.0",
      status: "done",
      createdAt: Date.now() - 10000000000,
    },
  ],
};
