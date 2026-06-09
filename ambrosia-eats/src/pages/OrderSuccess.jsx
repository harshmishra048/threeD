import { CheckCircle2, ListOrdered, MapPinned, ShoppingBag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { readStorage } from '../utils/localStorage'
import { currency } from '../utils/calculations'

export default function OrderSuccess() {
  const { orderId } = useParams()
  const order = readStorage('orders', []).find((item) => item.id === orderId)

  if (!order) return <main className="page-pad page-top"><EmptyState title="Order not found" text="We could not find this order in localStorage." to="/orders" actionLabel="View orders" /></main>

  return (
    <main className="page-pad page-top success-page">
      <CheckCircle2 className="success-icon" size={72} />
      <span className="eyebrow">Order confirmed</span>
      <h1>{order.id}</h1>
      <p>Estimated delivery by {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <strong>{currency(order.total)}</strong>
      <div className="hero-actions center-actions">
        <Link className="btn primary" to={`/tracking/${order.id}`}><MapPinned size={18} /> Track Order</Link>
        <Link className="btn ghost" to="/orders"><ListOrdered size={18} /> View Orders</Link>
        <Link className="btn ghost" to="/menu"><ShoppingBag size={18} /> Continue Shopping</Link>
      </div>
    </main>
  )
}
