import { getBillingCycles } from "@/lib/api" // We'll implement this function
import ViewBillingCyclePage from "./BillingCyclePage"

export async function generateStaticParams() {
  const billingCycles = await getBillingCycles()

  return billingCycles.map((cycle) => ({
    id: cycle.id,
  }))
}

export default ViewBillingCyclePage

