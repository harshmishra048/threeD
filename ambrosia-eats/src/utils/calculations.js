export const currency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0)

export const getSubtotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)

export const getCartSummary = (items, coupon = '') => {
  const subtotal = getSubtotal(items)
  const normalizedCoupon = coupon.trim().toUpperCase()
  const discount = normalizedCoupon === 'AMBRO20' ? Math.round(subtotal * 0.2) : 0
  const deliveryFee = normalizedCoupon === 'FREEDEL' || subtotal === 0 ? 0 : subtotal > 999 ? 0 : 49
  const tax = subtotal > 0 ? Math.round((subtotal - discount) * 0.05) : 0
  const total = Math.max(subtotal - discount + deliveryFee + tax, 0)

  return { subtotal, discount, deliveryFee, tax, total, coupon: normalizedCoupon }
}

export const getTrackingStep = (createdAt, status) => {
  if (status === 'Delivered') return 3
  const minutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000)
  if (minutes >= 30) return 3
  if (minutes >= 18) return 2
  if (minutes >= 5) return 1
  return 0
}
