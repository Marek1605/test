import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { createProductSchema } from '@/lib/validations'
import { slugify } from '@/lib/utils'

// GET - List products
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const shopId = searchParams.get('shopId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!shopId) {
      return NextResponse.json({ error: 'shopId je povinný' }, { status: 400 })
    }

    // Verify ownership
    const shop = await db.shop.findFirst({
      where: { id: shopId, userId: session.user.id },
    })

    if (!shop) {
      return NextResponse.json({ error: 'E-shop nenájdený' }, { status: 404 })
    }

    const where: any = { shopId }
    if (status) where.status = status
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 })
  }
}

// POST - Create product
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    const body = await req.json()
    const { shopId, ...productData } = body

    if (!shopId) {
      return NextResponse.json({ error: 'shopId je povinný' }, { status: 400 })
    }

    // Verify ownership
    const shop = await db.shop.findFirst({
      where: { id: shopId, userId: session.user.id },
    })

    if (!shop) {
      return NextResponse.json({ error: 'E-shop nenájdený' }, { status: 404 })
    }

    const result = createProductSchema.safeParse(productData)
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { name, ...rest } = result.data

    // Generate unique slug
    let baseSlug = slugify(name)
    let slug = baseSlug
    let counter = 1

    while (await db.product.findFirst({ where: { shopId, slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const product = await db.product.create({
      data: { ...rest, name, slug, shopId },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json({ error: 'Chyba pri vytváraní' }, { status: 500 })
  }
}
