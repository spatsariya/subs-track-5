import type { Subscription } from "@/types/subscription"

// This is a mock function. In a real application, you would fetch this data from your database or API.
export async function getSubscriptions(): Promise<Subscription[]> {
  // For demonstration purposes, we're returning a static array of subscriptions.
  // In a real application, you would fetch this data from your database or API.
  return [
    {
      id: "1",
      category: "entertainment",
      name: "Netflix",
      serviceUrl: "https://www.netflix.com",
      amount: 15.99,
      currency: "USD",
      cycle: "monthly",
      autoRenewal: true,
      startDate: "2023-01-01",
      isShared: false,
      sharedUsers: [],
      subscribedDate: "2023-01-01",
      totalSpent: 191.88,
    },
    {
      id: "2",
      category: "productivity",
      name: "Microsoft 365",
      serviceUrl: "https://www.microsoft.com/microsoft-365",
      amount: 69.99,
      currency: "USD",
      cycle: "annually",
      autoRenewal: true,
      startDate: "2023-02-15",
      isShared: false,
      sharedUsers: [],
      subscribedDate: "2023-02-15",
      totalSpent: 69.99,
    },
    // Add more mock subscriptions as needed
  ]
}

