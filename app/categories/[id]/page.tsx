import { getCategories } from "@/lib/api"
import ViewCategoryPage from "./CategoryPage"

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    id: category.id,
  }))
}

export default ViewCategoryPage

