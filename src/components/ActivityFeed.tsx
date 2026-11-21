
import {
  UserPlus,
  CreditCard,
  ShoppingBag,
  RefreshCw,
  Activity,
} from 'lucide-react'

const activities = [
  {
    title: 'New customer registered',
    description: 'Isabella Clark joined your platform',
    time: '10 minutes ago',
    icon: UserPlus,
    color: 'text-blue-400 bg-blue-400/10',
  },
  {
    title: 'Payment received',
    description: 'Payment of $1,250 was successful',
    time: '35 minutes ago',
    icon: CreditCard,
    color: 'text-[#FF8064] bg-[#FF704F]/10',
  },
  {
    title: 'New order placed',
    description: 'Order #ORD-2458 was placed',
    time: '1 hour ago',
    icon: ShoppingBag,
    color: 'text-purple-400 bg-purple-400/10',
  },
  {
    title: 'Subscription renewed',
    description: 'Premium plan renewed successfully',
    time: '3 hours ago',
    icon: RefreshCw,
    color: 'text-emerald-400 bg-emerald-400/10',
  },
]

function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-6">

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
            Recent activity
          </h2>
          <p className="mt-1 text-xs text-[#788693]">
            Latest updates from your workspace
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF704F]">
          <Activity size={19} />
        </div>
      </div>

      <div className="mt-7 space-y-6">
        {activities.map((item, index) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="group flex gap-3">
              <div className="relative">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-300 group-hover:scale-110 ${item.color}`}>
                  <Icon size={18} />
                </div>

                {index !== activities.length - 1 && (
                  <div className="absolute left-1/2 top-12 h-5 w-px -translate-x-1/2 bg-[#35414C]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white transition group-hover:text-[#FF8064]">
                  {item.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#A7B0BA]">
                  {item.description}
                </p>

                <p className="mt-2 text-[10px] text-[#788693]">
                  {item.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <button className="mt-7 w-full rounded-xl border border-[#35414C] py-3 text-xs font-semibold text-[#A7B0BA] transition hover:border-[#FF704F]/50 hover:bg-[#FF704F]/5 hover:text-[#FF8064]">
        View activity history →
      </button>
    </section>
  )
}

export default ActivityFeed
