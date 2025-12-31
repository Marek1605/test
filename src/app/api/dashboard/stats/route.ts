import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    // Get user's shops
    const shops = await db.shop.findMany({
      where: { userId: session.user.id },
      include: {
        _count: { select: { products: true, orders: true, customers: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const shopIds = shops.map(s => s.id)

    // Aggregate stats
    const [ordersCount, customersCount, revenue, recentOrders] = await Promise.all([
      db.order.count({ where: { shopId: { in: shopIds } } }),
      db.customer.count({ where: { shopId: { in: shopIds } } }),
      db.order.aggregate({
        where: { shopId: { in: shopIds }, paymentStatus: 'PAID' },
        _sum: { total: true },
      }),
      db.order.findMany({
        where: { shopId: { in: shopIds } },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { shop: { select: { name: true } } },
      }),
    ])

    return NextResponse.json({
      totalShops: shops.length,
      totalOrders: ordersCount,
      totalCustomers: customersCount,
      totalRevenue: revenue._sum.total || 0,
      shops,
      recentOrders,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 })
  }
}
