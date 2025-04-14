import { api } from '@/lib/axios'

export interface GetProductsProps {
  search: string
  status: string
}

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

export async function getProducts({
  search = '',
  status = '',
}: GetProductsProps) {
  const params: Record<string, string> = {}

  if (search.trim() !== '') {
    params.search = search
  }

  if (status.trim() !== '') {
    params.status = status
  }

  const response = await api.get<getProductsResponse>('/products/me', {
    params,
  })

  return response.data
}
