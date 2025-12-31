import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { createShopSchema } from '@/lib/validations'
import { slugify } from '@/lib/utils'

// GET - List all shops for user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný prístup' }, { status: 401 })
    }

    const shops = await db.shop.findMany({
      where: { userId: session.user.id },
      include: {
        _count: {
          select: { products: true, orders: true, customers: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(shops)
  } catch (error) {
    console.error('Get shops error:', error)
    return NextResponse.json({ error: 'Chyba servera' }, { status: 500 })
  }
}

// POST - Create new shop
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný prístup' }, { status: 401 })
    }

    const body = await req.json()
    const result = createShopSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { name, category } = result.data

    // Check shop limits
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { shops: true },
    })

    const limits: Record<string, number> = { FREE: 1, STARTER: 1, PROFESSIONAL: 3, ENTERPRISE: 999 }
    const limit = limits[user?.plan || 'FREE']

    if (user && user.shops.length >= limit) {
      return NextResponse.json({ error: `Dosiahnutý limit ${limit} e-shopov` }, { status: 403 })
    }

    // Generate unique slug
    let baseSlug = slugify(name)
    let slug = baseSlug
    let subdomain = baseSlug.replace(/-/g, '')
    let counter = 1

    while (await db.shop.findFirst({ where: { OR: [{ slug }, { subdomain }] } })) {
      slug = `${baseSlug}-${counter}`
      subdomain = `${baseSlug.replace(/-/g, '')}${counter}`
      counter++
    }

    // Color schemes
    const colorSchemes: Record<string, object> = {
      indigo: { primary: '#6366f1', secondary: '#818cf8', accent: '#4f46e5' },
      emerald: { primary: '#10b981', secondary: '#34d399', accent: '#059669' },
      rose: { primary: '#f43f5e', secondary: '#fb7185', accent: '#e11d48' },
      amber: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#d97706' },
      cyan: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#0891b2' },
      violet: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#7c3aed' },
    }

    const shop = await db.shop.create({
      data: {
        name,
        slug,
        subdomain,
        theme: category || 'default',
        colors: colorSchemes[body.colorScheme] || colorSchemes.indigo,
        userId: session.user.id,
        email: session.user.email,
      },
    })

    // Create default categories
    const defaultCategories: Record<string, string[]> = {
      fashion: ['Topy', 'Nohavice', 'Šaty', 'Doplnky'],
      electronics: ['Smartfóny', 'Notebooky', 'Príslušenstvo'],
      food: ['Ovocie', 'Zelenina', 'Nápoje'],
      health: ['Kozmetika', 'Vitamíny', 'Starostlivosť'],
      home: ['Nábytok', 'Dekorácie', 'Záhrada'],
      gifts: ['Darčeky', 'Hračky', 'Personalizované'],
    }

    const cats = defaultCategories[category || 'fashion'] || []
    for (const catName of cats) {
      await db.category.create({
        data: { name: catName, slug: slugify(catName), shopId: shop.id },
      })
    }

    return NextResponse.json(shop, { status: 201 })
  } catch (error) {
    console.error('Create shop error:', error)
    return NextResponse.json({ error: 'Chyba pri vytváraní' }, { status: 500 })
  }
}
