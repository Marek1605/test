import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { registerSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 })
    }

    const { name, email, password } = result.data

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Používateľ s týmto emailom už existuje' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json({ message: 'Registrácia úspešná', user }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Nastala chyba pri registrácii' }, { status: 500 })
  }
}
