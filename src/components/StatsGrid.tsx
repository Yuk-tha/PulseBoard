
import StatCard from './StatCard'
import type { DateRange } from '../App'

type StatsGridProps = {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

const statsByRange = {
  '7days': [
    { title: 'Total Revenue', value: '$21,450', change: '5.4%', positive: true, icon: 'revenue' as const },
    { title: 'Total Orders', value: '625', change: '3.8%', positive: true, icon: 'orders' as const },
    { title: 'Active Customers', value: '482', change: '6.2%', positive: true, icon: 'customers' as const },
    { title: 'Conversion Rate', value: '4.12%', change: '1.2%', positive: true, icon: 'conversion' as const },
  ],
  '30days': [
    { title: 'Total Revenue', value: '$84,254', change: '12.8%', positive: true, icon: 'revenue' as const },
    { title: 'Total Orders', value: '2,450', change: '8.2%', positive: true, icon: 'orders' as const },
    { title: 'Active Customers', value: '1,840', change: '14.5%', positive: true, icon: 'customers' as const },
    { title: 'Conversion Rate', value: '4.85%', change: '2.4%', positive: true, icon: 'conversion' as const },
  ],
  month: [
    { title: 'Total Revenue', value: '$96,820', change: '15.6%', positive: true, icon: 'revenue' as const },
    { title: 'Total Orders', value: '2,890', change: '10.4%', positive: true, icon: 'orders' as const },
    { title: 'Active Customers', value: '2,120', change: '17.2%', positive: true, icon: 'customers' as const },
    { title: 'Conversion Rate', value: '5.12%', change: '3.1%', positive: true, icon: 'conversion' as const },
  ],
  all: [
    { title: 'Total Revenue', value: '$842,560', change: '28.5%', positive: true, icon: 'revenue' as const },
    { title: 'Total Orders', value: '24,580', change: '21.3%', positive: true, icon: 'orders' as const },
    { title: 'Active Customers', value: '8,420', change: '19.8%', positive: true, icon: 'customers' as const },
    { title: 'Conversion Rate', value: '4.92%', change: '4.6%', positive: true, icon: 'conversion' as const },
  ],
}

const dateOptions: { label: string; value: DateRange }[] = [
  { label: 'Last 7 days', value: '7days' },
  { label: 'Last 30 days', value: '30days' },
  { label: 'This month', value: 'month' },
  { label: 'All time', value: 'all' },
]

function StatsGrid({ dateRange, onDateRangeChange }: StatsGridProps) {
  const stats = statsByRange[dateRange]

  return (
    <section className="mt-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
            Performance overview
          </h2>
          <p className="mt-1 text-xs text-[#788693]">
            Your key business metrics at a glance
          </p>
        </div>

        <div className="relative">
          <select
            value={dateRange}
            onChange={(event) =>
              onDateRangeChange(event.target.value as DateRange)
            }
            className="cursor-pointer appearance-none rounded-xl border border-[#35414C] bg-[#202B35] py-2.5 pl-4 pr-10 text-xs font-semibold text-[#A7B0BA] outline-none transition hover:border-[#FF704F]/60 focus:border-[#FF704F] focus:ring-2 focus:ring-[#FF704F]/10"
          >
            {dateOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#202B35] text-white"
              >
                {option.label}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#FF704F]"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  )
}

export default StatsGrid
