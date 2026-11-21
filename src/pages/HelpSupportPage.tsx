
import { useState } from 'react'
import {
  Search,
  CircleHelp,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ArrowUpRight,
  LifeBuoy,
  Zap,
  BarChart3,
  CreditCard,
  Users,
  ShieldCheck,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

const faqs = [
  {
    question: 'How do I get started with PulseBoard?',
    answer:
      'Start from the Overview dashboard to explore business metrics, revenue charts, recent transactions and activity. Use the sidebar to navigate between Analytics, Transactions, Customers and Settings.',
  },
  {
    question: 'How can I view my transaction history?',
    answer:
      'Open Transactions from the sidebar to view all available transaction records. You can search by customer or invoice ID, filter by date and status, and export the displayed records.',
  },
  {
    question: 'Can I customize my dashboard?',
    answer:
      'You can explore the Preferences section in Settings to choose appearance, language, timezone and date format. These are currently demonstration settings.',
  },
  {
    question: 'How do I manage customer information?',
    answer:
      'Navigate to Customers to search customer records, filter active and inactive customers, and open individual customer details.',
  },
  {
    question: 'How can I export analytics reports?',
    answer:
      'Visit Analytics and use the Export Report option to open the browser print dialog. You can choose Save as PDF to create a report.',
  },
  {
    question: 'Is my account information secure?',
    answer:
      'PulseBoard currently uses demonstration data and frontend-only account settings. Authentication, database storage and production security features require backend integration.',
  },
]

const categories = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn the basics of your dashboard.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Understand metrics and performance.',
    color: 'text-[#FF8064]',
    bg: 'bg-[#FF704F]/10',
  },
  {
    icon: CreditCard,
    title: 'Transactions',
    description: 'Manage payments and records.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Users,
    title: 'Customers',
    description: 'Explore customer management.',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    icon: ShieldCheck,
    title: 'Account & Security',
    description: 'Manage your account preferences.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    icon: LifeBuoy,
    title: 'Troubleshooting',
    description: 'Find answers to common issues.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
]

function HelpSupportPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full bg-[#111820] text-[#E8EDF2]">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 pt-24 pb-8 md:px-10 md:py-8">
        <div className="mx-auto max-w-[1200px]">

          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF704F]">
              Workspace / General
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Help & Support<span className="text-[#FF704F]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#8996A3]">
              Find answers, explore guides and get the help you need.
            </p>
          </div>

          {/* Hero */}
          <section className="relative mb-8 overflow-hidden rounded-3xl border border-[#FF704F]/20 bg-gradient-to-br from-[#26323B] via-[#202B35] to-[#151F28] p-7 md:p-10">
            <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#FF704F]/10 blur-[80px]" />

            <div className="relative z-10 max-w-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF704F]/15 text-[#FF8064]">
                <CircleHelp size={25} />
              </div>

              <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                How can we help you
                <span className="text-[#FF8064]"> today?</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#A7B0BA]">
                Search our help center to find guides, answers and useful information.
              </p>

              <div className="mt-7 flex max-w-xl items-center gap-3 rounded-xl border border-[#46535F] bg-[#111820]/80 px-4 py-3 transition focus-within:border-[#FF704F]/70 focus-within:shadow-[0_0_25px_rgba(255,112,79,0.08)]">
                <Search size={19} className="shrink-0 text-[#8996A3]" />
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setOpenFaq(null)
                  }}
                  placeholder="Search for answers..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#71808D]"
                />
                <span className="hidden rounded-md border border-[#46535F] px-2 py-1 text-[10px] text-[#8996A3] sm:block">
                  HELP
                </span>
              </div>
            </div>
          </section>

          {/* Help Categories */}
          <section className="mb-10">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-white">Explore Help Topics</h2>
              <p className="mt-1 text-xs text-[#8996A3]">
                Browse guides by category.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon

                return (
                  <div
                    key={category.title}
                    className="group rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF704F]/40 hover:shadow-[0_12px_35px_rgba(255,112,79,0.08)]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.bg} ${category.color}`}>
                        <Icon size={20} />
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-[#71808D] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF8064]"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#8996A3]">
                      {category.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-1 text-xs text-[#8996A3]">
                  Quick answers to common questions.
                </p>
              </div>
              <span className="rounded-lg border border-[#35414C] bg-[#202B35] px-3 py-2 text-[11px] text-[#A7B0BA]">
                {filteredFaqs.length} articles
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35]">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="border-b border-[#35414C] last:border-0"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[#26323B]"
                    >
                      <span className="text-sm font-semibold text-[#E8EDF2]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#8996A3] transition-transform duration-300 ${
                          openFaq === index ? 'rotate-180 text-[#FF8064]' : ''
                        }`}
                      />
                    </button>

                    {openFaq === index && (
                      <div className="px-5 pb-5">
                        <p className="max-w-3xl text-sm leading-7 text-[#A7B0BA]">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-5 py-12 text-center">
                  <Search size={25} className="mx-auto mb-3 text-[#71808D]" />
                  <p className="text-sm font-semibold text-white">No matching articles</p>
                  <p className="mt-2 text-xs text-[#8996A3]">
                    Try searching with a different keyword.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Support */}
          <section className="relative overflow-hidden rounded-2xl border border-[#FF704F]/20 bg-[#202B35] p-6 md:p-8">
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-[#FF704F]/10 blur-[70px]" />

            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF8064]">
                  <MessageCircle size={21} />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Still need a hand?
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#A7B0BA]">
                  Can't find what you're looking for? Reach out to our support team for assistance.
                </p>
              </div>

              <a
                href="mailto:support@pulseboard.demo?subject=PulseBoard%20Support"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF704F] px-5 py-3 text-sm font-bold text-[#111820] transition-all hover:-translate-y-1 hover:bg-[#FF8064] hover:shadow-[0_8px_25px_rgba(255,112,79,0.2)]"
              >
                <Mail size={17} />
                Contact Support
                <ArrowUpRight size={16} />
              </a>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[10px] text-[#71808D]">
            <span>PULSEBOARD SUPPORT CENTER © 2026</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Help center available
            </span>
          </div>

        </div>
      </main>
    </div>
  )
}

export default HelpSupportPage
