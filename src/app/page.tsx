import Link from 'next/link'
import { 
  Sparkles, Zap, Shield, CreditCard, Globe, BarChart3,
  Bot, Package, Truck, FileText, Check, ArrowRight, Play, Star, Store, Rocket
} from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">EshopBuilder</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-white/80 hover:text-white transition-colors">Funkcie</Link>
              <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">Cenník</Link>
              <Link href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-white/90 hover:text-white font-medium hidden sm:block">Prihlásiť sa</Link>
              <Link href="/register" className="px-5 py-2.5 bg-white text-primary-700 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Začať zadarmo
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Nová AI technológia pre tvorbu e-shopov</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display leading-tight">
              Vytvor si e-shop<br />
              <span className="text-gradient">za 5 minút s AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Slovenská platforma pre vytváranie profesionálnych e-shopov. Bez programovania, s automatickou integráciou GoPay a faktúr.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group">
                Vytvoriť e-shop zadarmo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-2xl font-semibold hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Pozrieť demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: '500+', label: 'E-shopov' },
                { value: '€2M+', label: 'Obrat' },
                { value: '99.9%', label: 'Uptime' },
                { value: '4.9/5', label: 'Hodnotenie' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" /> Funkcie
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Všetko čo potrebuješ pre úspešný e-shop
            </h2>
            <p className="text-lg text-gray-600">Kompletná platforma s viac ako 50 funkciami. Bez skrytých poplatkov.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Bot, title: 'AI Generátor', desc: 'Opíš svoj e-shop a AI vytvorí design a texty.', color: 'from-purple-500 to-indigo-500' },
              { icon: CreditCard, title: 'Platobné brány', desc: 'GoPay, Comgate, Stripe - všetko na jedno kliknutie.', color: 'from-green-500 to-emerald-500' },
              { icon: Package, title: 'Správa produktov', desc: 'Varianty, sklady, importy z CSV.', color: 'from-orange-500 to-amber-500' },
              { icon: Truck, title: 'Doprava', desc: 'Packeta, GLS, DPD - automatický výpočet cien.', color: 'from-blue-500 to-cyan-500' },
              { icon: FileText, title: 'Faktúry', desc: 'Automatické faktúry s QR kódom.', color: 'from-violet-500 to-purple-500' },
              { icon: BarChart3, title: 'Štatistiky', desc: 'Prehľadný dashboard s predajmi.', color: 'from-teal-500 to-green-500' },
            ].map((feature, i) => (
              <div key={i} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary-200 hover:shadow-xl transition-all card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Jednoduchý cenník</h2>
            <p className="text-lg text-white/70">Žiadne skryté poplatky. Mesačná platba, zrušíš kedykoľvek.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '0', features: ['1 e-shop', '50 produktov', 'Základné šablóny', 'Email podpora'], popular: false },
              { name: 'Professional', price: '29', features: ['3 e-shopy', 'Neobmedzené produkty', 'AI kompletný balík', 'Vlastná doména', 'Priority podpora'], popular: true },
              { name: 'Enterprise', price: '99', features: ['Neobmedzené e-shopy', 'White-label', 'API prístup', 'Dedikovaný manager'], popular: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 ${plan.popular ? 'bg-white shadow-2xl scale-105' : 'bg-white/10 border border-white/20'}`}>
                {plan.popular && <div className="text-center text-sm font-medium text-primary-600 mb-4">Najpopulárnejšie</div>}
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-gray-900' : 'text-white'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>€{plan.price}</span>
                  <span className={plan.popular ? 'text-gray-600' : 'text-white/60'}>/mes</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.popular ? 'text-green-500' : 'text-green-400'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-gray-700' : 'text-white/80'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                  plan.popular ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
                }`}>
                  Začať
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center font-display">Často kladené otázky</h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              { q: 'Potrebujem vedieť programovať?', a: 'Nie! Všetko sa robí cez jednoduchý vizuálny editor.' },
              { q: 'Aké platobné brány podporujete?', a: 'GoPay, Comgate, Stripe, Apple Pay, Google Pay, dobierka, prevod.' },
              { q: 'Môžem použiť vlastnú doménu?', a: 'Áno! V platených plánoch s automatickým SSL certifikátom.' },
              { q: 'Ako funguje AI generátor?', a: 'Opíšeš čo chceš predávať a AI vytvorí celý e-shop - dizajn, texty, štruktúru.' },
            ].map((faq, i) => (
              <div key={i} className="py-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">Pripravený začať?</h2>
          <p className="text-lg text-white/70 mb-8">Vytvor si e-shop za 5 minút. Zadarmo.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:bg-gray-100">
            Vytvoriť e-shop <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">EshopBuilder</span>
            </Link>
            <p className="text-sm">© 2024 EshopBuilder. Vyrobené s ❤️ na Slovensku</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
