
import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Search,
  Users,
  UserCheck,
  UserPlus,
  Wallet,
  MoreHorizontal,
  Mail,
  CalendarDays,
  ShoppingBag,
  X,
  ArrowUpRight,
  Crown,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

type CustomerStatus = 'Active' | 'Inactive'

type Customer = {
  id: string
  name: string
  email: string
  initials: string
  color: string
  joined: string
  orders: number
  spent: number
  status: CustomerStatus
}

const customers: Customer[] = [
  {
    id: 'CUS-001',
    name: 'Olivia Martin',
    email: 'olivia.m@example.com',
    initials: 'OM',
    color: 'bg-orange-500/15 text-orange-400',
    joined: 'Nov 21, 2026',
    orders: 12,
    spent: 4850,
    status: 'Active',
  },
  {
    id: 'CUS-002',
    name: 'Noah Williams',
    email: 'noah.w@example.com',
    initials: 'NW',
    color: 'bg-blue-500/15 text-blue-400',
    joined: 'Nov 18, 2026',
    orders: 8,
    spent: 3240,
    status: 'Active',
  },
  {
    id: 'CUS-003',
    name: 'Sophia Anderson',
    email: 'sophia.a@example.com',
    initials: 'SA',
    color: 'bg-purple-500/15 text-purple-400',
    joined: 'Nov 15, 2026',
    orders: 21,
    spent: 8920,
    status: 'Active',
  },
  {
    id: 'CUS-004',
    name: 'Liam Thompson',
    email: 'liam.t@example.com',
    initials: 'LT',
    color: 'bg-emerald-500/15 text-emerald-400',
    joined: 'Nov 12, 2026',
    orders: 3,
    spent: 760,
    status: 'Inactive',
  },
  {
    id: 'CUS-005',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    initials: 'EW',
    color: 'bg-pink-500/15 text-pink-400',
    joined: 'Nov 09, 2026',
    orders: 16,
    spent: 6420,
    status: 'Active',
  },
  {
    id: 'CUS-006',
    name: 'James Cooper',
    email: 'james.c@example.com',
    initials: 'JC',
    color: 'bg-cyan-500/15 text-cyan-400',
    joined: 'Nov 05, 2026',
    orders: 6,
    spent: 2180,
    status: 'Active',
  },
  {
    id: 'CUS-007',
    name: 'Ava Mitchell',
    email: 'ava.m@example.com',
    initials: 'AM',
    color: 'bg-yellow-500/15 text-yellow-400',
    joined: 'Oct 28, 2026',
    orders: 2,
    spent: 540,
    status: 'Inactive',
  },
  {
    id: 'CUS-008',
    name: 'Ethan Brooks',
    email: 'ethan.b@example.com',
    initials: 'EB',
    color: 'bg-indigo-500/15 text-indigo-400',
    joined: 'Oct 20, 2026',
    orders: 10,
    spent: 3760,
    status: 'Active',
  },
]

function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null)

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || customer.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const activeCount = customers.filter(
    (customer) => customer.status === 'Active',
  ).length

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.spent,
    0,
  )

  return (
    <div className="flex min-h-screen w-full bg-[#111820] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-[1500px]">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 text-sm text-[#A7B0BA] transition hover:text-[#FF704F]"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF8064]">
                Relationship Management
              </p>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Customers
              </h1>
              <p className="mt-2 text-sm text-[#A7B0BA]">
                Understand your audience and build stronger relationships.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#35414C] bg-[#202B35] px-4 py-3 text-xs text-[#A7B0BA]">
              <Users size={16} className="text-[#FF8064]" />
              Customer Directory
            </div>
          </div>

          {/* Customer statistics */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="group relative overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF704F]/60 hover:shadow-[0_12px_35px_rgba(255,112,79,0.10)]">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm text-[#A7B0BA]">Total Customers</span>
                <div className="rounded-xl bg-[#FF704F]/10 p-2.5 text-[#FF8064]">
                  <Users size={19} />
                </div>
              </div>
              <h2 className="text-3xl font-bold">2,480</h2>
              <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight size={14} />
                12.8% <span className="text-[#75818D]">vs last month</span>
              </p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF704F] transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF704F]/60 hover:shadow-[0_12px_35px_rgba(255,112,79,0.10)]">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm text-[#A7B0BA]">Active Customers</span>
                <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400">
                  <UserCheck size={19} />
                </div>
              </div>
              <h2 className="text-3xl font-bold">{activeCount}</h2>
              <p className="mt-2 text-xs text-[#75818D]">
                From the displayed customer sample
              </p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF704F] transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF704F]/60 hover:shadow-[0_12px_35px_rgba(255,112,79,0.10)]">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm text-[#A7B0BA]">New Customers</span>
                <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                  <UserPlus size={19} />
                </div>
              </div>
              <h2 className="text-3xl font-bold">186</h2>
              <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                <ArrowUpRight size={14} />
                8.4% <span className="text-[#75818D]">this month</span>
              </p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF704F] transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF704F]/60 hover:shadow-[0_12px_35px_rgba(255,112,79,0.10)]">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm text-[#A7B0BA]">Customer Revenue</span>
                <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400">
                  <Wallet size={19} />
                </div>
              </div>
              <h2 className="text-3xl font-bold">
                ${(totalRevenue / 1000).toFixed(1)}k
              </h2>
              <p className="mt-2 text-xs text-[#75818D]">
                Across displayed customers
              </p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF704F] transition-all duration-500 group-hover:w-full" />
            </div>
          </div>

          {/* Customer table */}
          <section className="overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35]">
            <div className="flex flex-col justify-between gap-5 border-b border-[#35414C] p-5 md:flex-row md:items-center md:p-6">
              <div>
                <h2 className="text-lg font-semibold">All Customers</h2>
                <p className="mt-1 text-xs text-[#75818D]">
                  Manage and monitor your customer base
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#75818D]"
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search customers..."
                    className="w-full rounded-xl border border-[#35414C] bg-[#151F28] py-2.5 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-[#65717D] focus:border-[#FF704F]/70 sm:w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-xl border border-[#35414C] bg-[#151F28] px-4 py-2.5 text-sm text-[#A7B0BA] outline-none transition focus:border-[#FF704F]/70"
                >
                  <option value="All">All Customers</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="border-b border-[#35414C] bg-[#18232D] text-[11px] uppercase tracking-wider text-[#75818D]">
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Customer ID</th>
                    <th className="px-5 py-4 font-semibold">Joined Date</th>
                    <th className="px-5 py-4 font-semibold">Orders</th>
                    <th className="px-5 py-4 font-semibold">Total Spent</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="group border-b border-[#35414C]/70 transition hover:bg-[#293642]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${customer.color}`}
                          >
                            {customer.initials}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#E8EDF2] transition group-hover:text-[#FF8064]">
                              {customer.name}
                            </p>
                            <p className="mt-1 text-xs text-[#75818D]">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs text-[#A7B0BA]">
                        {customer.id}
                      </td>

                      <td className="px-5 py-4 text-xs text-[#A7B0BA]">
                        {customer.joined}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#D5DCE3]">
                        {customer.orders}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#E8EDF2]">
                        ${customer.spent.toLocaleString('en-US')}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${
                            customer.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-[#75818D]/10 text-[#A7B0BA]'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              customer.status === 'Active'
                                ? 'bg-emerald-400'
                                : 'bg-[#75818D]'
                            }`}
                          />
                          {customer.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="rounded-lg border border-transparent p-2 text-[#75818D] transition hover:border-[#FF704F]/30 hover:bg-[#FF704F]/10 hover:text-[#FF8064]"
                          title="View customer details"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-14 text-center text-sm text-[#75818D]"
                      >
                        No customers found. Try another search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-2 px-6 py-4 text-xs text-[#75818D] sm:flex-row sm:items-center">
              <span>
                Showing {filteredCustomers.length} of {customers.length} customers
              </span>
              <span>Customer data is sample data</span>
            </div>
          </section>
        </div>
      </main>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div
          onClick={() => setSelectedCustomer(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35] shadow-2xl shadow-black/40"
          >
            <div className="flex items-center justify-between border-b border-[#35414C] px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FF8064]">
                  Customer Profile
                </p>
                <h3 className="mt-1 text-lg font-semibold">Customer Details</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-2 text-[#A7B0BA] transition hover:bg-[#35414C] hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold ${selectedCustomer.color}`}
                >
                  {selectedCustomer.initials}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    {selectedCustomer.name}
                  </h4>
                  <p className="mt-1 text-xs text-[#75818D]">
                    {selectedCustomer.id}
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      selectedCustomer.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-[#75818D]/10 text-[#A7B0BA]'
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              <div className="my-6 space-y-4 border-y border-[#35414C] py-5">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-[#FF8064]" />
                  <span className="text-[#A7B0BA]">
                    {selectedCustomer.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays size={16} className="text-[#FF8064]" />
                  <span className="text-[#A7B0BA]">
                    Joined {selectedCustomer.joined}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#35414C] bg-[#151F28] p-4">
                  <ShoppingBag size={17} className="mb-3 text-[#FF8064]" />
                  <p className="text-xl font-bold">{selectedCustomer.orders}</p>
                  <p className="mt-1 text-xs text-[#75818D]">Total Orders</p>
                </div>
                <div className="rounded-xl border border-[#35414C] bg-[#151F28] p-4">
                  <Crown size={17} className="mb-3 text-[#FF8064]" />
                  <p className="text-xl font-bold">
                    ${selectedCustomer.spent.toLocaleString('en-US')}
                  </p>
                  <p className="mt-1 text-xs text-[#75818D]">Total Spent</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="mt-6 w-full rounded-xl bg-[#FF704F] py-3 text-sm font-semibold text-[#111820] transition hover:bg-[#FF866B] hover:shadow-[0_0_24px_rgba(255,112,79,0.25)]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomersPage
