import { api } from '@/lib/axios'

interface EditProductBody {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

interface EditProductResponse {
  product: {
    id: string
    title: string
    description: string
    priceInCents: number
    status: string
    owner: {
      id: string
      name: string
      phone: string
      email: string
      avatar: {
        id: string
        url: string
      }
    }
    category: {
      id: string
      title: string
      slug: string
    }
    attachments: [
      {
        id: string
        url: string
      },
    ]
  }
}

export async function editProduct({
  id,
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: EditProductBody) {
  const response = await api.put<EditProductResponse>(`/products/${id}`, {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })

  return response.data
}
