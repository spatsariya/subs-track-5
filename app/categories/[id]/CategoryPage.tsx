"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { auth, database } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import type { Category } from "@/types/category"

export default function ViewCategoryPage() {
  const params = useParams()
  const [category, setCategory] = useState<Category | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const categoryRef = ref(database, `users/${user.uid}/categories/${params.id}`)
        get(categoryRef).then((snapshot) => {
          if (snapshot.exists()) {
            setCategory(snapshot.val())
          }
        })
      }
    })
    return () => unsubscribe()
  }, [params.id])

  if (!category) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/categories" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">{category.name}</h1>
      </header>

      <div className="p-4">
        <div className="p-4 bg-[#ecf8f7] rounded-lg space-y-4">
          <div>
            <label className="text-sm text-[#4f5e71]">Category Name</label>
            <div className="text-[#252a31] font-medium">{category.name}</div>
          </div>
          <div>
            <label className="text-sm text-[#4f5e71]">Icon</label>
            <div className="text-[#252a31] text-2xl">{category.icon}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

