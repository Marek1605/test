import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Neautorizovaný' }, { status: 401 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'AI nie je nakonfigurované' }, { status: 500 })
    }

    const { action, data } = await req.json()
    let prompt = ''

    switch (action) {
      case 'generate-shop':
        prompt = `Si expert na e-commerce. Vytvor obsah pre slovenský e-shop.

Názov: ${data.name}
Kategória: ${data.category}
Požiadavky: ${data.prompt || 'Žiadne'}

Vráť JSON:
{
  "tagline": "Krátky slogan (max 10 slov)",
  "description": "Popis e-shopu (2-3 vety)",
  "metaTitle": "SEO title (max 60 znakov)",
  "metaDescription": "SEO description (max 160 znakov)",
  "heroTitle": "Hlavný nadpis",
  "heroSubtitle": "Podnadpis",
  "features": ["Výhoda 1", "Výhoda 2", "Výhoda 3"]
}

Odpovedz LEN platným JSON.`
        break

      case 'generate-product':
        prompt = `Vytvor popis produktu v slovenčine.

Produkt: ${data.productName}
Kategória: ${data.category || 'Neurčená'}

Vráť JSON:
{
  "description": "Detailný popis (100-150 slov)",
  "shortDescription": "Krátky popis (1-2 vety)",
  "features": ["Vlastnosť 1", "Vlastnosť 2", "Vlastnosť 3"],
  "metaTitle": "SEO title",
  "metaDescription": "SEO description"
}

Odpovedz LEN platným JSON.`
        break

      case 'generate-seo':
        prompt = `Vytvor SEO obsah v slovenčine pre: ${data.text}

Vráť JSON:
{
  "metaTitle": "SEO title (max 60 znakov)",
  "metaDescription": "SEO description (max 160 znakov)",
  "keywords": ["kľúčové", "slová"]
}

Odpovedz LEN platným JSON.`
        break

      case 'improve-text':
        prompt = `Vylepši tento text pre e-shop. Zachovaj význam, zlepši štýl a gramatiku.

Text: ${data.text}

Vráť iba vylepšený text, bez vysvetlení.`
        break

      default:
        return NextResponse.json({ error: 'Neznáma akcia' }, { status: 400 })
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response')
    }

    const tokens = response.usage.input_tokens + response.usage.output_tokens
    let result: any

    // Parse JSON responses
    if (['generate-shop', 'generate-product', 'generate-seo'].includes(action)) {
      try {
        let clean = textContent.text.trim()
        if (clean.startsWith('```json')) clean = clean.slice(7)
        if (clean.startsWith('```')) clean = clean.slice(3)
        if (clean.endsWith('```')) clean = clean.slice(0, -3)
        result = JSON.parse(clean.trim())
      } catch {
        result = { text: textContent.text }
      }
    } else {
      result = { text: textContent.text }
    }

    // Log usage
    await db.aIGeneration.create({
      data: {
        type: action,
        prompt: prompt.substring(0, 500),
        result: JSON.stringify(result).substring(0, 2000),
        tokens,
        cost: tokens * 0.00000025,
        userId: session.user.id,
        shopId: data.shopId || null,
      },
    })

    return NextResponse.json({ result, tokens })
  } catch (error) {
    console.error('AI error:', error)
    return NextResponse.json({ error: 'Chyba AI' }, { status: 500 })
  }
}
