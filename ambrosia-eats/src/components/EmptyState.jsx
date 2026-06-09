import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyState({ title, text, actionLabel = 'Explore menu', to = '/menu', icon: Icon = ShoppingBag }) {
  return (
    <div className="empty-state">
      <Icon size={42} />
      <h2>{title}</h2>
      <p>{text}</p>
      <Link className="btn primary" to={to}>{actionLabel}</Link>
    </div>
  )
}
