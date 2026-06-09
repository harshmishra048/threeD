import { NavLink } from 'react-router-dom'
import { Heart, LayoutDashboard, ListOrdered, MapPin, ShieldCheck, ShoppingCart } from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/orders', label: 'Orders', icon: ListOrdered },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
]

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-shell page-pad">
      <aside className="dashboard-side">
        <div className="side-brand"><MapPin size={20} /> Ambrosia Club</div>
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink key={link.to} to={link.to}>
              <Icon size={18} /> {link.label}
            </NavLink>
          )
        })}
      </aside>
      <main>{children}</main>
    </div>
  )
}
