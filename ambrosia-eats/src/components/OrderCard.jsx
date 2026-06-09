import { Link } from 'react-router-dom'
import { Calendar, MapPin, Navigation } from 'lucide-react'
import { currency } from '../utils/calculations'

export default function OrderCard({ order }) {
  return (
    <article className="order-card">
      <div>
        <span className="eyebrow">{order.status}</span>
        <h3>{order.id}</h3>
        <p><Calendar size={16} /> {new Date(order.createdAt).toLocaleString()}</p>
        <p><MapPin size={16} /> {order.address?.line1}, {order.address?.city}</p>
      </div>
      <div>
        <strong>{currency(order.total)}</strong>
        <small>{order.items.length} item groups</small>
        <div className="order-actions">
          <Link className="btn ghost small" to={`/tracking/${order.id}`}><Navigation size={16} /> Track</Link>
          <Link className="btn primary small" to={`/order-success/${order.id}`}>Details</Link>
        </div>
      </div>
    </article>
  )
}
