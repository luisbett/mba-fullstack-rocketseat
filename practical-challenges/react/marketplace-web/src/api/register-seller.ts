import { api } from '@/lib/axios'

export interface RegisterSellerBody {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export async function registerSeller({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: RegisterSellerBody) {
  await api.post('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })
}
