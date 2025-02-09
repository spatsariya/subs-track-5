"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubscriptionForm } from "@/components/subscription-form"
import type { SubscriptionFormData, Subscription } from "@/types/subscription"
import { auth, database } from "@/lib/firebase"
import { ref, push } from "firebase/database"

export default function AddSubscriptionPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = (data: SubscriptionFormData) => {
    setError("")

    const user = auth.currentUser
    if (!user) {
      setError("You must be logged in to add a subscription.")
      return
    }

    try {
      const newSubscription: Omit<Subscription, "id"> = {
        ...data,
        category: data.category as Subscription["category"],
        subscribedDate: new Date().toISOString(),
        totalSpent: 0,
      }

      const subscriptionsRef = ref(database, `users/${user.uid}/subscriptions`)
      push(subscriptionsRef, newSubscription)
        .then(() => {
          router.push("/subscriptions")
        })
        .catch((error) => {
          console.error("Error adding subscription:", error)
          setError("Failed to add subscription. Please try again.")
        })
    } catch (err) {
      console.error("Error in handleSubmit:", err)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/dashboard" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">Add Subscription</h1>
      </header>

      <div className="p-4">
        <SubscriptionForm onSubmit={handleSubmit} onCancel={() => router.push("/dashboard")} />
        {error && <p className="mt-4 text-[#d21c1c]">{error}</p>}
      </div>
    </div>
  )
}

