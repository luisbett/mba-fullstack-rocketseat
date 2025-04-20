import { api } from '@/lib/axios'

interface SetProductStatusParams {
  id: string
  status: 'available' | 'sold' | 'cancelled'
}

export async function setProductStatus({ id, status }: SetProductStatusParams) {
  await api.patch(`/products/${id}/${status}`)
}
