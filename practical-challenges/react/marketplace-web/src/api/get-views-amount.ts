import { api } from '@/lib/axios'

export interface getViewsAmountResponse {
  amount: number
}

export async function getViewsAmount() {
  const response = await api.get<getViewsAmountResponse>(
    '/sellers/metrics/views',
  )

  return response.data
}
