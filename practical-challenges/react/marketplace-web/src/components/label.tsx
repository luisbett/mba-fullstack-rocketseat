import { ReactNode } from 'react'

export function Label({ children }: { children: ReactNode }) {
  return <label className="text-xs font-medium text-gray-300">{children}</label>
}
