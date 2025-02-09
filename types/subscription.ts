export type SubscriptionCycle = "monthly" | "quarterly" | "annually" | "one-time"

export type SubscriptionCategory = "entertainment" | "streaming" | "productivity" | "other"

export interface SharedUser {
  name: string
  email: string
  amount?: number
  percentage?: number
}

export interface Subscription {
  id: string
  category: SubscriptionCategory
  name: string
  serviceUrl?: string
  amount: number
  currency: string
  cycle: string
  autoRenewal: boolean
  startDate: string
  endDate?: string
  isShared: boolean
  sharedUsers: SharedUser[]
  subscribedDate: string
  totalSpent: number
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface BillingCycle {
  id: string
  name: string
  days: number
}

export interface SubscriptionFormData extends Omit<Subscription, "id" | "totalSpent" | "subscribedDate" | "category"> {
  splitEqually?: boolean
  cycleName?: string
  category: SubscriptionCategory | ""
}

