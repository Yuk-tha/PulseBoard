
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
} from 'lucide-react'

type StatCardProps = {
  title: string
  value: string
  change: string
  positive: boolean
  icon: 'revenue' | 'orders' | 'customers' | 'conversion'
}

const icons = {
  revenue: DollarSign,
  orders: ShoppingBag,
  customers: Users,
  conversion: Activity,
}

function StatCard({
  title,
  value,
  change,
  positive,
  icon,
}: StatCardProps) {
  const Icon = icons[icon]
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight

  return (
    <div className="group relative isolate">
      {/* Orange glow behind the card */}
      <div className="absolute -inset-[2px] rounded-[19px] bg-[#FF704F]/0 opacity-0 blur-xl transition-all duration-500 ease-out group-hover:bg-[#FF704F]/70 group-hover:opacity-100" />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:border-[#FF704F] group-hover:bg-[#25313C] group-hover:shadow-[0_0_25px_rgba(255,112,79,0.20),0_15px_40px_rgba(255,112,79,0.12)]">

        {/* Top orange light reflection */}
        <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#FF704F]/0 blur-3xl transition-all duration-500 group-hover:bg-[#FF704F]/30" />

        <div className="relative z-10">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#A7B0BA] transition-colors duration-300 group-hover:text-white">
              {title}
            </p>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FF704F]/20 bg-[#FF704F]/10 text-[#FF704F] transition-all duration-500 group-hover:scale-110 group-hover:border-[#FF704F]/60 group-hover:bg-[#FF704F] group-hover:text-[#111820] group-hover:shadow-[0_0_20px_rgba(255,112,79,0.5)]">
              <Icon size={20} strokeWidth={2} />
            </div>
          </div>

          {/* Main value */}
          <h3 className="mt-6 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-[#FF987F]">
            {value}
          </h3>

          {/* Growth indicator */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold transition-all duration-300 ${
                positive
                  ? 'bg-[#FF704F]/10 text-[#FF8064] group-hover:bg-[#FF704F]/20 group-hover:text-[#FF987F]'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              <TrendIcon size={15} />
              {change}
            </span>

            <span className="text-xs text-[#788693]">
              vs last month
            </span>
          </div>
        </div>

        {/* Bottom highlight line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF704F] shadow-[0_0_12px_#FF704F] transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  )
}

export default StatCard
