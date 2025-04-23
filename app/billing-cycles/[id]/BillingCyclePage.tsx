"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import type { BillingCycle } from "@/types/billing-cycle"
import { auth, database } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { ref, get, set, remove } from "firebase/database"

export default function ViewBillingCyclePage() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [cycle, setCycle] = useState<BillingCycle | null>(null)
  const [error, setError] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        const cycleRef = ref(database, `users/${currentUser.uid}/billingCycles/${params.id}`)
        get(cycleRef).then((snapshot) => {
          if (snapshot.exists()) {
            setCycle(snapshot.val())
          } else {
            router.push("/billing-cycles")
          }
        })
      }
    })

    return () => unsubscribe()
  }, [params.id, router])

  const handleDelete = () => {
    if (!user || !cycle) return

    const cycleRef = ref(database, `users/${user.uid}/billingCycles/${cycle.id}`)
    remove(cycleRef)
      .then(() => {
        router.push("/billing-cycles")
      })
      .catch((error) => {
        console.error("Error deleting billing cycle:", error)
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !cycle) return
    setError("")

    // Validate form
    if (!cycle.name.trim()) {
      setError("Billing cycle name is required")
      return
    }
    if (!cycle.days || cycle.days <= 0) {
      setError("Number of days must be greater than 0")
      return
    }

    const cycleRef = ref(database, `users/${user.uid}/billingCycles/${cycle.id}`)
    set(cycleRef, cycle)
      .then(() => {
        setIsEditing(false)
      })
      .catch((error) => {
        console.error("Error updating billing cycle:", error)
        setError("Failed to update billing cycle. Please try again.")
      })
  }

  if (!cycle) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/billing-cycles" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">
          {isEditing ? "Update Billing Cycle" : "View Billing Cycle"}
        </h1>
      </header>

      <div className="p-4">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#ecf8f7] rounded-lg space-y-4">
              <div>
                <label className="text-sm text-[#4f5e71]">Billing cycle name</label>
                <div className="text-[#252a31] font-medium">{cycle.name}</div>
              </div>
              <div>
                <label className="text-sm text-[#4f5e71]">Number of days</label>
                <div className="text-[#252a31] font-medium">{cycle.days}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={handleDelete}
                className="flex-1 border-[#D21C1C] text-[#D21C1C] hover:bg-red-50"
              >
                <Trash className="w-5 h-5 mr-2" />
                Delete
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-[#00a58e] text-[#ffffff] hover:bg-[#007f6d]"
              >
                <Pencil className="w-5 h-5 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#252a31]">Billing cycle name</label>
                <Input
                  value={cycle.name}
                  onChange={(e) => setCycle({ ...cycle, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#252a31]">Number of days</label>
                <Input
                  type="number"
                  min="1"
                  value={cycle.days}
                  onChange={(e) => setCycle({ ...cycle, days: Number.parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>

              {error && <div className="text-[#D21C1C] text-sm">{error}</div>}
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-[#ecf8f7] text-[#00a58e] hover:bg-[#ecf8f7]/80"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#00a58e] text-[#ffffff] hover:bg-[#007f6d]">
                Update/Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

