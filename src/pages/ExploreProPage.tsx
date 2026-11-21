
import { useState } from 'react'
import {
  Zap,
  Check,
  X,
  Sparkles,
  Crown,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Headphones,
  BarChart3,
  Download,
  Users,
  Database,
  ChevronDown,
  Star,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

type Billing = 'monthly' | 'yearly'

const plans = [
  {
    name: 'Free',
    description: 'Everything you need to get started.',
    monthly: 0,
    yearly: 0,
    icon: Zap,
    features: [
      'Basic analytics dashboard',
      'Up to 100 transactions',
      'Basic customer management',
      '7-day analytics history',
      'Community support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'More insights. Better decisions. Faster growth.',
    monthly: 19,
    yearly: 15,
    icon: Crown,
    features: [
      'Advanced analytics dashboard',
      'Unlimited transactions',
      'Advanced customer insights',
      '12-month analytics history',
      'CSV and PDF exports',
      'Priority email support',
    ],
    highlighted: true,
  },
  {
    name: 'Business',
    description: 'Powerful tools for growing businesses.',
    monthly: 49,
    yearly: 39,
    icon: Rocket,
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom analytics reports',
      'Unlimited history',
      'Advanced data insights',
      'Dedicated support',
    ],
    highlighted: false,
  },
]

const comparison = [
  { feature: 'Analytics dashboard', free: 'Basic', pro: 'Advanced', business: 'Advanced +' },
  { feature: 'Transaction history', free: '100', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'Customer insights', free: 'Basic', pro: 'Advanced', business: 'Advanced' },
  { feature: 'Analytics history', free: '7 days', pro: '12 months', business: 'Unlimited' },
  { feature: 'Data exports', free: false, pro: true, business: true },
  { feature: 'Team collaboration', free: false, pro: false, business: true },
  { feature: 'Custom reports', free: false, pro: false, business: true },
  { feature: 'Priority support', free: false, pro: true, business: true },
]

const faqs = [
  {
    question: 'Can I upgrade my plan at any time?',
    answer:
      'Yes. In a production version, you would be able to upgrade your subscription whenever your business needs change.',
  },
  {
    question: 'What happens when I choose the Free plan?',
    answer:
      'The Free plan provides basic dashboard access and limited analytics features for getting started.',
  },
  {
    question: 'What is included in the Pro plan?',
    answer:
      'Pro includes advanced analytics, unlimited transactions, longer history, data exports and priority support.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      'Subscription cancellation and billing management would be handled through the account billing portal in a production release.',
  },
]

function ExploreProPage() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="flex min-h-screen w-full bg-[#111820] text-[#E8EDF2]">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1250px]">

          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF704F]">
              Workspace / Upgrade
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Explore Pro<span className="text-[#FF704F]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#8996A3]">
              Choose the right tools to take your business analytics further.
            </p>
          </div>

          {/* Hero */}
          <section className="relative mb-10 overflow-hidden rounded-[28px] border border-[#FF704F]/20 bg-gradient-to-br from-[#303A43] via-[#202B35] to-[#151F28] p-7 md:p-12">
            <div className="pointer-events-none absolute -right-10 -top-20 h-80 w-80 rounded-full bg-[#FF704F]/15 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-orange-500/5 blur-[70px]" />

            <div className="relative z-10 max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF704F]/30 bg-[#FF704F]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF8064]">
                <Sparkles size={13} />
                PulseBoard Premium
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                See beyond the
                <span className="text-[#FF8064]"> numbers.</span>
                <br />
                Unlock your potential.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#A7B0BA] md:text-base">
                Get deeper business insights, smarter analytics and powerful
                tools designed to help you make confident decisions.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF704F] px-5 py-3 text-sm font-bold text-[#111820] transition hover:-translate-y-1 hover:bg-[#FF8064] hover:shadow-[0_8px_30px_rgba(255,112,79,0.25)]"
                >
                  Explore Plans
                  <ArrowRight size={17} />
                </a>
                <div className="flex items-center gap-2 rounded-xl border border-[#46535F] px-4 py-3 text-xs text-[#A7B0BA]">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Flexible plan options
                </div>
              </div>
            </div>

            <div className="relative mt-10 grid grid-cols-3 gap-3 border-t border-[#46535F]/60 pt-7 md:max-w-xl">
              {[
                ['01', 'Smarter insights'],
                ['02', 'Better decisions'],
                ['03', 'Faster growth'],
              ].map(([number, label]) => (
                <div key={number}>
                  <p className="text-xs font-bold text-[#FF8064]">{number}</p>
                  <p className="mt-2 text-xs font-medium text-[#D0D7DE]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="mb-12 scroll-mt-8">
            <div className="mb-7 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF8064]">
                Simple pricing
              </p>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Find your perfect plan
              </h2>
              <p className="mt-2 text-sm text-[#8996A3]">
                Start small. Upgrade when you're ready.
              </p>

              <div className="mt-6 inline-flex items-center gap-1 rounded-xl border border-[#35414C] bg-[#202B35] p-1.5">
                <button
                  onClick={() => setBilling('monthly')}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    billing === 'monthly'
                      ? 'bg-[#FF704F] text-[#111820]'
                      : 'text-[#A7B0BA] hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling('yearly')}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    billing === 'yearly'
                      ? 'bg-[#FF704F] text-[#111820]'
                      : 'text-[#A7B0BA] hover:text-white'
                  }`}
                >
                  Yearly
                  <span className={`rounded-md px-1.5 py-0.5 text-[9px] ${
                    billing === 'yearly'
                      ? 'bg-[#111820]/15'
                      : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid items-stretch gap-5 lg:grid-cols-3">
              {plans.map((plan) => {
                const Icon = plan.icon
                const price = billing === 'monthly' ? plan.monthly : plan.yearly
                const isSelected = selectedPlan === plan.name

                return (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                      plan.highlighted
                        ? 'border-[#FF704F]/70 bg-gradient-to-b from-[#FF704F]/10 to-[#202B35] shadow-[0_0_35px_rgba(255,112,79,0.10)] hover:shadow-[0_0_45px_rgba(255,112,79,0.2)]'
                        : 'border-[#35414C] bg-[#202B35] hover:border-[#FF704F]/40 hover:shadow-[0_12px_35px_rgba(255,112,79,0.07)]'
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF704F] px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#111820]">
                        Recommended
                      </div>
                    )}

                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF8064]">
                      <Icon size={21} />
                    </div>

                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-2 min-h-10 text-xs leading-5 text-[#8996A3]">
                      {plan.description}
                    </p>

                    <div className="mb-6 mt-5">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold tracking-tight text-white">
                          ${price}
                        </span>
                        <span className="mb-1 text-xs text-[#8996A3]">
                          / month
                        </span>
                      </div>
                      {billing === 'yearly' && price > 0 ? (
                        <p className="mt-2 text-[10px] text-[#8996A3]">
                          Billed annually (${price * 12}/year)
                        </p>
                      ) : (
                        <p className="mt-2 text-[10px] text-[#8996A3]">
                          {price === 0 ? 'Free forever (demo plan)' : 'Billed monthly'}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`mb-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                        isSelected
                          ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-400'
                          : plan.highlighted
                            ? 'bg-[#FF704F] text-[#111820] hover:bg-[#FF8064] hover:shadow-[0_5px_20px_rgba(255,112,79,0.2)]'
                            : 'border border-[#46535F] bg-[#151F28] text-white hover:border-[#FF704F]/50 hover:text-[#FF8064]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check size={16} />
                          Plan Selected
                        </>
                      ) : (
                        <>
                          Choose {plan.name}
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>

                    <div className="border-t border-[#35414C] pt-5">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8996A3]">
                        What's included
                      </p>

                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-xs text-[#C0C8D0]"
                          >
                            <Check size={15} className="mt-0.5 shrink-0 text-[#FF8064]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>

            {selectedPlan && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-5 py-4">
                <div className="flex items-center gap-3">
                  <Check size={18} className="text-emerald-400" />
                  <p className="text-sm text-white">
                    <span className="font-semibold">{selectedPlan}</span> plan selected.
                    <span className="ml-1 text-xs text-[#8996A3]">
                      This is a demo selection; no payment will be processed.
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-xs font-semibold text-[#A7B0BA] hover:text-white"
                >
                  Clear selection
                </button>
              </div>
            )}
          </section>

          {/* Comparison */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF8064]">
                Plan comparison
              </p>
              <h2 className="text-2xl font-bold text-white">
                Compare every feature
              </h2>
              <p className="mt-2 text-sm text-[#8996A3]">
                Find the right features for your business.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#35414C] bg-[#202B35]">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-b border-[#35414C] bg-[#151F28]">
                    <th className="px-5 py-4 text-xs font-semibold text-[#8996A3]">Features</th>
                    <th className="px-5 py-4 text-xs font-semibold text-white">Free</th>
                    <th className="px-5 py-4 text-xs font-semibold text-[#FF8064]">Pro</th>
                    <th className="px-5 py-4 text-xs font-semibold text-white">Business</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-[#35414C] last:border-0 hover:bg-[#26323B]">
                      <td className="px-5 py-4 text-xs font-medium text-[#C0C8D0]">{row.feature}</td>
                      {[row.free, row.pro, row.business].map((value, index) => (
                        <td key={index} className="px-5 py-4 text-xs text-[#A7B0BA]">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check size={16} className="text-emerald-400" />
                            ) : (
                              <X size={15} className="text-[#65727E]" />
                            )
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: BarChart3, title: 'Deeper analytics', text: 'Understand trends and track performance with more insights.' },
              { icon: Download, title: 'Better reporting', text: 'Export your data and keep useful business reports.' },
              { icon: Headphones, title: 'Priority support', text: 'Get dedicated assistance when your business needs it.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-[#35414C] bg-[#202B35] p-5 transition hover:-translate-y-1 hover:border-[#FF704F]/40">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF8064]">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#8996A3]">{item.text}</p>
                </div>
              )
            })}
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF8064]">
                Need to know
              </p>
              <h2 className="text-2xl font-bold text-white">Pricing FAQs</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#35414C] bg-[#202B35]">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="border-b border-[#35414C] last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[#26323B]"
                  >
                    <span className="text-sm font-semibold text-white">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#8996A3] transition-transform ${
                        openFaq === index ? 'rotate-180 text-[#FF8064]' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="px-5 pb-5 text-sm leading-7 text-[#A7B0BA]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="relative overflow-hidden rounded-2xl border border-[#FF704F]/25 bg-gradient-to-r from-[#292F36] to-[#202B35] p-7 md:p-9">
            <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-[#FF704F]/10 blur-[80px]" />
            <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[#FF8064]">
                  <Star size={16} fill="currentColor" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Your next step</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Ready to grow with PulseBoard?
                </h2>
                <p className="mt-2 text-sm text-[#A7B0BA]">
                  Explore the features and find the plan that works for you.
                </p>
              </div>
              <a
                href="#pricing"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF704F] px-5 py-3 text-sm font-bold text-[#111820] transition hover:-translate-y-1 hover:bg-[#FF8064]"
              >
                View Plans
                <ArrowRight size={16} />
              </a>
            </div>
          </section>

          <p className="mt-8 text-center text-[10px] tracking-wide text-[#71808D]">
            PULSEBOARD © 2026 · PRICING IS FOR DEMONSTRATION ONLY
          </p>
        </div>
      </main>
    </div>
  )
}

export default ExploreProPage
