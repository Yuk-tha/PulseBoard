
import { useState, useRef, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import DashboardHeader from './components/DashboardHeader'
import HeroSection from './components/HeroSection'
import StatsGrid from './components/StatsGrid'
import RevenueChart from './components/RevenueChart'
import RecentTransactions from './components/RecentTransactions'
import ActivityFeed from './components/ActivityFeed'

import TransactionsPage from './pages/TransactionsPage'
import CustomersPage from './pages/CustomersPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import HelpSupportPage from './pages/HelpSupportPage'
import ExploreProPage from './pages/ExploreProPage'
import AdminPage from './pages/AdminPage'

export type DateRange = '7days' | '30days' | 'month' | 'all'

function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<DateRange>('30days')

  const transactionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleSearchSelected = () => {
      transactionsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }

    window.addEventListener(
      'transaction-search-selected',
      handleSearchSelected
    )

    return () => {
      window.removeEventListener(
        'transaction-search-selected',
        handleSearchSelected
      )
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full bg-[#111820]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 md:px-10">
        <div className="mx-auto w-full max-w-[1500px]">
          <DashboardHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <HeroSection />

          <StatsGrid
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />

          <RevenueChart dateRange={dateRange} />

          <div
            ref={transactionsRef}
            className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]"
          >
            <RecentTransactions
              searchTerm={searchTerm}
              dateRange={dateRange}
            />

            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />

      <Route path="/transactions" element={<TransactionsPage />} />

      <Route path="/customers" element={<CustomersPage />} />

      <Route path="/analytics" element={<AnalyticsPage />} />

      <Route path="/settings" element={<SettingsPage />} />

      <Route path="/help-support" element={<HelpSupportPage />} />

      <Route path="/explore-pro" element={<ExploreProPage />} />

      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
