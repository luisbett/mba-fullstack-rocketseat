import { api } from '@/lib/axios'

export interface RegisterProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

interface RegisterProductResponse {
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

export async function registerProduct({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: RegisterProductBody) {
  const response = await api.post<RegisterProductResponse>('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })

  return response.data
}
