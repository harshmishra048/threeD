import { Bike, Clock, Phone } from 'lucide-react'
import { useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import TrackingTimeline from '../components/TrackingTimeline'
import { currency, getTrackingStep } from '../utils/calculations'
import { readStorage } from '../utils/localStorage'

export default function Tracking() {
  const { orderId } = useParams()
  const order = readStorage('orders', []).find((item) => item.id === orderId)

  if (!order) return <main className="page-pad page-top"><EmptyState title="Tracking unavailable" text="This order ID is not stored on this browser." to="/orders" actionLabel="Back to orders" /></main>

  const step = getTrackingStep(order.createdAt, order.status)

  return (
    <main className="page-pad page-top tracking-page">
      <span className="eyebrow">Live tracking</span>
      <h1>{order.id}</h1>
      <TrackingTimeline currentStep={step} />
      <section className="tracking-grid">
        <article className="panel">
          <h2>Delivery partner</h2>
          <p><Bike size={18} /> Rohan is carrying your order</p>
          <p><Phone size={18} /> +91 90000 11223</p>
          <p><Clock size={18} /> ETA {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </article>
        <article className="panel">
          <h2>Ordered items</h2>
          {order.items.map((item) => <p key={item.id}><span>{item.quantity} x {item.name}</span><strong>{currency(item.price * item.quantity)}</strong></p>)}
        </article>
        <article className="panel">
          <h2>Delivery address</h2>
          <p>{order.address.line1}</p>
          <p>{order.address.city} - {order.address.pincode}</p>
        </article>
      </section>
    </main>
  )
}
