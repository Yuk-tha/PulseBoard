
import {
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  Download,
  Eye,
  Copy,
  FileDown,
  X,
  Check,
  Receipt,
  CalendarDays,
  Mail,
  UserRound,
  CreditCard,
} from 'lucide-react'

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { DateRange } from '../App'

type RecentTransactionsProps = {
  searchTerm: string
  dateRange: DateRange
  showViewAllButton?: boolean
}

type TransactionStatus = 'All' | 'Completed' | 'Pending' | 'Failed'

const transactions = [
  {
    id: 'INV-2026-001',
    name: 'Olivia Martin',
    email: 'olivia.m@example.com',
    date: 'Nov 21, 2026',
    amount: '$1,250.00',
    status: 'Completed',
    initials: 'OM',
    color: 'bg-purple-500/20 text-purple-300',
    type: 'income',
  },
  {
    id: 'INV-2026-002',
    name: 'Noah Williams',
    email: 'noah.w@example.com',
    date: 'Nov 20, 2026',
    amount: '$840.00',
    status: 'Pending',
    initials: 'NW',
    color: 'bg-blue-500/20 text-blue-300',
    type: 'income',
  },
  {
    id: 'INV-2026-003',
    name: 'Sophia Anderson',
    email: 'sophia.a@example.com',
    date: 'Nov 19, 2026',
    amount: '$2,400.00',
    status: 'Completed',
    initials: 'SA',
    color: 'bg-pink-500/20 text-pink-300',
    type: 'income',
  },
  {
    id: 'INV-2026-004',
    name: 'Liam Thompson',
    email: 'liam.t@example.com',
    date: 'Nov 18, 2026',
    amount: '$560.00',
    status: 'Failed',
    initials: 'LT',
    color: 'bg-amber-500/20 text-amber-300',
    type: 'expense',
  },
  {
    id: 'INV-2026-005',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    date: 'Nov 17, 2026',
    amount: '$1,780.00',
    status: 'Completed',
    initials: 'EW',
    color: 'bg-emerald-500/20 text-emerald-300',
    type: 'income',
  },
  {
    id: 'INV-2026-006',
    name: 'James Cooper',
    email: 'james.c@example.com',
    date: 'Nov 12, 2026',
    amount: '$920.00',
    status: 'Completed',
    initials: 'JC',
    color: 'bg-cyan-500/20 text-cyan-300',
    type: 'income',
  },
  {
    id: 'INV-2026-007',
    name: 'Ava Mitchell',
    email: 'ava.m@example.com',
    date: 'Nov 02, 2026',
    amount: '$1,450.00',
    status: 'Pending',
    initials: 'AM',
    color: 'bg-orange-500/20 text-orange-300',
    type: 'income',
  },
  {
    id: 'INV-2026-008',
    name: 'Ethan Brooks',
    email: 'ethan.b@example.com',
    date: 'Oct 28, 2026',
    amount: '$680.00',
    status: 'Failed',
    initials: 'EB',
    color: 'bg-indigo-500/20 text-indigo-300',
    type: 'expense',
  },
  {
    id: 'INV-2026-009',
    name: 'Mia Parker',
    email: 'mia.p@example.com',
    date: 'Sep 14, 2026',
    amount: '$2,100.00',
    status: 'Completed',
    initials: 'MP',
    color: 'bg-rose-500/20 text-rose-300',
    type: 'income',
  },
]

const statusOptions: TransactionStatus[] = [
  'All',
  'Completed',
  'Pending',
  'Failed',
]

type Transaction = (typeof transactions)[number]

function RecentTransactions({
  searchTerm,
  dateRange,
  showViewAllButton = true,
}: RecentTransactionsProps) {
  const [activeStatus, setActiveStatus] =
    useState<TransactionStatus>('All')

  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

  const [copiedId, setCopiedId] = useState<string | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTransaction(null)
        setOpenMenuId(null)
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(today)

  if (dateRange === '7days') {
    startDate.setDate(today.getDate() - 6)
  } else if (dateRange === '30days') {
    startDate.setDate(today.getDate() - 29)
  } else if (dateRange === 'month') {
    startDate.setDate(1)
  }

  const dateFilteredTransactions = transactions.filter((item) => {
    if (dateRange === 'all') return true

    const transactionDate = new Date(item.date)
    transactionDate.setHours(0, 0, 0, 0)

    return transactionDate >= startDate && transactionDate <= today
  })

  const statusFilteredTransactions = dateFilteredTransactions.filter(
    (item) => activeStatus === 'All' || item.status === activeStatus
  )

  const filteredTransactions = statusFilteredTransactions.filter(
    (item) => {
      const search = searchTerm.trim().toLowerCase()

      return (
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search)
      )
    }
  )

  const statusCounts = {
    All: dateFilteredTransactions.length,
    Completed: dateFilteredTransactions.filter(
      (item) => item.status === 'Completed'
    ).length,
    Pending: dateFilteredTransactions.filter(
      (item) => item.status === 'Pending'
    ).length,
    Failed: dateFilteredTransactions.filter(
      (item) => item.status === 'Failed'
    ).length,
  }

  const handleExport = () => {
    const headers = [
      'Invoice ID',
      'Customer',
      'Email',
      'Date',
      'Amount',
      'Status',
      'Type',
    ]

    const rows = filteredTransactions.map((item) => [
      item.id,
      item.name,
      item.email,
      item.date,
      item.amount,
      item.status,
      item.type,
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `pulseboard-transactions-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const handleCopyInvoice = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id)
      setCopiedId(id)
    } catch {
      window.prompt('Copy invoice ID:', id)
    }

    setOpenMenuId(null)
  }

  const handleDownloadReceipt = (item: Transaction) => {
    const receiptContent = `
PULSEBOARD
TRANSACTION RECEIPT
----------------------------------

Invoice ID: ${item.id}
Customer: ${item.name}
Email: ${item.email}

Transaction Date: ${item.date}
Amount: ${item.amount}
Transaction Type: ${item.type}
Payment Status: ${item.status}

----------------------------------
Thank you for using PulseBoard.
This is a demo receipt generated
from sample dashboard data.
    `

    const blob = new Blob([receiptContent], {
      type: 'text/plain;charset=utf-8',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `receipt-${item.id}.txt`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
    setOpenMenuId(null)
  }

  const getStatusStyle = (status: string) => {
    if (status === 'Completed') {
      return 'bg-emerald-500/10 text-emerald-400'
    }

    if (status === 'Pending') {
      return 'bg-amber-500/10 text-amber-400'
    }

    return 'bg-red-500/10 text-red-400'
  }

  return (
    <section className="rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white">
            Recent transactions
          </h2>

          <p className="mt-1 text-xs text-[#788693]">
            Track your latest payments and orders
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-[#35414C] px-3 py-2 text-xs font-semibold text-[#A7B0BA] transition hover:border-[#FF704F] hover:bg-[#FF704F]/10 hover:text-[#FF704F]"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Status Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {statusOptions.map((status) => {
          const isActive = activeStatus === status

          return (
            <button
              key={status}
              type="button"
              onClick={() => setActiveStatus(status)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'border-[#FF704F] bg-[#FF704F] text-[#111820] shadow-[0_0_18px_rgba(255,112,79,0.2)]'
                  : 'border-[#35414C] bg-transparent text-[#A7B0BA] hover:border-[#FF704F]/60 hover:bg-[#FF704F]/10 hover:text-[#FF8064]'
              }`}
            >
              {status}
              <span className="ml-1.5 opacity-80">
                ({statusCounts[status]})
              </span>
            </button>
          )
        })}
      </div>

      {/* Transaction Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="border-b border-[#35414C] text-[10px] uppercase tracking-[1.5px] text-[#788693]">
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Amount</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((item) => (
              <tr
                key={item.id}
                className="group border-b border-[#35414C]/60 transition hover:bg-[#FF704F]/[0.04]"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${item.color}`}>
                      {item.initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[11px] text-[#788693]">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 text-xs text-[#A7B0BA]">
                  {item.date}
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-white">
                    {item.type === 'income' ? (
                      <ArrowDownLeft size={14} className="text-[#FF8064]" />
                    ) : (
                      <ArrowUpRight size={14} className="text-red-400" />
                    )}
                    {item.amount}
                  </div>

                  <p className="mt-1 text-[10px] text-[#788693]">
                    {item.id}
                  </p>
                </td>

                <td className="py-4">
                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* Action Menu */}
                <td className="py-4 text-right">
                  <div
                    className="relative inline-block"
                    ref={openMenuId === item.id ? menuRef : null}
                  >
                    <button
                      type="button"
                      aria-label={`More options for ${item.id}`}
                      aria-expanded={openMenuId === item.id}
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === item.id ? null : item.id
                        )
                      }
                      className={`rounded-lg p-2 transition ${
                        openMenuId === item.id
                          ? 'bg-[#FF704F]/15 text-[#FF8064]'
                          : 'text-[#788693] hover:bg-[#35414C] hover:text-white'
                      }`}
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-[#35414C] bg-[#151F28] p-1.5 text-left shadow-[0_15px_45px_rgba(0,0,0,0.45)] animate-in fade-in zoom-in-95 duration-150">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTransaction(item)
                            setOpenMenuId(null)
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#A7B0BA] transition hover:bg-[#FF704F]/10 hover:text-[#FF8064]"
                        >
                          <Eye size={15} />
                          View details
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyInvoice(item.id)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#A7B0BA] transition hover:bg-[#FF704F]/10 hover:text-[#FF8064]"
                        >
                          {copiedId === item.id ? <Check size={15} /> : <Copy size={15} />}
                          {copiedId === item.id ? 'Copied!' : 'Copy invoice ID'}
                        </button>

                        <div className="my-1 border-t border-[#35414C]" />

                        <button
                          type="button"
                          onClick={() => handleDownloadReceipt(item)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-[#A7B0BA] transition hover:bg-[#FF704F]/10 hover:text-[#FF8064]"
                        >
                          <FileDown size={15} />
                          Download receipt
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF704F]/10">
              <Download size={20} className="text-[#FF704F]" />
            </div>

            <p className="text-sm font-semibold text-white">
              No transactions found
            </p>

            <p className="mt-1 text-xs text-[#788693]">
              Try changing your status, date range or search term.
            </p>

            <button
              type="button"
              onClick={() => setActiveStatus('All')}
              className="mt-4 text-xs font-semibold text-[#FF8064] transition hover:text-[#FF987F]"
            >
              Clear status filter
            </button>
          </div>
        )}
      </div>

      {/* View All Navigation */}
      {showViewAllButton && (
        <Link
          to="/transactions"
          className="mt-5 flex w-full items-center justify-center rounded-xl border border-[#35414C] py-3 text-xs font-semibold text-[#A7B0BA] transition hover:border-[#FF704F]/50 hover:bg-[#FF704F]/5 hover:text-[#FF8064]"
        >
          View all transactions →
        </Link>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTransaction(null)
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-modal-title"
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#35414C] bg-[#151F28] shadow-[0_25px_80px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-200"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#FF704F] via-[#FF987F] to-transparent" />

            <div className="flex items-center justify-between border-b border-[#35414C] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF704F]">
                  <Receipt size={21} />
                </div>

                <div>
                  <h3
                    id="transaction-modal-title"
                    className="font-['Space_Grotesk'] text-lg font-bold text-white"
                  >
                    Transaction details
                  </h3>
                  <p className="mt-1 text-[11px] text-[#788693]">
                    Complete payment information
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close transaction details"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-xl p-2 text-[#788693] transition hover:bg-[#35414C] hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="px-6 py-7 text-center">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold ${selectedTransaction.color}`}>
                {selectedTransaction.initials}
              </div>

              <h4 className="mt-3 text-base font-semibold text-white">
                {selectedTransaction.name}
              </h4>

              <p className="mt-1 text-xs text-[#788693]">
                {selectedTransaction.email}
              </p>

              <h2 className="mt-5 font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white">
                {selectedTransaction.amount}
              </h2>

              <span className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${getStatusStyle(selectedTransaction.status)}`}>
                {selectedTransaction.status}
              </span>
            </div>

            <div className="mx-6 rounded-2xl border border-[#35414C] bg-[#202B35] p-5">
              <div className="flex items-center justify-between gap-3 border-b border-[#35414C]/70 pb-4">
                <div className="flex items-center gap-2 text-[#788693]">
                  <CreditCard size={15} />
                  <span className="text-xs">Invoice ID</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">
                    {selectedTransaction.id}
                  </span>

                  <button
                    type="button"
                    aria-label="Copy invoice ID"
                    onClick={() => handleCopyInvoice(selectedTransaction.id)}
                    className="text-[#FF8064] transition hover:text-[#FF987F]"
                  >
                    {copiedId === selectedTransaction.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-[#35414C]/70 py-4">
                <div className="flex items-center gap-2 text-[#788693]">
                  <CalendarDays size={15} />
                  <span className="text-xs">Transaction date</span>
                </div>

                <span className="text-xs font-semibold text-white">
                  {selectedTransaction.date}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-[#35414C]/70 py-4">
                <div className="flex items-center gap-2 text-[#788693]">
                  <Mail size={15} />
                  <span className="text-xs">Email address</span>
                </div>

                <span className="max-w-[55%] truncate text-xs font-semibold text-white">
                  {selectedTransaction.email}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-[#35414C]/70 py-4">
                <div className="flex items-center gap-2 text-[#788693]">
                  <UserRound size={15} />
                  <span className="text-xs">Transaction type</span>
                </div>

                <span className="text-xs font-semibold capitalize text-white">
                  {selectedTransaction.type}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4">
                <span className="text-xs text-[#788693]">
                  Payment status
                </span>

                <span className={`text-xs font-semibold ${selectedTransaction.status === 'Completed' ? 'text-emerald-400' : selectedTransaction.status === 'Pending' ? 'text-amber-400' : 'text-red-400'}`}>
                  {selectedTransaction.status}
                </span>
              </div>
            </div>

            <div className="flex gap-3 p-6">
              <button
                type="button"
                onClick={() => handleDownloadReceipt(selectedTransaction)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FF704F] px-4 py-3 text-xs font-bold text-[#111820] transition hover:-translate-y-0.5 hover:bg-[#FF896F] hover:shadow-[0_8px_25px_rgba(255,112,79,0.2)]"
              >
                <Download size={15} />
                Download receipt
              </button>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-xl border border-[#35414C] px-5 py-3 text-xs font-semibold text-[#A7B0BA] transition hover:border-[#FF704F]/60 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default RecentTransactions
