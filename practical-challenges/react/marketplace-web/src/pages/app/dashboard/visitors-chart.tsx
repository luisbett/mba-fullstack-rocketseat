import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function VisitorsChart() {
  const data = [
    {
      date: '26',
      amount: 150,
    },
    {
      date: '27',
      amount: 20,
    },
    {
      date: '28',
      amount: 50,
    },
    {
      date: '29',
      amount: 35,
    },
    {
      date: '30',
      amount: 105,
    },
    {
      date: '01',
      amount: 23,
    },
    {
      date: '02',
      amount: 189,
    },
    {
      date: '03',
      amount: 44,
    },
    {
      date: '04',
      amount: 50,
    },
    {
      date: '05',
      amount: 55,
    },
    {
      date: '06',
      amount: 13,
    },
    {
      date: '07',
      amount: 23,
    },
    {
      date: '08',
      amount: 76,
    },
    {
      date: '09',
      amount: 88,
    },
    {
      date: '10',
      amount: 58,
    },
    {
      date: '11',
      amount: 133,
    },
    {
      date: '12',
      amount: 155,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} style={{ fontSize: 12 }}>
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
