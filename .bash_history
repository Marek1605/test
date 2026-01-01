cd /root
git init
git add .
git commit -m "Initial commit"
git config --global user.email "obchod@megabuy.sk"
git config --global user.name "Marek1605"
git commit -m "Initial commit"
git remote add origin https://github.com/Marek1605/test.git
git branch -M main
git push -u origin main
git remote set-url origin https://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@github.com/Marek1605/test.git
git push -u origin main
git push -u origin main --force
cd /root
npm install --package-lock-only
git add package-lock.json
git commit -m "Add package-lock.json"
git push origin main
apt update && apt install -y nodejs npm
cd /root
npm install --package-lock-only
git add package-lock.json
git commit -m "Add package-lock.json"
git push origin main
RUN npm ci
cd /root
git add Dockerfile
git commit -m "Fix npm install"
git push origin main
cd /root
git add src/lib/auth.ts
git commit -m "Fix auth"
git push origin main
cd /root
git add src/lib/auth.ts
git commit -m "Fix auth"
git push origin main
cd /root
git add src/lib/auth.ts
git commit -m "Fix auth"
git push origin main
cd /root
git add src/lib/auth.ts
git commit -m "Fix auth final"
git push origin main
cat > /root/src/lib/auth.ts << 'ENDOFFILE'
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email a heslo su povinna')
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })
        if (!user || !user.password) {
          throw new Error('Nespravny email alebo heslo')
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) {
          throw new Error('Nespravny email alebo heslo')
        }
        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.plan = token.plan as string
      }
      return session
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id
        const dbUser = await db.user.findUnique({ where: { id: user.id }, select: { plan: true } })
        token.plan = dbUser?.plan || 'FREE'
      }
      if (trigger === 'update' && session) {
        token.name = session.name
        token.email = session.email
      }
      return token
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

declare module 'next-auth' {
  interface Session {
    user: { id: string; name?: string | null; email?: string | null; image?: string | null; plan?: string }
  }
}

declare module 'next-auth/jwt' {
  interface JWT { sub: string; plan?: string }
}
ENDOFFILE

cd /root
git add src/lib/auth.ts
git commit -m "Fix auth clean"
git push origin main
mkdir -p /root/public
touch /root/public/.gitkeep
cd /root
git add public/
git commit -m "Add public folder"
git push origin main
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3   CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1
# Vytvor nový priečinok pre MegaBuy
mkdir /root/megabuy
# Nahraj ZIP a rozbaľ do toho priečinka
cd /root
unzip megabuy-complete.zip
# ZIP sa rozbalí do /root/megabuy/
# Alebo ak už máš ZIP nahraný:
unzip megabuy-complete.zip -d /root/
```

## Štruktúra bude:
```
/root/
├── (tvoj existujúci projekt - MegaPrice?)
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
│
└── megabuy/          ← NOVÝ projekt
apt install unzip -y
cd /root/megabuy
unzip "megabuy-complete(1).zip"
ls -la
cd /root/megabuy
mv megabuy/* .
mv megabuy/.* . 2>/dev/null
rmdir megabuy
rm "megabuy-complete(1).zip"
ls -la
rm -rf "{src"
git init
git add .
git commit -m "Initial commit - MegaBuy.sk MVP"
git remote add origin https://github.com/Marek1605/megabuy.git
git branch -M main
git push -u origin main
git remote set-url origin https://ghp_bHLFKVWEYPr5cnA9BoktBqcJ3MxnXD1zAqpw@github.com/Marek1605/megabuy.git
git push -u origin main
git remote set-url origin https://ghp_bHLFKVWEYPr5cnA9BoktBqcJ3MxnXD1zAqpw@github.com/Marek1605/megabuy.git
git push -u origin main
git remote set-url origin https://ghp_bHLFKVWEYPr5cnA9BoktBqcJ3MxnXD1zAqpw@github.com/Marek1605/megabuy.git
git push -u origin main
git remote set-url origin https://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@github.com/Marek1605/megabuy.git
git push -u origin main
git remote set-url origin https://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@github.com/Marek1605/megabuy.git
git push -u origin main
cd /root
git add Dockerfile
git commit -m "Remove healthcheck"
git push origin main
cd /root
npx prisma migrate deploy
cd /root
export DATABASE_URL="postgres://postgres:WaT6XAnt5yU4fYOQ0XokilUOCRfy3Y3DBTB6uvfyHi6w6a3hUlr9dlMjZ7VMrRv7@fckoo0oc4g4gsko4sco8kw40:5432/postgres"
npx prisma db push
cd /root/megabuy
cat > Dockerfile.worker << 'EOF'
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["node", "src/worker.js"]
EOF

git add Dockerfile.worker
git commit -m "Add Dockerfile.worker"
git push
cd /root/megabuy
cat > Dockerfile.worker << 'EOF'
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "src/worker.js"]
EOF

git add Dockerfile.worker
git commit -m "Fix Dockerfile.worker"
git push
cd /root/megabuy
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
cd /root/megabuy
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - MEILISEARCH_URL=${MEILISEARCH_URL}
      - MEILISEARCH_KEY=${MEILISEARCH_KEY}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - postgres
      - redis
      - meilisearch

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=megabuy
      - POSTGRES_PASSWORD=${DB_PASSWORD:-megabuy123}
      - POSTGRES_DB=megabuy
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  meilisearch:
    image: getmeili/meilisearch:v1.6
    environment:
      - MEILI_MASTER_KEY=${MEILISEARCH_KEY:-masterKey123}
    volumes:
      - meilisearch_data:/meili_data

volumes:
  postgres_data:
  redis_data:
  meilisearch_data:
EOF

git add docker-compose.yml
git commit -m "Simplify docker-compose - remove worker"
git push
cd /root/megabuy
npm run build
cd /root/megabuy
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
}

@layer base {
  * {
    @apply border-gray-200;
  }
  body {
    @apply bg-white text-gray-900;
  }
}

@layer components {
  .container-main {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors;
  }
  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-xl hover:bg-gray-200 transition-colors;
  }
  .input-field {
    @apply w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent;
  }
}
EOF

git add src/app/globals.css
git commit -m "Fix globals.css"
git push
cd /root/megabuy
npm run build
cat > src/app/api/admin/attributes/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateSlug } from '@/lib/utils';

// GET /api/admin/attributes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('category');

    let attributes;

    if (categoryId) {
      attributes = await prisma.attribute.findMany({
        orderBy: { sortOrder: 'asc' },
      });
    } else {
      attributes = await prisma.attribute.findMany({
        orderBy: { sortOrder: 'asc' },
      });
    }

    return NextResponse.json({ attributes });
  } catch (error: any) {
    console.error('Attributes error:', error);
    return NextResponse.json({ error: 'Failed to fetch attributes' }, { status: 500 });
  }
}

// POST /api/admin/attributes
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, type, unit, options, isFilterable, showOnProduct, showInList } = data;

    let slug = generateSlug(name);
    const existing = await prisma.attribute.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const attribute = await prisma.attribute.create({
      data: {
        name,
        slug,
        type,
        unit,
        options: options || [],
        isFilterable: isFilterable ?? true,
        showOnProduct: showOnProduct ?? true,
        showInList: showInList ?? false,
      },
    });

    return NextResponse.json(attribute, { status: 201 });
  } catch (error: any) {
    console.error('Create attribute error:', error);
    return NextResponse.json({ error: 'Failed to create attribute' }, { status: 500 });
  }
}
EOF

npm run build
cat > src/app/api/admin/dashboard/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/admin/dashboard
export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      totalVendors,
      activeVendors,
      totalUsers,
      ordersThisMonth,
      revenueThisMonth,
      ordersLastMonth,
      revenueLastMonth,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.vendor.count(),
      prisma.vendor.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count(),
      prisma.order.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.order.aggregate({
        where: { createdAt: { gte: thisMonth }, paymentStatus: 'PAID' },
        _sum: { totalPrice: true },
      }),
      prisma.order.count({
        where: { createdAt: { gte: lastMonth, lt: thisMonth } },
      }),
      prisma.order.aggregate({
        where: { createdAt: { gte: lastMonth, lt: thisMonth }, paymentStatus: 'PAID' },
        _sum: { totalPrice: true },
      }),
    ]);

    const revenueThisMonthNum = Number(revenueThisMonth._sum.totalPrice) || 0;
    const revenueLastMonthNum = Number(revenueLastMonth._sum.totalPrice) || 0;

    const ordersGrowth = ordersLastMonth > 0
      ? ((ordersThisMonth - ordersLastMonth) / ordersLastMonth * 100).toFixed(1)
      : '100';

    const revenueGrowth = revenueLastMonthNum > 0
      ? ((revenueThisMonthNum - revenueLastMonthNum) / revenueLastMonthNum * 100).toFixed(1)
      : '100';

    return NextResponse.json({
      stats: {
        products: { total: totalProducts, active: activeProducts },
        orders: { total: totalOrders, pending: pendingOrders, thisMonth: ordersThisMonth, growth: ordersGrowth },
        vendors: { total: totalVendors, active: activeVendors },
        users: { total: totalUsers },
        revenue: { thisMonth: revenueThisMonthNum, lastMonth: revenueLastMonthNum, growth: revenueGrowth },
      },
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
EOF

npm run build
# Nainštaluj Go
cd /root
wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
go version
mkdir -p /root/megabuy-go
cd /root/megabuy-go
go mod init megabuy
```

## Štruktúra bude:
```
megabuy-go/
├── cmd/
│   └── server/main.go      # Entry point
├── internal/
│   ├── handlers/           # HTTP handlers
│   ├── models/             # DB modely
│   ├── services/           # Business logika
│   └── repository/         # DB queries
├── templates/              # HTML šablóny (HTMX)
├── static/                 # CSS, JS
├── docker-compose.yml
├── Dockerfile
└── go.mod
cd /root/megabuy-go
unzip megabuy-go.zip
mv megabuy-go/* .
rm -rf megabuy-go megabuy-go.zip
ls -la
go mod download
go build -o server ./cmd/server
go mod tidy
go build -o server ./cmd/server
sed -i 's/"github.com\/rs\/zerolog\/log"//' internal/handlers/handlers.go
go build -o server ./cmd/server
cd /root/megabuy-go
git init
git add .
git commit -m "MegaBuy Go - initial commit"
git remote add origin https://github.com/Marek1605/megabuy-go.git
git branch -M main
git push -u origin main
git remote add origin https://TU_DAJ_TOKEN@github.com/Marek1605/megabuy-go.git
git branch -M main
git push -u origin main
git remote add origin https://TU_DAJ_TOKEN@github.com/Marek1605/megabuy-go.git
git branch -M main
git push -u origin main
git remote remove origin
git remote add origin https://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@github.com/Marek1605/megabuy-go.git
git push -u origin main
cd /root/megabuy-go
sed -i '/replicas: 4/d' docker-compose.yml
git add docker-compose.yml
git commit -m "Fix docker-compose replicas"
git push
cd /root/megabuy-go
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: server
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - DEBUG=false
      - DATABASE_URL=postgres://megabuy:${DB_PASSWORD:-megabuy123}@postgres:5432/megabuy?sslmode=disable
      - REDIS_URL=redis://redis:6379/0
      - MEILISEARCH_URL=http://meilisearch:7700
      - MEILISEARCH_KEY=${MEILISEARCH_KEY:-masterKey123}
      - NATS_URL=nats://nats:4222
      - JWT_SECRET=${JWT_SECRET:-your-super-secret-jwt-key}
    depends_on:
      - postgres
      - redis
      - meilisearch
      - nats
    restart: unless-stopped

  worker:
    build:
      context: .
      dockerfile: Dockerfile
      target: worker
    environment:
      - DATABASE_URL=postgres://megabuy:${DB_PASSWORD:-megabuy123}@postgres:5432/megabuy?sslmode=disable
      - REDIS_URL=redis://redis:6379/0
      - MEILISEARCH_URL=http://meilisearch:7700
      - MEILISEARCH_KEY=${MEILISEARCH_KEY:-masterKey123}
      - NATS_URL=nats://nats:4222
    depends_on:
      - postgres
      - redis
      - nats
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=megabuy
      - POSTGRES_PASSWORD=${DB_PASSWORD:-megabuy123}
      - POSTGRES_DB=megabuy
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./migrations/init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    restart: unless-stopped

  meilisearch:
    image: getmeili/meilisearch:v1.6
    environment:
      - MEILI_MASTER_KEY=${MEILISEARCH_KEY:-masterKey123}
      - MEILI_ENV=production
    volumes:
      - meilisearch_data:/meili_data
    restart: unless-stopped

  nats:
    image: nats:2.10-alpine
    command: -js -sd /data
    volumes:
      - nats_data:/data
    restart: unless-stopped

  clickhouse:
    image: clickhouse/clickhouse-server:24
    volumes:
      - clickhouse_data:/var/lib/clickhouse
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  meilisearch_data:
  nats_data:
  clickhouse_data:
EOF

git add docker-compose.yml
git commit -m "Fix: use server target for app"
git push
cd /root/megabuy-go
cat > Dockerfile << 'EOF'
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git ca-certificates

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build server
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server ./cmd/server

# Build worker
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o worker ./cmd/worker

# Build CLI
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o megabuy ./cmd/cli

# Server image
FROM alpine:3.19 AS server

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/server .
COPY templates ./templates
COPY static ./static

EXPOSE 3000

CMD ["./server"]

# Worker image
FROM alpine:3.19 AS worker

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/worker .

CMD ["./worker"]

# CLI image
FROM alpine:3.19 AS cli

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /app/megabuy /usr/local/bin/megabuy

ENTRYPOINT ["megabuy"]
EOF

git add Dockerfile
git commit -m "Fix: copy templates directly"
git push
cd /root/megabuy-go
cat > Dockerfile << 'EOF'
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git ca-certificates

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build server
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server ./cmd/server

# Build worker
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o worker ./cmd/worker

# Build CLI
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o megabuy ./cmd/cli

# Server image
FROM alpine:3.19 AS server

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/server .
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/static ./static

EXPOSE 3000

CMD ["./server"]

# Worker image
FROM alpine:3.19 AS worker

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/worker .

CMD ["./worker"]

# CLI image
FROM alpine:3.19 AS cli

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /app/megabuy /usr/local/bin/megabuy

ENTRYPOINT ["megabuy"]
EOF

git add Dockerfile
git commit -m "Fix: copy templates from builder stage"
git push
cd /root/megabuy-go
cat > cmd/server/main.go << 'EOF'
package main

import (
	"context"
	"html/template"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/template/html/v2"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"megabuy/internal/cache"
	"megabuy/internal/config"
	"megabuy/internal/database"
	"megabuy/internal/handlers"
	"megabuy/internal/middleware"
	"megabuy/internal/queue"
	"megabuy/internal/search"
)

func main() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	cfg := config.Load()

	db, err := database.NewPostgres(cfg.DatabaseURL)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to connect to PostgreSQL")
	}
	defer db.Close()

	clickhouse, err := database.NewClickHouse(cfg.ClickHouseURL)
	if err != nil {
		log.Warn().Err(err).Msg("ClickHouse not available, analytics disabled")
	}

	redisCache, err := cache.NewRedis(cfg.RedisURL)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to connect to Redis")
	}
	defer redisCache.Close()

	searchClient, err := search.NewMeilisearch(cfg.MeilisearchURL, cfg.MeilisearchKey)
	if err != nil {
		log.Warn().Err(err).Msg("Meilisearch not available, search disabled")
	}

	natsQueue, err := queue.NewNATS(cfg.NatsURL)
	if err != nil {
		log.Warn().Err(err).Msg("NATS not available, queue disabled")
	}

	// Setup template engine with custom functions
	engine := html.New("./templates", ".html")
	engine.Reload(cfg.Debug)
	engine.AddFuncMap(template.FuncMap{
		"sub": func(a, b int) int { return a - b },
		"add": func(a, b int) int { return a + b },
		"mul": func(a, b int) int { return a * b },
		"div": func(a, b int) int { return a / b },
		"slice": func(s string, start, end int) string {
			if end > len(s) {
				end = len(s)
			}
			return s[start:end]
		},
	})

	app := fiber.New(fiber.Config{
		Views:                 engine,
		ViewsLayout:          "layouts/main",
		Prefork:              cfg.Prefork,
		ServerHeader:         "MegaBuy",
		DisableStartupMessage: !cfg.Debug,
		ReadTimeout:          10 * time.Second,
		WriteTimeout:         10 * time.Second,
		IdleTimeout:          120 * time.Second,
		BodyLimit:            50 * 1024 * 1024,
	})

	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "${time} ${status} ${method} ${path} ${latency}\n",
	}))
	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed,
	}))
	app.Use(cors.New())

	app.Use(limiter.New(limiter.Config{
		Max:        1000,
		Expiration: 1 * time.Minute,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
	}))

	app.Static("/static", "./static", fiber.Static{
		Compress:      true,
		CacheDuration: 24 * time.Hour,
	})

	h := handlers.New(db, clickhouse, redisCache, searchClient, natsQueue, cfg)

	// Public routes
	app.Get("/", h.Home)
	app.Get("/hladanie", h.Search)
	app.Get("/kategoria/:slug", h.Category)
	app.Get("/produkt/:slug", h.Product)
	app.Get("/znacka/:slug", h.Brand)
	app.Get("/go/:offerID", h.TrackClick)

	// API routes
	api := app.Group("/api/v1")
	api.Get("/products", h.APIProducts)
	api.Get("/products/:id", h.APIProduct)
	api.Get("/categories", h.APICategories)
	api.Get("/search", h.APISearch)
	api.Get("/autocomplete", h.APIAutocomplete)

	// Auth routes
	auth := api.Group("/auth")
	auth.Post("/register", h.Register)
	auth.Post("/login", h.Login)
	auth.Post("/logout", h.Logout)

	// Protected vendor routes
	vendor := api.Group("/vendor", middleware.AuthRequired(redisCache, cfg.JWTSecret))
	vendor.Get("/dashboard", h.VendorDashboard)
	vendor.Get("/stats", h.VendorStats)
	vendor.Get("/offers", h.VendorOffers)
	vendor.Post("/offers", h.VendorCreateOffer)
	vendor.Put("/offers/:id", h.VendorUpdateOffer)
	vendor.Delete("/offers/:id", h.VendorDeleteOffer)
	vendor.Get("/feeds", h.VendorFeeds)
	vendor.Post("/feeds", h.VendorCreateFeed)
	vendor.Post("/feeds/:id/run", h.VendorRunFeed)
	vendor.Get("/credit", h.VendorCredit)

	// Admin routes
	admin := api.Group("/admin", middleware.AdminRequired(redisCache, cfg.JWTSecret))
	admin.Get("/dashboard", h.AdminDashboard)
	admin.Get("/products", h.AdminProducts)
	admin.Post("/products", h.AdminCreateProduct)
	admin.Put("/products/:id", h.AdminUpdateProduct)
	admin.Delete("/products/:id", h.AdminDeleteProduct)
	admin.Get("/categories", h.AdminCategories)
	admin.Post("/categories", h.AdminCreateCategory)
	admin.Get("/vendors", h.AdminVendors)
	admin.Post("/vendors/:id/credit", h.AdminAddCredit)
	admin.Get("/orders", h.AdminOrders)
	admin.Get("/analytics", h.AdminAnalytics)
	admin.Post("/import/run", h.AdminRunImport)

	// Health check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok", "time": time.Now().Unix()})
	})

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-quit
		log.Info().Msg("Shutting down server...")
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		if natsQueue != nil {
			natsQueue.Close()
		}

		_ = app.ShutdownWithContext(ctx)
	}()

	addr := ":" + cfg.Port
	log.Info().Str("addr", addr).Bool("prefork", cfg.Prefork).Msg("Starting MegaBuy server")

	if err := app.Listen(addr); err != nil {
		log.Fatal().Err(err).Msg("Server error")
	}
}
EOF

git add cmd/server/main.go
git commit -m "Add template functions (sub, add, etc)"
git push
cd /root/megabuy-go
unzip -o megabuy-go-theme.zip
mv megabuy-go/templates/* templates/
mv megabuy-go/static/* static/
rm -rf megabuy-go megabuy-go-theme.zip
git add .
git commit -m "MegaPrice theme design"
git push
cp -rf megabuy-go/templates/* templates/
cp -rf megabuy-go/static/* static/
rm -rf megabuy-go megabuy-go-theme.zip
git add .
git commit -m "MegaPrice theme design"
git push
unzip -o megabuy-go-theme.zip
cp -rf megabuy-go/templates/* templates/
cp -rf megabuy-go/static/* static/
rm -rf megabuy-go megabuy-go-theme.zip
git add .
git commit -m "MegaPrice theme design"
git push
cd /root/megabuy-go
unzip -o megabuy-admin-full.zip
cp -rf megabuy-go/templates/admin templates/
cp -rf megabuy-go/internal/admin internal/
cp megabuy-go/cmd/server/main.go cmd/server/main.go
rm -rf megabuy-go megabuy-admin-full.zip
git add .
git commit -m "Admin panel"
git push
cd /root/megabuy-go
unzip -o "megabuy-admin-full(1).zip"
cp -rf megabuy-go/templates/admin templates/
cp -rf megabuy-go/internal/admin internal/
cp megabuy-go/cmd/server/main.go cmd/server/main.go
rm -rf megabuy-go "megabuy-admin-full(1).zip"
git add .
git commit -m "Admin panel"
git push
cd /root/megabuy-go
unzip -o megabuy-admin-fix.zip
cp -rf megabuy-go/templates/admin templates/
cp -rf megabuy-go/internal/admin internal/
cp megabuy-go/cmd/server/main.go cmd/server/main.go
rm -rf megabuy-go megabuy-admin-fix.zip
git add .
git commit -m "Admin panel fix"
git push
ls -la /root/megabuy-go/internal/admin/
ls -la /root/megabuy-go/templates/admin/
cd /root/megabuy-go
go build ./cmd/server
cat /root/megabuy-go/internal/database/postgres.go | head -50
cat /root/megabuy-go/internal/cache/redis.go | head -50
ls /root/megabuy-go/internal/database/
cat /root/megabuy-go/internal/database/*.go | head -80
cd /root/megabuy-go
unzip -o megabuy-admin-fix2.zip
cp -rf megabuy-go/internal/admin/* internal/admin/
rm -rf megabuy-go megabuy-admin-fix2.zip
git add .
git commit -m "Admin fix types"
git push
