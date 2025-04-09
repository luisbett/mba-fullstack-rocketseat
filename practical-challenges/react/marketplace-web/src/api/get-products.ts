import { api } from '@/lib/axios'

export interface getProductsResponse {
  products: [
    {
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
    },
  ]
}

export async function getProducts() {
  const response = await api.get<getProductsResponse>('/products/me')

  return response.data
}
