import { api } from '@/lib/axios'

export interface getViewsPerDayAmountResponse {
  viewsPerDay: {
    date: string
    amount: number
  }[]
}

export async function getViewsPerDayAmount() {
  const response = await api.get<getViewsPerDayAmountResponse>(
    '/sellers/metrics/views/days',
  )

  return response.data
}
