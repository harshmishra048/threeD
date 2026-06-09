import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import { useCart } from '../context/CartContext'
import { currency, getCartSummary } from '../utils/calculations'

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const summary = getCartSummary(cart, appliedCoupon)

  if (cart.length === 0) return <main className="page-pad page-top"><EmptyState title="Your cart is empty" text="Add something wonderful from the menu." /></main>

  return (
    <main className="page-pad page-top cart-layout">
      <section>
        <span className="eyebrow">Cart</span>
        <h1>Your dining bag</h1>
        <div className="cart-list">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div><h3>{item.name}</h3><p>{currency(item.price)}</p></div>
              <div className="qty-control small-control">
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={15} /></button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={15} /></button>
              </div>
              <button className="icon-btn" type="button" onClick={() => removeFromCart(item.id)}><Trash2 size={18} /></button>
            </article>
          ))}
        </div>
      </section>
      <aside className="summary-card">
        <h2>Price summary</h2>
        <div className="coupon-row">
          <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="AMBRO20 or FREEDEL" />
          <button className="btn ghost small" type="button" onClick={() => setAppliedCoupon(coupon)}>Apply</button>
        </div>
        <p><span>Subtotal</span><strong>{currency(summary.subtotal)}</strong></p>
        <p><span>Discount</span><strong>- {currency(summary.discount)}</strong></p>
        <p><span>Delivery</span><strong>{currency(summary.deliveryFee)}</strong></p>
        <p><span>Tax</span><strong>{currency(summary.tax)}</strong></p>
        <p className="total"><span>Total</span><strong>{currency(summary.total)}</strong></p>
        <Link className="btn primary full" to={`/checkout?coupon=${summary.coupon}`}>Checkout</Link>
      </aside>
    </main>
  )
}
