import { api } from '@/lib/axios'

export interface getProductsAvailableAmountResponse {
  amount: number
}

export async function getProductsAvailableAmount() {
  const response = await api.get<getProductsAvailableAmountResponse>(
    '/sellers/metrics/products/available',
  )

  return response.data
}
