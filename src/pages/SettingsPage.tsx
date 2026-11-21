
import { useState } from 'react'
import {
  UserRound,
  SlidersHorizontal,
  Bell,
  ShieldCheck,
  Camera,
  Save,
  Check,
  LockKeyhole,
  Monitor,
  Globe,
  Clock3,
  Mail,
  Smartphone,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'

type SettingsTab = 'Profile' | 'Preferences' | 'Notifications' | 'Security'

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Profile')
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Yuktha R',
    email: 'yuktha@example.com',
    role: 'Administrator',
    company: 'PulseBoard',
    bio: 'Managing analytics and business performance.',
  })

  const [preferences, setPreferences] = useState({
    theme: 'Dark',
    language: 'English',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
  })

  const [notifications, setNotifications] = useState({
    email: true,
    transactions: true,
    weeklyReports: false,
    securityAlerts: true,
    productUpdates: false,
  })

  const tabs = [
    { name: 'Profile' as const, icon: UserRound },
    { name: 'Preferences' as const, icon: SlidersHorizontal },
    { name: 'Notifications' as const, icon: Bell },
    { name: 'Security' as const, icon: ShieldCheck },
  ]

  const handleSave = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  const updatePreference = (
    field: keyof typeof preferences,
    value: string,
  ) => {
    setPreferences((current) => ({ ...current, [field]: value }))
  }

  const toggleNotification = (field: keyof typeof notifications) => {
    setNotifications((current) => ({
      ...current,
      [field]: !current[field],
    }))
  }

  const inputClass =
    'w-full rounded-xl border border-[#35414C] bg-[#151F28] px-4 py-3 text-sm text-[#E8EDF2] outline-none transition placeholder:text-[#71808D] focus:border-[#FF704F]/70 focus:ring-2 focus:ring-[#FF704F]/10'

  const labelClass =
    'mb-2 block text-xs font-semibold tracking-wide text-[#A7B0BA]'

  return (
    <div className="flex min-h-screen w-full bg-[#111820] text-[#E8EDF2]">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 pt-24 pb-8 md:px-10 md:py-8">
        <div className="mx-auto max-w-[1200px]">

          {/* Page Header */}
          <div className="mb-9">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF704F]">
              Workspace / General
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Settings<span className="text-[#FF704F]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#8996A3]">
              Manage your account, preferences and workspace settings.
            </p>
          </div>

          {/* Settings Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">

            {/* Settings Sidebar */}
            <div className="h-fit rounded-2xl border border-[#35414C] bg-[#202B35] p-3">
              <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#71808D]">
                Account Settings
              </p>

              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.name

                  return (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#FF704F]/10 text-[#FF8064] shadow-[inset_3px_0_0_#FF704F]'
                          : 'text-[#A7B0BA] hover:bg-[#35414C]/50 hover:text-white'
                      }`}
                    >
                      <Icon size={17} />
                      {tab.name}
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 rounded-xl border border-[#35414C] bg-[#151F28] p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF704F]/10 text-[#FF704F]">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-sm font-semibold text-white">
                  Your account is secure
                </p>
                <p className="mt-1 text-xs leading-5 text-[#8996A3]">
                  Keep your account information up to date.
                </p>
              </div>
            </div>

            {/* Settings Content */}
            <div className="min-w-0 rounded-2xl border border-[#35414C] bg-[#202B35] p-5 md:p-8">

              {activeTab === 'Profile' && (
                <div>
                  <div className="mb-7 border-b border-[#35414C] pb-5">
                    <h2 className="text-xl font-bold text-white">Profile Information</h2>
                    <p className="mt-1 text-sm text-[#8996A3]">
                      Update your personal and workspace details.
                    </p>
                  </div>

                  <div className="mb-8 flex flex-wrap items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#FF704F]/30 bg-[#FF704F]/10 text-2xl font-bold text-[#FF8064]">
                      YR
                    </div>
                    <div>
                      <p className="font-semibold text-white">{profile.name}</p>
                      <p className="mt-1 text-xs text-[#8996A3]">{profile.role}</p>
                      <button className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#FF8064] transition hover:text-[#FF9A84]">
                        <Camera size={14} />
                        Change profile photo
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        className={inputClass}
                        value={profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Role</label>
                      <input
                        className={`${inputClass} cursor-not-allowed opacity-70`}
                        value={profile.role}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        className={inputClass}
                        value={profile.company}
                        onChange={(e) => updateProfile('company', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Bio</label>
                      <textarea
                        rows={3}
                        className={inputClass}
                        value={profile.bio}
                        onChange={(e) => updateProfile('bio', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Preferences' && (
                <div>
                  <div className="mb-7 border-b border-[#35414C] pb-5">
                    <h2 className="text-xl font-bold text-white">Preferences</h2>
                    <p className="mt-1 text-sm text-[#8996A3]">
                      Customize how your dashboard looks and feels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF704F]">
                        <Monitor size={19} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Appearance</p>
                        <p className="mt-1 text-xs text-[#8996A3]">Choose your dashboard theme.</p>
                      </div>
                      <select
                        className={`${inputClass} max-w-[140px]`}
                        value={preferences.theme}
                        onChange={(e) => updatePreference('theme', e.target.value)}
                      >
                        <option>Dark</option>
                        <option>Light</option>
                        <option>System</option>
                      </select>
                    </div>

                    <div className="h-px bg-[#35414C]" />

                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF704F]">
                        <Globe size={19} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Language</p>
                        <p className="mt-1 text-xs text-[#8996A3]">Select your preferred language.</p>
                      </div>
                      <select
                        className={`${inputClass} max-w-[140px]`}
                        value={preferences.language}
                        onChange={(e) => updatePreference('language', e.target.value)}
                      >
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Hindi</option>
                      </select>
                    </div>

                    <div className="h-px bg-[#35414C]" />

                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF704F]">
                        <Clock3 size={19} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Timezone</p>
                        <p className="mt-1 text-xs text-[#8996A3]">Set your local timezone.</p>
                      </div>
                      <select
                        className={`${inputClass} max-w-[180px]`}
                        value={preferences.timezone}
                        onChange={(e) => updatePreference('timezone', e.target.value)}
                      >
                        <option value="Asia/Kolkata">India (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">New York</option>
                        <option value="Europe/London">London</option>
                      </select>
                    </div>

                    <div className="h-px bg-[#35414C]" />

                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF704F]/10 text-[#FF704F]">
                        <SlidersHorizontal size={19} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Date Format</p>
                        <p className="mt-1 text-xs text-[#8996A3]">Choose how dates are displayed.</p>
                      </div>
                      <select
                        className={`${inputClass} max-w-[140px]`}
                        value={preferences.dateFormat}
                        onChange={(e) => updatePreference('dateFormat', e.target.value)}
                      >
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Notifications' && (
                <div>
                  <div className="mb-7 border-b border-[#35414C] pb-5">
                    <h2 className="text-xl font-bold text-white">Notifications</h2>
                    <p className="mt-1 text-sm text-[#8996A3]">
                      Choose which updates you want to receive.
                    </p>
                  </div>

                  <div className="space-y-1">
                    {([
                      ['email', 'Email Notifications', 'Receive important updates through email.', Mail],
                      ['transactions', 'Transaction Updates', 'Get notified about new and completed transactions.', Bell],
                      ['weeklyReports', 'Weekly Reports', 'Receive a weekly business performance summary.', Clock3],
                      ['securityAlerts', 'Security Alerts', 'Get alerts about unusual account activity.', ShieldCheck],
                      ['productUpdates', 'Product Updates', 'Stay informed about new features and improvements.', Smartphone],
                    ] as const).map(([key, title, description, Icon]) => (
                      <div key={key} className="flex items-center gap-4 border-b border-[#35414C] py-5 last:border-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#151F28] text-[#A7B0BA]">
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{title}</p>
                          <p className="mt-1 text-xs leading-5 text-[#8996A3]">{description}</p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={notifications[key]}
                          onClick={() => toggleNotification(key)}
                          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                            notifications[key] ? 'bg-[#FF704F]' : 'bg-[#46535F]'
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                              notifications[key] ? 'left-6' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Security' && (
                <div>
                  <div className="mb-7 border-b border-[#35414C] pb-5">
                    <h2 className="text-xl font-bold text-white">Security</h2>
                    <p className="mt-1 text-sm text-[#8996A3]">
                      Manage your password and account security.
                    </p>
                  </div>

                  <div className="mb-7 rounded-xl border border-[#35414C] bg-[#151F28] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Account Protection</p>
                        <p className="mt-1 text-xs text-[#8996A3]">Your demo account is protected by this interface.</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-4 text-sm font-semibold text-white">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Current Password</label>
                      <input type="password" placeholder="Enter current password" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>New Password</label>
                      <input type="password" placeholder="Enter new password" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" className={inputClass} />
                    </div>
                  </div>

                  <div className="mt-7 rounded-xl border border-[#35414C] p-4">
                    <div className="flex items-center gap-3">
                      <LockKeyhole size={18} className="text-[#FF704F]" />
                      <div>
                        <p className="text-sm font-semibold text-white">Password security</p>
                        <p className="mt-1 text-xs text-[#8996A3]">
                          Use a strong password with letters, numbers and symbols.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-[#35414C] pt-6">
                <p className="text-xs text-[#71808D]">
                  Changes are currently stored in this page session only.
                </p>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-[#FF704F] px-5 py-3 text-sm font-bold text-[#111820] shadow-[0_5px_25px_rgba(255,112,79,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#FF8064] hover:shadow-[0_8px_30px_rgba(255,112,79,0.3)]"
                >
                  {saved ? <Check size={17} /> : <Save size={17} />}
                  {saved ? 'Changes Saved' : 'Save Changes'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
