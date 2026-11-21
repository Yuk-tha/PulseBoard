
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ArrowUpRight, MoreHorizontal } from 'lucide-react'
import type { DateRange } from '../App'

type RevenueChartProps = {
  dateRange: DateRange
}

const chartData = {
  '7days': [
    { label: 'Mon', revenue: 2800, profit: 1400 },
    { label: 'Tue', revenue: 3200, profit: 1600 },
    { label: 'Wed', revenue: 2500, profit: 1250 },
    { label: 'Thu', revenue: 3800, profit: 1900 },
    { label: 'Fri', revenue: 2900, profit: 1450 },
    { label: 'Sat', revenue: 3100, profit: 1550 },
    { label: 'Sun', revenue: 3150, profit: 1575 },
  ],

  '30days': [
    { label: 'Week 1', revenue: 18000, profit: 9000 },
    { label: 'Week 2', revenue: 24000, profit: 12000 },
    { label: 'Week 3', revenue: 21000, profit: 10500 },
    { label: 'Week 4', revenue: 21254, profit: 10627 },
  ],

  month: [
    { label: 'Week 1', revenue: 22000, profit: 11000 },
    { label: 'Week 2', revenue: 24500, profit: 12250 },
    { label: 'Week 3', revenue: 23800, profit: 11900 },
    { label: 'Week 4', revenue: 26520, profit: 13260 },
  ],

  all: [
    { label: '2023', revenue: 85000, profit: 42500 },
    { label: '2024', revenue: 125000, profit: 62500 },
    { label: '2025', revenue: 265000, profit: 132500 },
    { label: '2026', revenue: 367560, profit: 183780 },
  ],
}

const summaryData = {
  '7days': { revenue: '$21,450', change: '5.4%' },
  '30days': { revenue: '$84,254', change: '12.8%' },
  month: { revenue: '$96,820', change: '15.6%' },
  all: { revenue: '$842,560', change: '28.5%' },
}

const rangeLabels: Record<DateRange, string> = {
  '7days': 'Last 7 days',
  '30days': 'Last 30 days',
  month: 'This month',
  all: 'All time',
}

function RevenueChart({ dateRange }: RevenueChartProps) {
  const data = chartData[dateRange]
  const summary = summaryData[dateRange]

  return (
    <section className="mt-8 rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[2px] text-[#788693]">
            Financial performance
          </p>

          <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-white">
            Revenue analytics
          </h2>

          <p className="mt-1 text-sm text-[#A7B0BA]">
            Monitor your revenue and profit trends
          </p>
        </div>

        <button
          aria-label="More chart options"
          className="rounded-xl border border-[#35414C] p-2 text-[#A7B0BA] transition hover:border-[#FF704F] hover:text-[#FF704F]"
        >
          <MoreHorizontal size={21} />
        </button>
      </div>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs text-[#A7B0BA]">
            Total revenue · {rangeLabels[dateRange]}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h3 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
              {summary.revenue}
            </h3>

            <span className="flex items-center gap-1 rounded-lg bg-[#FF704F]/10 px-2 py-1 text-xs font-semibold text-[#FF8064]">
              <ArrowUpRight size={14} />
              {summary.change}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs text-[#A7B0BA]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF704F]" />
            Revenue
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#A7B0BA]" />
            Profit
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-2">
        <span className="rounded-lg border border-[#FF704F]/30 bg-[#FF704F]/10 px-4 py-2 text-xs font-semibold text-[#FF8064]">
          {rangeLabels[dateRange]}
        </span>
        <span className="text-[11px] text-[#788693]">
          Updated chart view
        </span>
      </div>

      <div className="mt-6 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 8, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#FF704F" stopOpacity={0.35} />
                <stop offset="90%" stopColor="#FF704F" stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id="profitGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#A7B0BA" stopOpacity={0.16} />
                <stop offset="90%" stopColor="#A7B0BA" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#35414C"
              strokeDasharray="4 6"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A7B0BA', fontSize: 11 }}
              dy={12}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#788693', fontSize: 11 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              cursor={{ stroke: '#FF704F', strokeDasharray: '4 4' }}
              contentStyle={{
                backgroundColor: '#151F28',
                border: '1px solid #FF704F',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#A7B0BA', marginBottom: '6px' }}
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name === 'revenue' ? 'Revenue' : 'Profit',
              ]}
            />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#A7B0BA"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#profitGradient)"
              animationDuration={900}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF704F"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 6,
                fill: '#FF704F',
                stroke: '#FFFFFF',
                strokeWidth: 2,
              }}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default RevenueChart
