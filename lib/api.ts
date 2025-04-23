import { database } from "./firebase"
import { ref, get } from "firebase/database"
import type { Subscription } from "@/types/subscription"
import type { BillingCycle } from "@/types/billing-cycle"
import type { Category } from "@/types/category"

export async function getSubscriptions(): Promise<Subscription[]> {
  const subscriptionsRef = ref(database, "subscriptions")
  const snapshot = await get(subscriptionsRef)

  if (snapshot.exists()) {
    return Object.values(snapshot.val())
  }

  return []
}

export async function getBillingCycles(): Promise<BillingCycle[]> {
  const billingCyclesRef = ref(database, "billingCycles")
  const snapshot = await get(billingCyclesRef)

  if (snapshot.exists()) {
    return Object.values(snapshot.val())
  }

  return []
}

export async function getCategories(): Promise<Category[]> {
  const categoriesRef = ref(database, "categories")
  const snapshot = await get(categoriesRef)

  if (snapshot.exists()) {
    return Object.values(snapshot.val())
  }

  return []
}

