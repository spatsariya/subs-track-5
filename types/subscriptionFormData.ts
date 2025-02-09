import type { Subscription } from "@/types/subscription"

export interface SubscriptionFormData extends Omit<Subscription, "id" | "totalSpent"> {
  splitEqually?: boolean
}

