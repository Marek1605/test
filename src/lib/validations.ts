import { z } from 'zod'

// ==============================================
// AUTH SCHEMAS
// ==============================================

export const loginSchema = z.object({
  email: z.string().email('Neplatný email'),
  password: z.string().min(1, 'Heslo je povinné'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Meno musí mať aspoň 2 znaky'),
  email: z.string().email('Neplatný email'),
  password: z
    .string()
    .min(8, 'Heslo musí mať aspoň 8 znakov')
    .regex(/[A-Z]/, 'Heslo musí obsahovať aspoň jedno veľké písmeno')
    .regex(/[0-9]/, 'Heslo musí obsahovať aspoň jednu číslicu'),
})

// ==============================================
// SHOP SCHEMAS
// ==============================================

export const createShopSchema = z.object({
  name: z.string().min(2, 'Názov musí mať aspoň 2 znaky').max(50),
  description: z.string().max(500).optional(),
  category: z.string().optional(),
})

export const updateShopSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  description: z.string().max(500).optional(),
  logo: z.string().url().optional().nullable(),
  favicon: z.string().url().optional().nullable(),
  theme: z.string().optional(),
  colors: z.any().optional(),
  currency: z.enum(['EUR', 'CZK', 'USD']).optional(),
  language: z.enum(['sk', 'cs', 'en']).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.any().optional(),
  companyName: z.string().optional().nullable(),
  ico: z.string().optional().nullable(),
  dic: z.string().optional().nullable(),
  icDph: z.string().optional().nullable(),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
})

// ==============================================
// PRODUCT SCHEMAS
// ==============================================

export const createProductSchema = z.object({
  name: z.string().min(1, 'Názov je povinný').max(200),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  price: z.coerce.number().min(0, 'Cena nemôže byť záporná'),
  comparePrice: z.coerce.number().min(0).optional().nullable(),
  costPrice: z.coerce.number().min(0).optional().nullable(),
  sku: z.string().max(50).optional().nullable(),
  barcode: z.string().max(50).optional().nullable(),
  ean: z.string().max(20).optional().nullable(),
  quantity: z.coerce.number().int().min(0).default(0),
  trackInventory: z.boolean().default(true),
  weight: z.coerce.number().min(0).optional().nullable(),
  images: z.array(z.string().url()).default([]),
  categoryId: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  metaTitle: z.string().max(70).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
})

export const updateProductSchema = createProductSchema.partial()

// ==============================================
// CATEGORY SCHEMAS
// ==============================================

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Názov je povinný').max(100),
  description: z.string().max(500).optional(),
  image: z.string().url().optional().nullable(),
  parentId: z.string().optional().nullable(),
})

// ==============================================
// ORDER SCHEMAS
// ==============================================

export const addressSchema = z.object({
  firstName: z.string().min(1, 'Meno je povinné'),
  lastName: z.string().min(1, 'Priezvisko je povinné'),
  email: z.string().email('Neplatný email').optional(),
  phone: z.string().optional(),
  street: z.string().min(1, 'Ulica je povinná'),
  city: z.string().min(1, 'Mesto je povinné'),
  zip: z.string().min(1, 'PSČ je povinné'),
  country: z.string().default('SK'),
  companyName: z.string().optional(),
  ico: z.string().optional(),
  dic: z.string().optional(),
  icDph: z.string().optional(),
})

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional().nullable(),
    quantity: z.number().int().min(1),
  })).min(1),
  billingAddress: addressSchema,
  shippingAddress: addressSchema.optional(),
  sameAsShipping: z.boolean().default(true),
  shippingMethod: z.string(),
  paymentMethod: z.string(),
  customerNote: z.string().max(500).optional(),
  couponCode: z.string().optional(),
})

export const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED']).optional(),
  trackingNumber: z.string().optional().nullable(),
  internalNote: z.string().optional().nullable(),
})

// ==============================================
// CUSTOMER SCHEMAS
// ==============================================

export const createCustomerSchema = z.object({
  email: z.string().email('Neplatný email'),
  password: z.string().min(8).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  ico: z.string().optional(),
  dic: z.string().optional(),
  note: z.string().max(500).optional(),
  tags: z.array(z.string()).default([]),
  acceptsMarketing: z.boolean().default(false),
})

// ==============================================
// COUPON SCHEMAS
// ==============================================

export const createCouponSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  description: z.string().optional(),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING']),
  value: z.coerce.number().min(0),
  minOrderValue: z.coerce.number().min(0).optional().nullable(),
  maxUses: z.coerce.number().int().min(1).optional().nullable(),
  perCustomer: z.coerce.number().int().min(1).default(1),
  startsAt: z.coerce.date().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
  active: z.boolean().default(true),
})

// ==============================================
// AI SCHEMAS
// ==============================================

export const aiGenerateSchema = z.object({
  action: z.enum([
    'generate-shop',
    'generate-product',
    'generate-category',
    'improve-text',
    'generate-seo',
  ]),
  data: z.any(),
})

// ==============================================
// TYPE EXPORTS
// ==============================================

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateShopInput = z.infer<typeof createShopSchema>
export type UpdateShopInput = z.infer<typeof updateShopSchema>
export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type CreateCouponInput = z.infer<typeof createCouponSchema>
export type AddressInput = z.infer<typeof addressSchema>
