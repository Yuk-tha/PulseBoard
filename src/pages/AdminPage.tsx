
import { useMemo, useState } from 'react'
import {
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
  Activity,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle2,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Database,
  LockKeyhole,
  Clock3,
  Settings,
  Download,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

type UserStatus = 'Active' | 'Inactive' | 'Suspended'

type AdminUser = {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  joined: string
  transactions: number
  revenue: number
  initials: string
}

const initialUsers: AdminUser[] = [
  {
    id: 'USR-001',
    name: 'Olivia Martin',
    email: 'olivia.m@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Nov 02, 2026',
    transactions: 28,
    revenue: 12500,
    initials: 'OM',
  },
  {
    id: 'USR-002',
    name: 'Noah Williams',
    email: 'noah.w@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Nov 05, 2026',
    transactions: 19,
    revenue: 8400,
    initials: 'NW',
  },
  {
    id: 'USR-003',
    name: 'Sophia Anderson',
    email: 'sophia.a@example.com',
    role: 'Manager',
    status: 'Active',
    joined: 'Oct 18, 2026',
    transactions: 42,
    revenue: 24600,
    initials: 'SA',
  },
  {
    id: 'USR-004',
    name: 'Liam Thompson',
    email: 'liam.t@example.com',
    role: 'Customer',
    status: 'Inactive',
    joined: 'Oct 12, 2026',
    transactions: 8,
    revenue: 3200,
    initials: 'LT',
  },
  {
    id: 'USR-005',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Sep 28, 2026',
    transactions: 35,
    revenue: 17800,
    initials: 'EW',
  },
  {
    id: 'USR-006',
    name: 'James Cooper',
    email: 'james.c@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Sep 14, 2026',
    transactions: 56,
    revenue: 30900,
    initials: 'JC',
  },
  {
    id: 'USR-007',
    name: 'Ava Mitchell',
    email: 'ava.m@example.com',
    role: 'Customer',
    status: 'Suspended',
    joined: 'Aug 21, 2026',
    transactions: 12,
    revenue: 5600,
    initials: 'AM',
  },
  {
    id: 'USR-008',
    name: 'Ethan Brooks',
    email: 'ethan.b@example.com',
    role: 'Customer',
    status: 'Active',
    joined: 'Aug 10, 2026',
    transactions: 24,
    revenue: 14200,
    initials: 'EB',
  },
]

const activities = [
  {
    title: 'New user registered',
    description: 'Olivia Martin created an account.',
    time: '12 minutes ago',
    icon: Users,
  },
  {
    title: 'Account status updated',
    description: 'A user account was activated.',
    time: '48 minutes ago',
    icon: UserCheck,
  },
  {
    title: 'Security check completed',
    description: 'System security verification successful.',
    time: '2 hours ago',
    icon: ShieldCheck,
  },
  {
    title: 'Analytics data refreshed',
    description: 'Dashboard data was updated.',
    time: '4 hours ago',
    icon: Activity,
  },
]

const statusStyles: Record<UserStatus, string> = {
  Active: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-400',
  Inactive: 'border-[#71808D]/20 bg-[#71808D]/10 text-[#A7B0BA]',
  Suspended: 'border-red-400/20 bg-red-400/10 text-red-400',
}

function AdminPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || user.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [users, searchTerm, statusFilter])

  const activeCount = users.filter((user) => user.status === 'Active').length
  const inactiveCount = users.filter((user) => user.status === 'Inactive').length
  const suspendedCount = users.filter((user) => user.status === 'Suspended').length

  const toggleUserStatus = (userId: string) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'Active' ? 'Inactive' : 'Active',
            }
          : user,
      ),
    )
    setActiveMenu(null)
    setSelectedUser(null)
  }

  const exportUsers = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined']
    const rows = filteredUsers.map((user) => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      user.joined,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'pulseboard-admin-users.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-screen w-full bg-[#111820] text-[#E8EDF2]">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 pt-24 pb-8 md:px-10 md:py-8">
        <div className="mx-auto max-w-[1500px]">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF704F]">
                Workspace / Administration
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Admin Dashboard<span className="text-[#FF704F]">.</span>
              </h1>
              <p className="mt-2 text-sm text-[#8996A3]">
                Manage users, monitor activity and oversee your workspace.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-xl border border-[#35414C] bg-[#202B35] px-4 py-3 sm:self-auto">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF704F]/15 text-[#FF8064]">
                <ShieldCheck size={19} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Administrator</p>
                <p className="mt-0.5 text-[10px] text-[#8996A3]">Full access · Demo</p>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: 'Total Users',
                value: users.length.toLocaleString(),
                change: '+12.8%',
                description: 'Compared to last month',
                icon: Users,
                trend: 'up',
              },
              {
                title: 'Active Users',
                value: activeCount.toLocaleString(),
                change: '+8.2%',
                description: 'Currently active accounts',
                icon: UserCheck,
                trend: 'up',
              },
              {
                title: 'Inactive Users',
                value: inactiveCount.toLocaleString(),
                change: `${suspendedCount} suspended`,
                description: 'Accounts needing attention',
                icon: UserX,
                trend: 'down',
              },
              {
                title: 'Total Revenue',
                value: '$117.2K',
                change: '+18.4%',
                description: 'Illustrative demo figure',
                icon: Activity,
                trend: 'up',
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.title}
                  className="group rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF704F]/70 hover:bg-[#26323B] hover:shadow-[0_0_30px_rgba(255,112,79,0.16)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF8064] transition-all duration-300 group-hover:bg-[#FF704F]/20 group-hover:shadow-[0_0_18px_rgba(255,112,79,0.25)]">
                      <Icon size={19} />
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                      {stat.trend === 'up' ? <ArrowUpRight size={13} /> : null}
                      {stat.change}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-medium text-[#8996A3]">
                    {stat.title}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-white transition-colors group-hover:text-[#FF8064]">
                    {stat.value}
                  </h3>
                  <p className="mt-2 text-[10px] text-[#71808D]">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </section>

          {/* Users and Activity */}
          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">

            {/* User Management */}
            <div className="min-w-0 overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35]">
              <div className="flex flex-col justify-between gap-4 border-b border-[#35414C] p-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-bold text-white">User Management</h2>
                  <p className="mt-1 text-xs text-[#8996A3]">
                    Manage and monitor workspace users.
                  </p>
                </div>

                <button
                  onClick={exportUsers}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#46535F] bg-[#151F28] px-4 py-2.5 text-xs font-semibold text-[#C0C8D0] transition hover:border-[#FF704F]/50 hover:text-[#FF8064]"
                >
                  <Download size={15} />
                  Export Users
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col gap-3 border-b border-[#35414C] p-5 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71808D]"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search name, email or ID..."
                    className="w-full rounded-xl border border-[#35414C] bg-[#151F28] py-3 pl-10 pr-4 text-xs text-white outline-none transition placeholder:text-[#71808D] focus:border-[#FF704F]/60 focus:ring-2 focus:ring-[#FF704F]/10"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#35414C] bg-[#151F28] py-3 pl-4 pr-10 text-xs text-[#C0C8D0] outline-none transition focus:border-[#FF704F]/60 sm:w-40"
                  >
                    <option value="All">All Users</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8996A3]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left">
                  <thead>
                    <tr className="border-b border-[#35414C] bg-[#19232C]">
                      <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-[#71808D]">User</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-[#71808D]">Role</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-[#71808D]">Status</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-[#71808D]">Joined</th>
                      <th className="px-4 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-[#71808D]">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#35414C]/70 transition-colors hover:bg-[#26323B] last:border-0"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FF704F]/20 bg-[#FF704F]/10 text-[10px] font-bold text-[#FF8064]">
                              {user.initials}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{user.name}</p>
                              <p className="mt-1 text-[10px] text-[#8996A3]">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-xs text-[#A7B0BA]">{user.role}</td>

                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyles[user.status]}`}>
                            {user.status}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-[10px] text-[#8996A3]">{user.joined}</td>

                        <td className="relative px-4 py-4 text-right">
                          <button
                            onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                            className="rounded-lg p-2 text-[#8996A3] transition hover:bg-[#FF704F]/10 hover:text-[#FF8064]"
                            aria-label={`Actions for ${user.name}`}
                          >
                            <MoreHorizontal size={18} />
                          </button>

                          {activeMenu === user.id && (
                            <div className="absolute right-8 top-12 z-20 w-44 rounded-xl border border-[#46535F] bg-[#151F28] p-1.5 text-left shadow-xl">
                              <button
                                onClick={() => {
                                  setSelectedUser(user)
                                  setActiveMenu(null)
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-[#C0C8D0] transition hover:bg-[#26323B] hover:text-white"
                              >
                                <Eye size={14} />
                                View Details
                              </button>
                              {user.status !== 'Suspended' && (
                                <button
                                  onClick={() => toggleUserStatus(user.id)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-[#C0C8D0] transition hover:bg-[#26323B] hover:text-[#FF8064]"
                                >
                                  {user.status === 'Active' ? (
                                    <Ban size={14} />
                                  ) : (
                                    <CheckCircle2 size={14} />
                                  )}
                                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-xs text-[#8996A3]">
                          No users found. Try another search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[#35414C] px-5 py-4">
                <p className="text-[10px] text-[#8996A3]">
                  Showing <span className="font-semibold text-white">{filteredUsers.length}</span> of{' '}
                  <span className="font-semibold text-white">{users.length}</span> users
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-[#35414C] bg-[#202B35] p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Recent Activity</h2>
                  <p className="mt-1 text-xs text-[#8996A3]">Latest workspace events.</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF8064]">
                  <Activity size={18} />
                </div>
              </div>

              <div className="space-y-5">
                {activities.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.title} className="group flex gap-3">
                      <div className="relative">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#35414C] bg-[#151F28] text-[#FF8064] transition group-hover:border-[#FF704F]/40 group-hover:bg-[#FF704F]/10">
                          <Icon size={16} />
                        </div>
                        {index !== activities.length - 1 && (
                          <div className="absolute left-1/2 top-10 h-6 w-px -translate-x-1/2 bg-[#35414C]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pb-1">
                        <p className="text-xs font-semibold text-[#E8EDF2] transition group-hover:text-[#FF8064]">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-[10px] leading-5 text-[#8996A3]">
                          {activity.description}
                        </p>
                        <p className="mt-2 flex items-center gap-1 text-[9px] text-[#71808D]">
                          <Clock3 size={11} />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* System Status */}
          <section className="mb-8">
            <div className="mb-5">
              <h2 className="text-base font-bold text-white">System Overview</h2>
              <p className="mt-1 text-xs text-[#8996A3]">
                Illustrative service health indicators.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { name: 'Application Server', detail: 'Operational', icon: Server },
                { name: 'Database', detail: 'Connected · Demo', icon: Database },
                { name: 'Security', detail: 'Protected · Demo', icon: LockKeyhole },
              ].map((service) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.name}
                    className="group flex items-center justify-between rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF704F]/70 hover:bg-[#26323B] hover:shadow-[0_0_30px_rgba(255,112,79,0.16)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF8064] transition group-hover:bg-[#FF704F]/20">
                        <Icon size={19} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{service.name}</p>
                        <p className="mt-1 text-[10px] text-[#8996A3]">{service.detail}</p>
                      </div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  </div>
                )
              })}
            </div>
          </section>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#35414C] pt-5">
            <p className="text-[10px] text-[#71808D]">
              PULSEBOARD ADMINISTRATION · DEMO ENVIRONMENT
            </p>
            <div className="flex items-center gap-2 text-[10px] text-[#8996A3]">
              <Settings size={13} />
              Admin controls
            </div>
          </div>
        </div>
      </main>

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#46535F] bg-[#202B35] p-6 shadow-[0_0_40px_rgba(255,112,79,0.10)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF8064]">
                  User information
                </p>
                <h2 className="mt-2 text-xl font-bold text-white">User Details</h2>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-[#8996A3] transition hover:bg-[#FF704F]/10 hover:text-[#FF8064]"
                aria-label="Close user details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#35414C] bg-[#151F28] p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF704F]/15 text-lg font-bold text-[#FF8064]">
                {selectedUser.initials}
              </div>
              <div>
                <h3 className="font-bold text-white">{selectedUser.name}</h3>
                <p className="mt-1 text-xs text-[#8996A3]">{selectedUser.email}</p>
                <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyles[selectedUser.status]}`}>
                  {selectedUser.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['User ID', selectedUser.id],
                ['Role', selectedUser.role],
                ['Joined', selectedUser.joined],
                ['Transactions', String(selectedUser.transactions)],
                ['Revenue', `$${selectedUser.revenue.toLocaleString()}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#35414C] bg-[#151F28] p-3">
                  <p className="text-[10px] text-[#71808D]">{label}</p>
                  <p className="mt-1 break-words text-xs font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full rounded-xl border border-[#46535F] py-3 text-xs font-semibold text-[#C0C8D0] transition hover:border-[#FF704F]/50 hover:text-[#FF8064]"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
