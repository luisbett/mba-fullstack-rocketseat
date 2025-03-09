import { ReactNode } from 'react'

interface LabelProps {
  children: ReactNode
}

export function Label({ children }: LabelProps) {
  return (
    <label className="font-Poppins text-xs leading-[1.2] font-medium text-gray-300">
      {children}
    </label>
  )
}
