
import { useState, useEffect, useRef } from 'react'
import {
  Search,
  Bell,
  ChevronDown,
  X,
  ArrowUpRight,
  CreditCard,
  UserPlus,
  ShoppingBag,
  ShieldCheck,
  Check,
  CheckCheck,
} from 'lucide-react'

type DashboardHeaderProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
}

type Notification = {
  id: number
  title: string
  message: string
  time: string
  type: 'payment' | 'customer' | 'order' | 'system'
  read: boolean
}

const searchData = [
  { id: 'INV-2026-001', name: 'Olivia Martin', email: 'olivia.m@example.com' },
  { id: 'INV-2026-002', name: 'Noah Williams', email: 'noah.w@example.com' },
  { id: 'INV-2026-003', name: 'Sophia Anderson', email: 'sophia.a@example.com' },
  { id: 'INV-2026-004', name: 'Liam Thompson', email: 'liam.t@example.com' },
  { id: 'INV-2026-005', name: 'Emma Wilson', email: 'emma.w@example.com' },
]

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Payment received',
    message: 'Olivia Martin completed a payment of $1,250.00.',
    time: '2 minutes ago',
    type: 'payment',
    read: false,
  },
  {
    id: 2,
    title: 'New customer registered',
    message: 'A new customer joined your platform.',
    time: '18 minutes ago',
    type: 'customer',
    read: false,
  },
  {
    id: 3,
    title: 'New order placed',
    message: 'Order #ORD-2026-105 has been placed.',
    time: '1 hour ago',
    type: 'order',
    read: false,
  },
  {
    id: 4,
    title: 'Security update',
    message: 'Your dashboard security settings are up to date.',
    time: '3 hours ago',
    type: 'system',
    read: true,
  },
]

const notificationIcons = {
  payment: CreditCard,
  customer: UserPlus,
  order: ShoppingBag,
  system: ShieldCheck,
}

function DashboardHeader({
  searchTerm,
  onSearchChange,
}: DashboardHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)

  const notificationRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = searchData.filter((item) => {
    const search = searchTerm.trim().toLowerCase()

    return (
      item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search) ||
      item.id.toLowerCase().includes(search)
    )
  })

  const unreadCount = notifications.filter((item) => !item.read).length

  const handleSelect = (name: string) => {
    onSearchChange(name)
    setIsSearchOpen(false)

    window.dispatchEvent(new Event('transaction-search-selected'))
  }

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    )
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNotificationOpen(false)
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <header className="flex flex-wrap items-center justify-between gap-5 border-b border-[#35414C] pb-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[2px] text-[#788693]">
          Saturday, November 21, 2026
        </p>

        <h1 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold text-white">
          Overview<span className="text-[#FF704F]">.</span>
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">

        {/* Smart Search */}
        <div className="relative z-50">
          <div className="flex items-center gap-2 rounded-xl border border-[#35414C] bg-[#202B35] px-4 py-3 transition-all duration-300 focus-within:border-[#FF704F] focus-within:shadow-[0_0_18px_rgba(255,112,79,0.15)]">
            <Search size={17} className="shrink-0 text-[#A7B0BA]" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value)
                setIsSearchOpen(true)
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsSearchOpen(false)
              }}
              placeholder="Search transactions..."
              className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-[#788693]"
            />

            {searchTerm ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  onSearchChange('')
                  setIsSearchOpen(false)
                }}
                className="text-[#A7B0BA] transition hover:text-[#FF704F]"
              >
                <X size={15} />
              </button>
            ) : (
              <span className="rounded border border-[#35414C] px-1.5 py-0.5 text-[10px] text-[#788693]">
                /
              </span>
            )}
          </div>

          {isSearchOpen && searchTerm.trim() && (
            <div className="absolute right-0 top-full mt-3 w-[320px] overflow-hidden rounded-2xl border border-[#35414C] bg-[#19242E] shadow-[0_15px_50px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between border-b border-[#35414C] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#788693]">
                  Search results
                </p>

                <span className="rounded-md bg-[#FF704F]/10 px-2 py-1 text-[10px] font-semibold text-[#FF8064]">
                  {filteredSuggestions.length} found
                </span>
              </div>

              {filteredSuggestions.length > 0 ? (
                <div className="p-2">
                  {filteredSuggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.name)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#FF704F]/10"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FF704F]/20 bg-[#FF704F]/10 text-xs font-bold text-[#FF8064] transition group-hover:bg-[#FF704F] group-hover:text-[#111820]">
                          {item.name.split(' ').map((word) => word[0]).join('')}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="truncate text-[11px] text-[#788693]">
                            {item.email}
                          </p>
                          <p className="mt-1 text-[10px] text-[#FF8064]">
                            {item.id}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-[#788693] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF704F]"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Search size={22} className="mx-auto mb-3 text-[#788693]" />
                  <p className="text-sm font-semibold text-white">No results found</p>
                  <p className="mt-1 text-xs text-[#788693]">
                    Try another customer name or invoice ID.
                  </p>
                </div>
              )}

              <div className="border-t border-[#35414C] px-4 py-3">
                <p className="text-[10px] text-[#788693]">
                  Select a result to view its transaction
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Notification Center */}
        <div ref={notificationRef} className="relative z-40">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={isNotificationOpen}
            onClick={() => {
              setIsNotificationOpen((previous) => !previous)
              setIsSearchOpen(false)
            }}
            className={`relative rounded-xl border bg-[#202B35] p-3 transition-all duration-300 ${
              isNotificationOpen
                ? 'border-[#FF704F] text-[#FF704F] shadow-[0_0_18px_rgba(255,112,79,0.15)]'
                : 'border-[#35414C] text-[#A7B0BA] hover:border-[#FF704F]/50 hover:text-[#FF704F]'
            }`}
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-[#111820] bg-[#FF704F] px-1 text-[9px] font-bold text-[#111820]">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-3 w-[350px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[#35414C] bg-[#19242E] shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2 duration-200">

              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-[#35414C] px-5 py-4">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                    Notifications
                  </h3>
                  <p className="mt-1 text-[11px] text-[#788693]">
                    You have {unreadCount} unread notifications
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() => setIsNotificationOpen(false)}
                  className="rounded-lg p-2 text-[#788693] transition hover:bg-[#35414C] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mark All Read */}
              {unreadCount > 0 && (
                <div className="flex justify-end border-b border-[#35414C]/60 px-5 py-2.5">
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-[#FF8064] transition hover:text-[#FFAA98]"
                  >
                    <CheckCheck size={14} />
                    Mark all as read
                  </button>
                </div>
              )}

              {/* Notification List */}
              <div className="max-h-[350px] overflow-y-auto p-2">
                {notifications.length > 0 ? (
                  notifications.map((item) => {
                    const Icon = notificationIcons[item.type]

                    return (
                      <div
                        key={item.id}
                        className={`group relative flex gap-3 rounded-xl p-3 transition-all duration-200 ${
                          item.read
                            ? 'opacity-60 hover:bg-[#202B35]'
                            : 'bg-[#FF704F]/[0.05] hover:bg-[#FF704F]/[0.09]'
                        }`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          item.type === 'payment'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : item.type === 'customer'
                              ? 'bg-purple-500/10 text-purple-400'
                              : item.type === 'order'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-[#FF704F]/10 text-[#FF8064]'
                        }`}>
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-white">
                              {item.title}
                            </p>

                            {!item.read && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF704F]" />
                            )}
                          </div>

                          <p className="mt-1 text-[11px] leading-5 text-[#A7B0BA]">
                            {item.message}
                          </p>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="text-[10px] text-[#788693]">
                              {item.time}
                            </span>

                            {!item.read && (
                              <button
                                type="button"
                                onClick={() => markAsRead(item.id)}
                                className="flex items-center gap-1 text-[10px] font-semibold text-[#FF8064] opacity-0 transition hover:text-[#FFAA98] group-hover:opacity-100 focus:opacity-100"
                              >
                                <Check size={12} />
                                Mark read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="py-10 text-center">
                    <Bell size={25} className="mx-auto mb-3 text-[#788693]" />
                    <p className="text-sm font-semibold text-white">
                      You're all caught up!
                    </p>
                    <p className="mt-1 text-xs text-[#788693]">
                      No notifications to show.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-[#35414C] px-5 py-3">
                <p className="text-center text-[10px] text-[#788693]">
                  Showing your latest notifications
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-[#35414C] bg-[#202B35] px-3 py-2.5 transition hover:bg-[#293642]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF704F] font-bold text-[#111820]">
            Y
          </div>

          <div className="text-left">
            <p className="text-xs font-semibold text-white">Yuktha</p>
            <p className="text-[10px] text-[#A7B0BA]">Admin</p>
          </div>

          <ChevronDown size={15} className="text-[#A7B0BA]" />
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
