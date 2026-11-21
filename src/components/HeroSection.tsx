
import { ArrowUpRight, TrendingUp } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative mt-8 min-h-[290px] overflow-hidden rounded-[28px] border border-[#FF704F]/30 bg-gradient-to-br from-[#392522] via-[#29252A] to-[#202B35] p-8 md:p-10">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#FF704F]/35 blur-[90px]" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF704F]/40 bg-[#FF704F]/15 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF704F]" />
            <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#FF987F]">
              Live business intelligence
            </span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            Your business,
            <br />
            <span className="text-[#FF704F]">in full focus.</span>
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#A7B0BA]">
            Every metric tells a story. Track performance, discover patterns,
            and make smarter decisions with your data.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF704F] px-5 py-3 text-sm font-bold text-[#111820] transition duration-300 hover:-translate-y-1 hover:bg-[#FF896F]">
            Explore analytics
            <ArrowUpRight size={17} />
          </button>
        </div>

        {/* Visual element */}
        <div className="relative flex min-h-[190px] w-full items-center justify-center md:w-[42%]">
          <div className="absolute h-44 w-44 rounded-full border border-[#FF704F]/30" />
          <div className="absolute h-32 w-32 rounded-full border border-[#FF704F]/40" />

          <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-3xl border border-[#FF704F]/40 bg-[#FF704F]/20 shadow-[0_0_70px_rgba(255,112,79,0.3)] backdrop-blur-xl">
            <TrendingUp size={30} className="text-[#FF704F]" />
            <span className="mt-2 text-[10px] uppercase tracking-widest text-[#A7B0BA]">
              Growth
            </span>
          </div>

          <div className="absolute right-[12%] top-[5%] h-3 w-3 animate-pulse rounded-full bg-[#FF704F]" />
          <div className="absolute bottom-[10%] left-[12%] h-2 w-2 animate-pulse rounded-full bg-[#FF987F]" />
          <div className="absolute bottom-[5%] right-[20%] h-1.5 w-1.5 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
