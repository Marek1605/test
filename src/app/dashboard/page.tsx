'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Store, ShoppingCart, Users, TrendingUp, ArrowRight, 
  Plus, Package, Eye, ArrowUpRight, ArrowDownRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, Badge, Spinner } from '@/components/ui/index'
import { formatPrice, formatDateTime } from '@/lib/utils'

interface DashboardStats {
  totalShops: number
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  recentOrders: any[]
  shops: any[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  // Default stats if no data
  const displayStats = stats || {
    totalShops: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    recentOrders: [],
    shops: [],
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Prehľad tvojich e-shopov</p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <Plus className="w-4 h-4" />
            Vytvoriť e-shop
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="E-shopy"
          value={displayStats.totalShops}
          icon={Store}
          color="primary"
        />
        <StatCard
          title="Objednávky"
          value={displayStats.totalOrders}
          icon={ShoppingCart}
          color="blue"
          trend={12}
        />
        <StatCard
          title="Tržby"
          value={formatPrice(displayStats.totalRevenue)}
          icon={TrendingUp}
          color="green"
          trend={8}
        />
        <StatCard
          title="Zákazníci"
          value={displayStats.totalCustomers}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Shops */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Moje e-shopy</CardTitle>
            <Link href="/dashboard/shops" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Všetky <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {displayStats.shops.length === 0 ? (
              <div className="text-center py-8">
                <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Zatiaľ nemáš žiadne e-shopy</p>
                <Link href="/dashboard/create">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                    Vytvoriť prvý e-shop
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {displayStats.shops.slice(0, 3).map((shop: any) => (
                  <Link
                    key={shop.id}
                    href={`/dashboard/shops/${shop.id}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <Store className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{shop.name}</p>
                        <p className="text-sm text-gray-500">{shop._count?.products || 0} produktov</p>
                      </div>
                    </div>
                    <Badge variant={shop.status === 'PUBLISHED' ? 'success' : 'secondary'}>
                      {shop.status === 'PUBLISHED' ? 'Aktívny' : 'Koncept'}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Posledné objednávky</CardTitle>
            <Link href="/dashboard/orders" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Všetky <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {displayStats.recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Zatiaľ žiadne objednávky</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayStats.recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                      <Badge variant={order.paymentStatus === 'PAID' ? 'success' : 'warning'} className="text-xs">
                        {order.paymentStatus === 'PAID' ? 'Zaplatené' : 'Čaká'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Rýchle akcie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Plus, label: 'Nový e-shop', href: '/dashboard/create', color: 'primary' },
              { icon: Package, label: 'Pridať produkt', href: '/dashboard/shops', color: 'green' },
              { icon: Eye, label: 'Náhľad', href: '#', color: 'blue' },
              { icon: TrendingUp, label: 'Štatistiky', href: '/dashboard/analytics', color: 'purple' },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-${action.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                </div>
                <span className="font-medium text-gray-900">{action.label}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend 
}: { 
  title: string
  value: string | number
  icon: any
  color: string
  trend?: number 
}) {
  const colorClasses: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </CardContent>
    </Card>
  )
}
