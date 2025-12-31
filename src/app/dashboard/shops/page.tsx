'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Store, Plus, ExternalLink, Settings, Trash2, Copy, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, Badge, EmptyState } from '@/components/ui/index'
import { formatPrice } from '@/lib/utils'

interface Shop {
  id: string
  name: string
  slug: string
  subdomain: string
  status: 'DRAFT' | 'PUBLISHED' | 'SUSPENDED'
  _count: { products: number; orders: number; customers: number }
}

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShops()
  }, [])

  const fetchShops = async () => {
    try {
      const res = await fetch('/api/shops')
      if (res.ok) setShops(await res.json())
    } catch (error) {
      toast.error('Chyba pri načítaní')
    } finally {
      setLoading(false)
    }
  }

  const deleteShop = async (id: string) => {
    if (!confirm('Naozaj zmazať tento e-shop?')) return

    try {
      const res = await fetch(`/api/shops/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setShops(shops.filter(s => s.id !== id))
        toast.success('E-shop zmazaný')
      }
    } catch (error) {
      toast.error('Chyba pri mazaní')
    }
  }

  const copyUrl = (subdomain: string) => {
    navigator.clipboard.writeText(`https://${subdomain}.eshopbuilder.sk`)
    toast.success('URL skopírovaná')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Moje e-shopy</h1>
          <p className="text-gray-600">Spravuj svoje e-shopy</p>
        </div>
        <Link href="/dashboard/create">
          <Button><Plus className="w-4 h-4" />Vytvoriť e-shop</Button>
        </Link>
      </div>

      {shops.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <EmptyState
              icon={<Store className="w-12 h-12" />}
              title="Zatiaľ nemáš žiadne e-shopy"
              description="Vytvor si prvý e-shop pomocou AI za pár minút"
              action={
                <Link href="/dashboard/create">
                  <Button><Plus className="w-4 h-4" />Vytvoriť e-shop</Button>
                </Link>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Store className="w-6 h-6" />
                  </div>
                  <Badge variant={shop.status === 'PUBLISHED' ? 'success' : 'secondary'}>
                    {shop.status === 'PUBLISHED' ? 'Aktívny' : 'Koncept'}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-1">{shop.name}</h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <span>{shop.subdomain}.eshopbuilder.sk</span>
                  <button onClick={() => copyUrl(shop.subdomain)} className="hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{shop._count.products}</div>
                    <div className="text-xs text-gray-500">Produktov</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{shop._count.orders}</div>
                    <div className="text-xs text-gray-500">Objednávok</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{shop._count.customers}</div>
                    <div className="text-xs text-gray-500">Zákazníkov</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/dashboard/shops/${shop.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      <Settings className="w-4 h-4" />Spravovať
                    </Button>
                  </Link>
                  <a href={`https://${shop.subdomain}.eshopbuilder.sk`} target="_blank" rel="noopener">
                    <Button variant="outline" size="sm"><ExternalLink className="w-4 h-4" /></Button>
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteShop(shop.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
