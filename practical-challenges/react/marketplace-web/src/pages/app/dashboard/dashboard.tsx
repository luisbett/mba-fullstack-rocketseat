import {
  Calendar04Icon,
  SaleTag02Icon,
  Store04Icon,
  UserMultiple03Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQuery } from '@tanstack/react-query'

import { getProductsSoldAmount } from '@/api/get-products-sold-amount'
import { getViewsAmount } from '@/api/get-views-amount'
import { getViewsPerDayAmount } from '@/api/get-views-per-day-amount'
import { DashboardCard } from '@/components/dashboard-card'

import { VisitorsChart } from './visitors-chart'

export function Dashboard() {
  const { data: productsSoldAmount } = useQuery({
    queryKey: ['metrics', 'products-sold-amount'],
    queryFn: getProductsSoldAmount,
  })

  const { data: productsAvailableAmount } = useQuery({
    queryKey: ['metrics', 'products-available-amount'],
    queryFn: getProductsSoldAmount,
  })

  const { data: viewsAmount } = useQuery({
    queryKey: ['metrics', 'views-amount'],
    queryFn: getViewsAmount,
  })

  const { data: viewsAmountPerDay } = useQuery({
    queryKey: ['metrics', 'views-amount-per-day'],
    queryFn: getViewsPerDayAmount,
  })

  return (
    <div className="flex flex-col px-42 py-16">
      <div className="flex w-full flex-col gap-2">
        <h1 className="font-DMSans text-2xl font-bold text-gray-500">
          Últimos 30 dias
        </h1>
        <p className="text-sm text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </p>
      </div>
      <div className="mt-10 grid grid-cols-[240px_1fr] gap-6">
        <div className="flex flex-col gap-4">
          <DashboardCard
            amount={productsSoldAmount?.amount || 0}
            description="Produtos vendidos"
            icon={SaleTag02Icon}
          />
          <DashboardCard
            amount={productsAvailableAmount?.amount || 0}
            description="Produtos anunciados"
            icon={Store04Icon}
          />
          <DashboardCard
            amount={viewsAmount?.amount || 0}
            description="Pessoas visitantes"
            icon={UserMultiple03Icon}
          />
        </div>
        <div className="flex flex-col gap-7 rounded-[20px] bg-white p-6 pb-5">
          <div className="flex justify-between">
            <h1 className="font-DMSans text-lg font-bold text-gray-500">
              Visitantes
            </h1>
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Calendar04Icon}
                className="text-blue-dark h-4 w-4"
              />
              <span className="text-[10px] font-medium text-gray-300">
                {viewsAmountPerDay?.viewsPerDay
                  ? new Date(viewsAmountPerDay?.viewsPerDay[0].date)
                      .toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                      })
                      .toLocaleUpperCase() +
                    ' - ' +
                    new Date(viewsAmountPerDay?.viewsPerDay[30].date)
                      .toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                      })
                      .toLocaleUpperCase()
                  : ''}
              </span>
            </div>
          </div>
          <VisitorsChart viewsPerDay={viewsAmountPerDay?.viewsPerDay || []} />
        </div>
      </div>
    </div>
  )
}
