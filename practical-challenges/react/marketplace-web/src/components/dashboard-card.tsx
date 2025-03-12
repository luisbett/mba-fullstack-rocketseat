import { HugeiconsIcon } from '@hugeicons/react'
import { IconSvgElement } from 'node_modules/@hugeicons/react/dist/types/create-hugeicon-singleton'

export interface DashboardCardProps {
  amount: number
  description: string
  icon: IconSvgElement
}

export function DashboardCard({
  amount,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] bg-white p-3">
      <div className="bg-blue-light flex h-20 w-20 items-center justify-center rounded-xl">
        <HugeiconsIcon icon={icon} className="text-blue-dark h-10 w-10" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-DMSans text-[28px] font-bold text-gray-500">
          {amount}
        </h1>
        <p className="text-xs text-gray-300">{description}</p>
      </div>
    </div>
  )
}
