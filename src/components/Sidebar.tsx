
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  ArrowLeftRight,
  Users,
  Settings,
  CircleHelp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', path: '/', icon: LayoutDashboard, end: true },
  { name: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
  { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { name: 'Customers', path: '/customers', icon: Users },
]

const navLinkClass = (isActive: boolean) =>
  `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'border border-[#FF704F]/20 bg-[#FF704F]/10 text-[#FF8064] shadow-[inset_3px_0_0_#FF704F]'
      : 'border border-transparent text-[#A7B0BA] hover:bg-[#26323B] hover:text-white'
  }`

type SidebarContentProps = {
  onNavigate?: () => void
}

function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col px-5 py-6">

      {/* Logo */}
      <NavLink
        to="/"
        onClick={onNavigate}
        className="mb-10 flex items-center gap-3 px-2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF704F] shadow-[0_5px_20px_rgba(255,112,79,0.25)]">
          <ChartNoAxesCombined
            size={22}
            className="text-[#111820]"
            strokeWidth={2.5}
          />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            pulseboard<span className="text-[#FF704F]">.</span>
          </h1>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#71808D]">
            Analytics platform
          </p>
        </div>
      </NavLink>

      {/* Workspace */}
      <div>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#71808D]">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className={
                        isActive
                          ? 'text-[#FF8064]'
                          : 'text-[#8996A3] group-hover:text-white'
                      }
                    />

                    <span>{item.name}</span>

                    {isActive && (
                      <ChevronRight
                        size={15}
                        className="ml-auto text-[#FF8064]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* General */}
      <div className="mt-9">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#71808D]">
          General
        </p>

        <nav className="space-y-1">

          {/* Settings */}
          <NavLink
            to="/settings"
            onClick={onNavigate}
            className={({ isActive }) => navLinkClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <Settings
                  size={18}
                  strokeWidth={1.8}
                  className={isActive ? 'text-[#FF8064]' : 'text-[#8996A3]'}
                />

                <span>Settings</span>

                {isActive && (
                  <ChevronRight
                    size={15}
                    className="ml-auto text-[#FF8064]"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* Help & Support */}
          <NavLink
            to="/help-support"
            onClick={onNavigate}
            className={({ isActive }) => navLinkClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <CircleHelp
                  size={18}
                  strokeWidth={1.8}
                  className={isActive ? 'text-[#FF8064]' : 'text-[#8996A3]'}
                />

                <span>Help & Support</span>

                {isActive && (
                  <ChevronRight
                    size={15}
                    className="ml-auto text-[#FF8064]"
                  />
                )}
              </>
            )}
          </NavLink>

          {/* Admin */}
          <NavLink
            to="/admin"
            onClick={onNavigate}
            className={({ isActive }) => navLinkClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <ShieldCheck
                  size={18}
                  strokeWidth={1.8}
                  className={isActive ? 'text-[#FF8064]' : 'text-[#8996A3]'}
                />

                <span>Admin</span>

                {isActive && (
                  <ChevronRight
                    size={15}
                    className="ml-auto text-[#FF8064]"
                  />
                )}
              </>
            )}
          </NavLink>

        </nav>
      </div>

      <div className="flex-1" />

      {/* Explore Pro */}
      <NavLink
        to="/explore-pro"
        onClick={onNavigate}
        className="group relative mb-5 block overflow-hidden rounded-2xl border border-[#FF704F]/25 bg-gradient-to-br from-[#303A43] to-[#202B35] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF704F]/60 hover:shadow-[0_0_25px_rgba(255,112,79,0.15)]"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FF704F]/15 blur-2xl transition-all duration-300 group-hover:bg-[#FF704F]/30" />

        <div className="relative">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF704F]/15 text-[#FF8064]">
            <Zap size={18} />
          </div>

          <p className="text-sm font-bold text-white">
            Need more insights?
          </p>

          <p className="mt-1 text-xs leading-5 text-[#A7B0BA]">
            Unlock advanced analytics and grow your business.
          </p>

          <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#FF8064]">
            <span>Explore Pro</span>
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </NavLink>

      {/* Footer */}
      <div className="border-t border-[#35414C] pt-5">
        <p className="px-2 text-[10px] font-medium tracking-wide text-[#71808D]">
          PULSEBOARD © 2026
        </p>
      </div>

    </div>
  )
}

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-[#35414C] bg-[#151F28] md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-[68px] items-center justify-between border-b border-[#35414C] bg-[#151F28] px-5 md:hidden">
        <NavLink
          to="/"
          onClick={closeMobile}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF704F]">
            <ChartNoAxesCombined
              size={20}
              className="text-[#111820]"
            />
          </div>

          <span className="text-lg font-bold text-white">
            pulseboard<span className="text-[#FF704F]">.</span>
          </span>
        </NavLink>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#35414C] bg-[#202B35] text-[#A7B0BA] transition hover:border-[#FF704F]/50 hover:text-[#FF8064]"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          aria-label="Close navigation menu"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-[68px] z-50 w-[280px] border-r border-[#35414C] bg-[#151F28] transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <SidebarContent onNavigate={closeMobile} />
        </div>
      </aside>
    </>
  )
}

export default Sidebar
