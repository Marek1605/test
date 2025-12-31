import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { updateShopSchema } from '@/lib/validations'

interface RouteParams {
  params: { shopId: string }
}

// GET - Get single shop
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    const shop = await db.shop.findFirst({
      where: { id: params.shopId, userId: session.user.id },
      include: {
        categories: { orderBy: { name: 'asc' } },
        _count: { select: { products: true, orders: true, customers: true } },
      },
    })

    if (!shop) {
      return NextResponse.json({ error: 'E-shop nenájdený' }, { status: 404 })
    }

    // Get revenue
    const revenue = await db.order.aggregate({
      where: { shopId: shop.id, paymentStatus: 'PAID' },
      _sum: { total: true },
    })

    // Get recent orders
    const recentOrders = await db.order.findMany({
      where: { shopId: shop.id },
      take: 5,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      ...shop,
      stats: {
        products: shop._count.products,
        orders: shop._count.orders,
        customers: shop._count.customers,
        revenue: revenue._sum.total || 0,
      },
      recentOrders,
    })
  } catch (error) {
    console.error('Get shop error:', error)
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 })
  }
}

// PATCH - Update shop
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    const existing = await db.shop.findFirst({
      where: { id: params.shopId, userId: session.user.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'E-shop nenájdený' }, { status: 404 })
    }

    const body = await req.json()
    const result = updateShopSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const shop = await db.shop.update({
      where: { id: params.shopId },
      data: result.data,
    })

    return NextResponse.json(shop)
  } catch (error) {
    console.error('Update shop error:', error)
    return NextResponse.json({ error: 'Chyba pri aktualizácii' }, { status: 500 })
  }
}

// DELETE - Delete shop
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    const existing = await db.shop.findFirst({
      where: { id: params.shopId, userId: session.user.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'E-shop nenájdený' }, { status: 404 })
    }

    await db.shop.delete({ where: { id: params.shopId } })

    return NextResponse.json({ message: 'E-shop zmazaný' })
  } catch (error) {
    console.error('Delete shop error:', error)
    return NextResponse.json({ error: 'Chyba pri mazaní' }, { status: 500 })
  }
}
