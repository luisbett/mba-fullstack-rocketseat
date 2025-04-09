import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export interface VisitorsChartProps {
  viewsPerDay?: {
    date: string
    amount: number
  }[]
}

export function VisitorsChart({ viewsPerDay }: VisitorsChartProps) {
  const viewsPerDayAux = viewsPerDay?.map((dateAux) => {
    return {
      date: new Date(dateAux.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
      }),
      amount: dateAux.amount,
    }
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={viewsPerDayAux} style={{ fontSize: 12 }}>
        <CartesianGrid vertical={false} strokeDasharray="10" />
        <XAxis
          dataKey="date"
          stroke="#949494"
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis stroke="#949494" axisLine={false} tickLine={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#5ec5fd"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
