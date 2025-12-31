# 🚀 EshopBuilder

Slovenská AI platforma pre vytváranie e-shopov.

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **PostgreSQL** (Coolify managed)
- **Prisma ORM**
- **Tailwind CSS**
- **NextAuth.js**

## ☁️ Deployment na Coolify

### 1. Vytvor Hetzner server s Coolify

```bash
# V Hetzner Cloud Console:
# Apps → Coolify → CX41 (16GB) → Create
```

### 2. Otvor Coolify dashboard

```
http://TVOJA_IP:8000
```

### 3. Pridaj PostgreSQL

```
Resources → + New → Database → PostgreSQL
```

### 4. Pridaj projekt

```
Resources → + New → Public Repository
URL: https://github.com/TVOJ_USERNAME/eshop-builder
```

### 5. Nastav Environment Variables

```
DATABASE_URL=postgresql://...  (z Coolify PostgreSQL)
NEXTAUTH_URL=https://tvoja-domena.sk
NEXTAUTH_SECRET=random-string-32-chars
```

### 6. Deploy!

Coolify automaticky:
- Buildne Docker image
- Spustí container
- Nastaví SSL

## 🔧 Lokálny vývoj

```bash
# Install
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run
npm run dev
```

## 📁 Štruktúra

```
src/
├── app/           # Next.js pages
├── components/    # React components
├── lib/           # Utilities
└── hooks/         # Custom hooks
```

---
Vyrobené s ❤️ na Slovensku
