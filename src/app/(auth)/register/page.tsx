'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Store, ArrowLeft, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Chyba pri registrácii')
        return
      }

      toast.success('Registrácia úspešná! Teraz sa prihlás.')
      router.push('/login')
    } catch (error) {
      toast.error('Nastala chyba')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-white mb-6">Vytvor si e-shop ešte dnes</h2>
              <ul className="space-y-4">
                {['Vytvor si e-shop za 5 minút', 'Bez kreditnej karty', 'AI generátor zadarmo', 'GoPay integrácia'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Späť
          </Link>

          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EshopBuilder</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vytvor si účet 🚀</h1>
          <p className="text-gray-600 mb-8">Začni predávať online ešte dnes.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Meno"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tvoje meno"
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="tvoj@email.sk"
              required
            />
            <Input
              label="Heslo"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 8 znakov"
              hint="Aspoň 8 znakov, 1 veľké písmeno, 1 číslo"
              required
            />
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Vytvoriť účet
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Máš účet? <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">Prihlás sa</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
