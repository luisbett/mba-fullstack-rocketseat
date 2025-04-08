import { api } from '@/lib/axios'

export interface getProductsSoldAmountResponse {
  amount: number
}

export async function getProductsSoldAmount() {
  const response = await api.get<getProductsSoldAmountResponse>(
    '/sellers/metrics/products/sold',
  )

  return response.data
}
