'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Store, Package, ShoppingCart, Users, Settings, ExternalLink,
  Plus, TrendingUp, ArrowRight, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/index'
import { formatPrice, formatDateTime } from '@/lib/utils'

interface Shop {
  id: string
  name: string
  subdomain: string
  status: string
  stats: { products: number; orders: number; customers: number; revenue: number }
  recentOrders: any[]
  categories: any[]
}

export default function ShopDetailPage() {
  const params = useParams()
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShop()
  }, [params.shopId])

  const fetchShop = async () => {
    try {
      const res = await fetch(`/api/shops/${params.shopId}`)
      if (res.ok) setShop(await res.json())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!shop) {
    return <div className="text-center py-12">E-shop nenájdený</div>
  }

  const navItems = [
    { name: 'Produkty', href: `/dashboard/shops/${shop.id}/products`, icon: Package, count: shop.stats.products },
    { name: 'Objednávky', href: `/dashboard/shops/${shop.id}/orders`, icon: ShoppingCart, count: shop.stats.orders },
    { name: 'Zákazníci', href: `/dashboard/shops/${shop.id}/customers`, icon: Users, count: shop.stats.customers },
    { name: 'Nastavenia', href: `/dashboard/shops/${shop.id}/settings`, icon: Settings },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Store className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{shop.name}</h1>
              <Badge variant={shop.status === 'PUBLISHED' ? 'success' : 'secondary'}>
                {shop.status === 'PUBLISHED' ? 'Aktívny' : 'Koncept'}
              </Badge>
            </div>
            <p className="text-gray-500">{shop.subdomain}.eshopbuilder.sk</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={`https://${shop.subdomain}.eshopbuilder.sk`} target="_blank">
            <Button variant="outline"><ExternalLink className="w-4 h-4" />Zobraziť</Button>
          </a>
          <Link href={`/dashboard/shops/${shop.id}/products/new`}>
            <Button><Plus className="w-4 h-4" />Pridať produkt</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{shop.stats.products}</p>
                <p className="text-sm text-gray-500">Produktov</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{shop.stats.orders}</p>
                <p className="text-sm text-gray-500">Objednávok</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{shop.stats.customers}</p>
                <p className="text-sm text-gray-500">Zákazníkov</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(shop.stats.revenue)}</p>
                <p className="text-sm text-gray-500">Tržby</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <Card className="hover:border-primary-200 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                {item.count !== undefined && (
                  <Badge variant="secondary">{item.count}</Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Posledné objednávky</CardTitle>
          <Link href={`/dashboard/shops/${shop.id}/orders`} className="text-sm text-primary-600 flex items-center gap-1">
            Všetky <ArrowRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent>
          {shop.recentOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Zatiaľ žiadne objednávky</p>
          ) : (
            <div className="space-y-3">
              {shop.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(order.total)}</p>
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
  )
}
