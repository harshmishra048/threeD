import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import EmptyState from '../components/EmptyState'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { currency, getCartSummary } from '../utils/calculations'
import { readStorage, writeStorage } from '../utils/localStorage'

export default function Checkout() {
  const [params] = useSearchParams()
  const { currentUser } = useAuth()
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    line1: '',
    city: '',
    pincode: '',
    note: '',
  })
  const summary = getCartSummary(cart, params.get('coupon') || '')

  if (cart.length === 0) return <main className="page-pad page-top"><EmptyState title="No items to checkout" text="Your cart is ready for a fresh start." /></main>

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const placeOrder = (event) => {
    event.preventDefault()
    const order = {
      id: `AMB${Date.now()}`,
      userEmail: currentUser.email,
      items: cart,
      address: { line1: form.line1, city: form.city, pincode: form.pincode, note: form.note },
      paymentMethod,
      subtotal: summary.subtotal,
      discount: summary.discount,
      deliveryFee: summary.deliveryFee,
      tax: summary.tax,
      total: summary.total,
      status: 'Preparing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 35 * 60000).toISOString(),
    }
    writeStorage('orders', [order, ...readStorage('orders', [])])
    clearCart()
    toast.success('Order placed')
    navigate(`/order-success/${order.id}`)
  }

  return (
    <main className="page-pad page-top checkout-layout">
      <form className="form-card" onSubmit={placeOrder}>
        <span className="eyebrow">Checkout</span>
        <h1>Delivery details</h1>
        <div className="form-grid">
          <input name="name" value={form.name} onChange={updateForm} required placeholder="Full name" />
          <input name="phone" value={form.phone} onChange={updateForm} required placeholder="Phone" />
          <input name="line1" value={form.line1} onChange={updateForm} required placeholder="House, street, area" />
          <input name="city" value={form.city} onChange={updateForm} required placeholder="City" />
          <input name="pincode" value={form.pincode} onChange={updateForm} required placeholder="Pincode" />
          <input name="note" value={form.note} onChange={updateForm} placeholder="Delivery note" />
        </div>
        <h2>Payment method</h2>
        <div className="payment-row">
          {['Cash on Delivery', 'UPI', 'Card'].map((method) => (
            <button className={paymentMethod === method ? 'active' : ''} key={method} type="button" onClick={() => setPaymentMethod(method)}>{method}</button>
          ))}
        </div>
        <button className="btn primary full" type="submit">Place Order</button>
      </form>
      <aside className="summary-card">
        <h2>Order summary</h2>
        {cart.map((item) => <p key={item.id}><span>{item.quantity} x {item.name}</span><strong>{currency(item.price * item.quantity)}</strong></p>)}
        <p className="total"><span>Total</span><strong>{currency(summary.total)}</strong></p>
      </aside>
    </main>
  )
}
