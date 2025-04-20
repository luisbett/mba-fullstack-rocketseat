import { api } from '@/lib/axios'

interface GetProductByIdParams {
  id: string
}

interface GetProductByIdResponse {
  product: {
    id: string
    title: string
    description: string
    priceInCents: number
    status: 'available' | 'sold' | 'cancelled'
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

export async function getProductById({ id }: GetProductByIdParams) {
  const response = await api.get<GetProductByIdResponse>(`/products/${id}`)

  return response.data
}
