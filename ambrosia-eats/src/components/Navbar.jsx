import { Heart, ListOrdered, LogOut, Menu, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span>AE</span> Ambrosia Eats
        </Link>

        <button className="icon-btn menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            <NavLink className="nav-icon" to="/wishlist" onClick={() => setOpen(false)} aria-label="Wishlist">
              <Heart size={19} />
              {wishlist.length > 0 && <span>{wishlist.length}</span>}
            </NavLink>
            <NavLink className="nav-icon" to="/orders" onClick={() => setOpen(false)} aria-label="Orders">
              <ListOrdered size={19} />
            </NavLink>
            <NavLink className="nav-icon" to="/cart" onClick={() => setOpen(false)} aria-label="Cart">
              <ShoppingBag size={19} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </NavLink>
            {currentUser ? (
              <>
                <NavLink className="profile-pill" to="/dashboard" onClick={() => setOpen(false)}>
                  <User size={17} /> {currentUser.name.split(' ')[0]}
                </NavLink>
                <button className="icon-btn" type="button" onClick={handleLogout} aria-label="Logout">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link className="btn primary small" to="/login" onClick={() => setOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
