import { api } from '@/lib/axios'

export interface RegisterProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export async function registerProduct({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: RegisterProductBody) {
  await api.post('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })
}
