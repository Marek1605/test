'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Sparkles, Store, ArrowRight, ArrowLeft, Check, Loader2,
  ShoppingBag, Laptop, UtensilsCrossed, Heart, Home, Gift
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/index'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'fashion', name: 'Móda & Oblečenie', icon: ShoppingBag, color: 'from-pink-500 to-rose-500' },
  { id: 'electronics', name: 'Elektronika', icon: Laptop, color: 'from-blue-500 to-cyan-500' },
  { id: 'food', name: 'Jedlo & Nápoje', icon: UtensilsCrossed, color: 'from-orange-500 to-amber-500' },
  { id: 'health', name: 'Zdravie & Krása', icon: Heart, color: 'from-red-500 to-pink-500' },
  { id: 'home', name: 'Dom & Záhrada', icon: Home, color: 'from-green-500 to-emerald-500' },
  { id: 'gifts', name: 'Darčeky', icon: Gift, color: 'from-purple-500 to-violet-500' },
]

const colorSchemes = [
  { id: 'indigo', name: 'Indigo', colors: ['#6366f1', '#818cf8', '#4f46e5'] },
  { id: 'emerald', name: 'Emerald', colors: ['#10b981', '#34d399', '#059669'] },
  { id: 'rose', name: 'Rose', colors: ['#f43f5e', '#fb7185', '#e11d48'] },
  { id: 'amber', name: 'Amber', colors: ['#f59e0b', '#fbbf24', '#d97706'] },
  { id: 'cyan', name: 'Cyan', colors: ['#06b6d4', '#22d3ee', '#0891b2'] },
  { id: 'violet', name: 'Violet', colors: ['#8b5cf6', '#a78bfa', '#7c3aed'] },
]

export default function CreateShopPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  
  const [form, setForm] = useState({
    name: '',
    category: '',
    colorScheme: 'indigo',
    aiPrompt: '',
  })

  const [aiResult, setAiResult] = useState<any>(null)

  const canContinue = () => {
    if (step === 1) return form.name.length >= 2
    if (step === 2) return form.category !== ''
    if (step === 3) return form.colorScheme !== ''
    return true
  }

  const handleAIGenerate = async () => {
    setAiGenerating(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-shop',
          data: {
            name: form.name,
            category: form.category,
            prompt: form.aiPrompt,
          },
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setAiResult(data.result)
        toast.success('AI vygenerovalo obsah!')
      } else {
        toast.error('Chyba pri generovaní')
      }
    } catch (error) {
      toast.error('Chyba pripojenia')
    } finally {
      setAiGenerating(false)
    }
  }

  const handleCreate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          colorScheme: form.colorScheme,
          aiContent: aiResult,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Chyba pri vytváraní')
        return
      }

      const shop = await res.json()
      toast.success('E-shop vytvorený!')
      router.push(`/dashboard/shops/${shop.id}`)
    } catch (error) {
      toast.error('Nastala chyba')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all',
                step >= s
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              )}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Name */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ako sa bude volať tvoj e-shop?</h1>
            <p className="text-gray-600">Vyber názov, ktorý si zákazníci zapamätajú</p>
          </div>

          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Napr. ModernShop, TvojObchod..."
            className="text-center text-lg h-14"
          />

          <p className="text-center text-sm text-gray-500 mt-3">
            Tvoja adresa: <span className="font-medium">{form.name ? form.name.toLowerCase().replace(/\s+/g, '') : 'nazov'}.eshopbuilder.sk</span>
          </p>
        </div>
      )}

      {/* Step 2: Category */}
      {step === 2 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Čo budeš predávať?</h1>
            <p className="text-gray-600">Vyber kategóriu pre tvoj e-shop</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setForm({ ...form, category: cat.id })}
                className={cn(
                  'p-6 rounded-2xl border-2 text-left transition-all',
                  form.category === cat.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900">{cat.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Color Scheme */}
      {step === 3 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Vyber farebnú schému</h1>
            <p className="text-gray-600">Môžeš ju neskôr zmeniť</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setForm({ ...form, colorScheme: scheme.id })}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all',
                  form.colorScheme === scheme.id
                    ? 'border-gray-900'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex gap-1 mb-2">
                  {scheme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-gray-700">{scheme.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: AI Generation */}
      {step === 4 && (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Generátor</h1>
            <p className="text-gray-600">Nechaj AI vytvoriť obsah pre tvoj e-shop (voliteľné)</p>
          </div>

          <Textarea
            value={form.aiPrompt}
            onChange={(e) => setForm({ ...form, aiPrompt: e.target.value })}
            placeholder="Opíš čo presne chceš predávať, kto sú tvoji zákazníci, aký štýl preferuješ..."
            className="min-h-[120px] mb-4"
          />

          <Button
            onClick={handleAIGenerate}
            variant="outline"
            className="w-full"
            loading={aiGenerating}
          >
            <Sparkles className="w-4 h-4" />
            {aiGenerating ? 'Generujem...' : 'Vygenerovať s AI'}
          </Button>

          {aiResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="font-semibold text-green-800 mb-2">✓ AI obsah vygenerovaný</p>
              <p className="text-sm text-green-700">{aiResult.tagline || aiResult.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        {step > 1 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="w-4 h-4" />
            Späť
          </Button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canContinue()}>
            Ďalej
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleCreate} loading={loading}>
            <Store className="w-4 h-4" />
            Vytvoriť e-shop
          </Button>
        )}
      </div>
    </div>
  )
}
