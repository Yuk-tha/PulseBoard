
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  ShoppingCart,
  Target,
  Download,
  Globe,
  Smartphone,
  Monitor,
  Package,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

type Range = '7D' | '30D' | '90D' | '12M'

const revenueData: Record<Range, { name: string; revenue: number; profit: number }[]> = {
  '7D': [
    { name: 'Mon', revenue: 4200, profit: 2100 },
    { name: 'Tue', revenue: 5800, profit: 3100 },
    { name: 'Wed', revenue: 4900, profit: 2500 },
    { name: 'Thu', revenue: 7200, profit: 3900 },
    { name: 'Fri', revenue: 6400, profit: 3400 },
    { name: 'Sat', revenue: 8900, profit: 5100 },
    { name: 'Sun', revenue: 7600, profit: 4200 },
  ],
  '30D': [
    { name: 'Week 1', revenue: 18500, profit: 9200 },
    { name: 'Week 2', revenue: 24300, profit: 12800 },
    { name: 'Week 3', revenue: 21800, profit: 11000 },
    { name: 'Week 4', revenue: 32600, profit: 17400 },
  ],
  '90D': [
    { name: 'Sep', revenue: 62500, profit: 31200 },
    { name: 'Oct', revenue: 78400, profit: 40800 },
    { name: 'Nov', revenue: 97100, profit: 51200 },
  ],
  '12M': [
    { name: 'Jan', revenue: 42000, profit: 21000 },
    { name: 'Feb', revenue: 48000, profit: 24500 },
    { name: 'Mar', revenue: 53000, profit: 28000 },
    { name: 'Apr', revenue: 46000, profit: 23000 },
    { name: 'May', revenue: 61000, profit: 32000 },
    { name: 'Jun', revenue: 68000, profit: 35000 },
    { name: 'Jul', revenue: 72000, profit: 38000 },
    { name: 'Aug', revenue: 65000, profit: 33000 },
    { name: 'Sep', revenue: 79000, profit: 41000 },
    { name: 'Oct', revenue: 84000, profit: 44000 },
    { name: 'Nov', revenue: 97100, profit: 51200 },
    { name: 'Dec', revenue: 105000, profit: 56000 },
  ],
}

const categoryData = [
  { name: 'Electronics', value: 38, color: '#FF704F' },
  { name: 'Fashion', value: 26, color: '#F5B65C' },
  { name: 'Home & Living', value: 20, color: '#8297AC' },
  { name: 'Others', value: 16, color: '#566575' },
]

const trafficData = [
  { source: 'Direct', visitors: 12400, percentage: 42, icon: Globe },
  { source: 'Social Media', visitors: 8900, percentage: 30, icon: Smartphone },
  { source: 'Organic Search', visitors: 5200, percentage: 18, icon: Monitor },
  { source: 'Referral', visitors: 2900, percentage: 10, icon: ArrowUpRight },
]

const products = [
  { name: 'Wireless Headphones', category: 'Electronics', sales: 1240, revenue: 24800 },
  { name: 'Smart Watch Pro', category: 'Electronics', sales: 980, revenue: 19600 },
  { name: 'Minimal Sneakers', category: 'Fashion', sales: 760, revenue: 15200 },
  { name: 'Travel Backpack', category: 'Accessories', sales: 640, revenue: 12800 },
]

const rangeLabels: Record<Range, string> = {
  '7D': 'Last 7 days',
  '30D': 'Last 30 days',
  '90D': 'Last 90 days',
  '12M': 'Last 12 months',
}

function AnalyticsPage() {
  const [range, setRange] = useState<Range>('30D')

  const chartData = revenueData[range]

  const totalRevenue = range === '7D' ? '$45.0k'
    : range === '30D' ? '$97.2k'
    : range === '90D' ? '$238k'
    : '$794k'

  const totalProfit = range === '7D' ? '$24.3k'
    : range === '30D' ? '$50.4k'
    : range === '90D' ? '$123k'
    : '$413k'

  return (
    <div className="flex min-h-screen w-full bg-[#111820] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-[1500px]">

          {/* Header */}
          <div className="mb-7">
            <Link
              to="/"
              className="mb-7 inline-flex items-center gap-2 text-sm text-[#A7B0BA] transition hover:text-[#FF704F]"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF8064]">
                  Business Intelligence
                </p>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Analytics Overview
                </h1>
                <p className="mt-2 text-sm text-[#A7B0BA]">
                  Discover trends, measure performance and make smarter decisions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl border border-[#35414C] bg-[#202B35] p-1">
                  {(['7D', '30D', '90D', '12M'] as Range[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => setRange(item)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        range === item
                          ? 'bg-[#FF704F] text-[#111820] shadow-[0_0_18px_rgba(255,112,79,0.2)]'
                          : 'text-[#A7B0BA] hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 rounded-xl border border-[#35414C] bg-[#202B35] px-4 py-3 text-xs font-semibold text-[#A7B0BA] transition hover:border-[#FF704F]/50 hover:text-[#FF8064]"
                >
                  <Download size={15} />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: 'Total Revenue',
                value: totalRevenue,
                change: '+18.6%',
                icon: Wallet,
                positive: true,
                note: rangeLabels[range],
              },
              {
                label: 'Net Profit',
                value: totalProfit,
                change: '+12.4%',
                icon: TrendingUp,
                positive: true,
                note: 'Compared to previous period',
              },
              {
                label: 'Total Orders',
                value: '3,842',
                change: '+8.2%',
                icon: ShoppingCart,
                positive: true,
                note: 'Compared to previous period',
              },
              {
                label: 'Conversion Rate',
                value: '4.82%',
                change: '-0.6%',
                icon: Target,
                positive: false,
                note: 'Compared to previous period',
              },
            ].map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF704F]/70 hover:shadow-[0_0_30px_rgba(255,112,79,0.18),0_15px_40px_rgba(255,112,79,0.10)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-sm text-[#A7B0BA]">{stat.label}</span>
                    <div className="rounded-xl bg-[#FF704F]/10 p-2.5 text-[#FF8064] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF704F]/20 group-hover:shadow-[0_0_18px_rgba(255,112,79,0.25)]">
                      <Icon size={19} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight">{stat.value}</h2>

                  <div className="mt-3 flex items-center gap-1.5">
                    {stat.positive ? (
                      <ArrowUpRight size={14} className="text-emerald-400" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-400" />
                    )}
                    <span className={`text-xs font-semibold ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change}
                    </span>
                    <span className="text-[11px] text-[#75818D]">{stat.note}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#FF704F] to-[#F5B65C] transition-all duration-500 group-hover:w-full" />
                </div>
              )
            })}
          </div>

          {/* Revenue chart */}
          <section className="mb-7 rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-6">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold">Revenue Performance</h2>
                <p className="mt-1 text-xs text-[#75818D]">
                  Revenue and profit trends · {rangeLabels[range]}
                </p>
              </div>
              <div className="flex items-center gap-5 text-xs">
                <span className="flex items-center gap-2 text-[#A7B0BA]">
                  <span className="h-2 w-2 rounded-full bg-[#FF704F]" />
                  Revenue
                </span>
                <span className="flex items-center gap-2 text-[#A7B0BA]">
                  <span className="h-2 w-2 rounded-full bg-[#8297AC]" />
                  Profit
                </span>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF704F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF704F" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8297AC" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8297AC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#35414C" strokeDasharray="4 5" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#82909D', fontSize: 11 }}
                    dy={12}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#82909D', fontSize: 11 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#151F28',
                      border: '1px solid #35414C',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF704F"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    activeDot={{ r: 6, fill: '#FF704F', stroke: '#202B35', strokeWidth: 3 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#8297AC"
                    strokeWidth={2}
                    fill="url(#profitGradient)"
                    activeDot={{ r: 5, fill: '#8297AC', stroke: '#202B35', strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Category and traffic */}
          <div className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-2">

            <section className="rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Sales by Category</h2>
                <p className="mt-1 text-xs text-[#75818D]">
                  Revenue contribution across categories
                </p>
              </div>

              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div className="h-[220px] w-full max-w-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={5}
                        stroke="none"
                      >
                        {categoryData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#151F28',
                          border: '1px solid #35414C',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: '12px',
                        }}
                        formatter={(value) => [`${value}%`, 'Share']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name}>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-[#A7B0BA]">
                          <span
                            className="h-2.5 w-2.5 rounded-sm"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </span>
                        <span className="font-semibold text-white">{category.value}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#35414C]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Traffic Sources</h2>
                <p className="mt-1 text-xs text-[#75818D]">
                  Where your visitors come from
                </p>
              </div>

              <div className="space-y-5">
                {trafficData.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.source}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-[#151F28] p-2 text-[#FF8064]">
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#E8EDF2]">{item.source}</p>
                            <p className="mt-0.5 text-[11px] text-[#75818D]">
                              {item.visitors.toLocaleString()} visitors
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-white">{item.percentage}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[#35414C]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FF704F] to-[#F5B65C] transition-all duration-700"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Top products */}
          <section className="overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35]">
            <div className="flex items-center justify-between border-b border-[#35414C] p-5 md:p-6">
              <div>
                <h2 className="text-lg font-semibold">Top Performing Products</h2>
                <p className="mt-1 text-xs text-[#75818D]">
                  Your best-selling products by revenue
                </p>
              </div>
              <div className="rounded-xl bg-[#FF704F]/10 p-2.5 text-[#FF8064]">
                <Package size={19} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-[#35414C] bg-[#18232D] text-[11px] uppercase tracking-wider text-[#75818D]">
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Units Sold</th>
                    <th className="px-5 py-4 font-semibold">Revenue</th>
                    <th className="px-5 py-4 font-semibold">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.name}
                      className="border-b border-[#35414C]/70 transition hover:bg-[#293642]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF704F]/10 text-xs font-bold text-[#FF8064]">
                            0{index + 1}
                          </div>
                          <span className="text-sm font-medium text-[#E8EDF2]">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#A7B0BA]">
                        {product.category}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#D5DCE3]">
                        {product.sales.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-white">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                          <ArrowUpRight size={14} />
                          {index === 0 ? '24.8%' : index === 1 ? '18.2%' : index === 2 ? '14.6%' : '11.3%'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#35414C] px-6 py-4 text-xs text-[#75818D]">
              Showing top 4 products · Sample analytics data
            </div>
          </section>

          <p className="mt-5 text-center text-[11px] text-[#65717D]">
            PULSEBOARD ANALYTICS · INSIGHTS THAT MOVE YOUR BUSINESS FORWARD
          </p>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
