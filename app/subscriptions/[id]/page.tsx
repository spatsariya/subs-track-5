import { getSubscriptions } from "@/lib/api"
import ViewSubscriptionPage from "./SubscriptionPage"

export async function generateStaticParams() {
  const subscriptions = await getSubscriptions()

  return subscriptions.map((subscription) => ({
    id: subscription.id,
  }))
}

export default ViewSubscriptionPage

