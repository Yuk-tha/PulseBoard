
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  CalendarDays,
  Receipt,
  TrendingUp,
} from 'lucide-react'

import Sidebar from '../components/Sidebar'
import RecentTransactions from '../components/RecentTransactions'
import type { DateRange } from '../App'

function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>('all')

  const dateOptions: { label: string; value: DateRange }[] = [
    { label: 'Last 7 days', value: '7days' },
    { label: 'Last 30 days', value: '30days' },
    { label: 'This month', value: 'month' },
    { label: 'All time', value: 'all' },
  ]

  return (
    <div className="flex min-h-screen w-full bg-[#111820]">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-[1500px]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#A7B0BA] transition hover:text-[#FF704F]"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF704F]/10 text-[#FF704F]">
                  <Receipt size={17} />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#FF8064]">
                  Transaction Management
                </span>
              </div>

              <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white md:text-4xl">
                All Transactions
              </h1>

              <p className="mt-2 text-sm text-[#788693]">
                Manage, monitor and track all your business transactions.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#35414C] bg-[#202B35] px-4 py-3">
              <TrendingUp size={17} className="text-[#FF704F]" />
              <span className="text-xs font-semibold text-[#A7B0BA]">
                Transaction Overview
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#788693]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search customer, email or invoice..."
                className="w-full rounded-xl border border-[#35414C] bg-[#202B35] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#788693] focus:border-[#FF704F] focus:ring-2 focus:ring-[#FF704F]/10"
              />
            </div>

            <div className="relative">
              <CalendarDays
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#FF704F]"
              />

              <select
                value={dateRange}
                onChange={(event) =>
                  setDateRange(event.target.value as DateRange)
                }
                className="w-full cursor-pointer appearance-none rounded-xl border border-[#35414C] bg-[#202B35] py-3 pl-9 pr-10 text-xs font-semibold text-[#A7B0BA] outline-none transition hover:border-[#FF704F]/60 focus:border-[#FF704F] sm:w-auto"
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
            </div>
          </div>

          <div className="mt-6">
            <RecentTransactions
              searchTerm={searchTerm}
              dateRange={dateRange}
              showViewAllButton={false}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default TransactionsPage
