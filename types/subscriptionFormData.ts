import type { Subscription } from "@/types/subscription"

export type SubscriptionFormData = Omit<Subscription, "id" | "totalSpent">

