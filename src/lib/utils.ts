import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string, currency: string = 'EUR'): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency,
  }).format(numPrice)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('sk-SK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${year}${month}-${random}`
}

export function generateSKU(prefix: string = 'SKU'): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${random}`
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone)
}

export function isValidICO(ico: string): boolean {
  // Slovak IČO validation (8 digits)
  return /^\d{8}$/.test(ico.replace(/\s/g, ''))
}

export const orderStatusLabels: Record<string, string> = {
  PENDING: 'Čaká na spracovanie',
  CONFIRMED: 'Potvrdená',
  PROCESSING: 'Spracováva sa',
  SHIPPED: 'Odoslaná',
  DELIVERED: 'Doručená',
  CANCELLED: 'Zrušená',
  REFUNDED: 'Vrátená',
}

export const paymentStatusLabels: Record<string, string> = {
  PENDING: 'Čaká na platbu',
  PAID: 'Zaplatená',
  FAILED: 'Zlyhala',
  REFUNDED: 'Vrátená',
  PARTIALLY_REFUNDED: 'Čiastočne vrátená',
}

export const productStatusLabels: Record<string, string> = {
  DRAFT: 'Koncept',
  ACTIVE: 'Aktívny',
  ARCHIVED: 'Archivovaný',
}
