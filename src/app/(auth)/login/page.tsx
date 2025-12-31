'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Store, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Prihlásenie úspešné!')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      toast.error('Nastala chyba pri prihlásení')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
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

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Vitaj späť! 👋</h1>
          <p className="text-gray-600 mb-8">Prihlás sa do svojho účtu.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tvoj@email.sk"
              required
            />
            <div>
              <Input
                label="Heslo"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="mt-2 text-right">
                <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                  Zabudnuté heslo?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Prihlásiť sa
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">alebo</span></div>
          </div>

          <Button variant="outline" className="w-full" size="lg" onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Pokračovať s Google
          </Button>

          <p className="mt-8 text-center text-sm text-gray-600">
            Nemáš účet? <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">Zaregistruj sa</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 hero-gradient">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Spravuj svoje e-shopy</h2>
              <p className="text-white/70">Dashboard, štatistiky, objednávky - všetko na jednom mieste.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
