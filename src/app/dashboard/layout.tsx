'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Store, LayoutDashboard, ShoppingBag, Package, Users, Settings,
  CreditCard, Plus, ChevronDown, LogOut, Menu, X, Bell, Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/index'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Moje e-shopy', href: '/dashboard/shops', icon: Store },
  { name: 'Vytvoriť e-shop', href: '/dashboard/create', icon: Plus },
  { name: 'Faktúry', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Nastavenia', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl">
            <SidebarContent pathname={pathname} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <SidebarContent pathname={pathname} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6">
          <button
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar name={session?.user?.name || 'U'} size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">{session?.user?.plan || 'Free'} plán</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <>
      <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">EshopBuilder</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive ? 'text-primary-600' : 'text-gray-400')} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade banner */}
      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Pro funkcie</span>
          </div>
          <p className="text-sm text-white/80 mb-3">Získaj AI generátor a vlastnú doménu</p>
          <Link
            href="/dashboard/billing"
            className="block w-full py-2 bg-white text-primary-700 rounded-xl text-sm font-semibold text-center hover:bg-gray-100"
          >
            Upgradovať
          </Link>
        </div>
      </div>

      {/* Sign out */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          Odhlásiť sa
        </button>
      </div>
    </>
  )
}
