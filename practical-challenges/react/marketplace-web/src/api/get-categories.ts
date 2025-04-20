import { api } from '@/lib/axios'

interface GetCategoriesResponse {
  categories: {
    id: string
    title: string
    slug: string
  }[]
}

export async function getCategories() {
  const response = await api.get<GetCategoriesResponse>('/categories')

  return response.data
}
