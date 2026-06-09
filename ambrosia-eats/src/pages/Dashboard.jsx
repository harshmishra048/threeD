import { Heart, MapPin, ShoppingBag, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import FoodCard from '../components/FoodCard'
import Modal from '../components/Modal'
import OrderCard from '../components/OrderCard'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { readStorage } from '../utils/localStorage'

export default function Dashboard() {
  const [quickView, setQuickView] = useState(null)
  const { currentUser } = useAuth()
  const { addToCart } = useCart()
  const { wishlist } = useWishlist()
  const orders = readStorage('orders', []).filter((order) => order.userEmail === currentUser.email).slice(0, 2)
  const latestOrder = orders[0]

  return (
    <DashboardLayout>
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Hello, {currentUser.name}</h1>
          <p>Your favorites, rewards, addresses, and recent orders are ready.</p>
        </div>
        <div className="profile-card"><Wallet size={28} /><strong>{currentUser.points || 250}</strong><span>Reward points</span></div>
      </section>
      <div className="stat-grid">
        <article><ShoppingBag /><strong>{orders.length}</strong><span>Recent orders</span></article>
        <article><Heart /><strong>{wishlist.length}</strong><span>Favorite foods</span></article>
        <article><MapPin /><strong>2</strong><span>Saved addresses</span></article>
      </div>
      <section className="quick-actions">
        <Link className="btn primary" to="/menu">View Menu</Link>
        <Link className="btn ghost" to="/cart">View Cart</Link>
        <Link className="btn ghost" to="/orders">View Orders</Link>
        {latestOrder && <Link className="btn ghost" to={`/tracking/${latestOrder.id}`}>Track Latest Order</Link>}
      </section>
      <section className="section">
        <h2>Recent orders</h2>
        <div className="order-list">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div>
      </section>
      <section className="section">
        <h2>Favorite foods</h2>
        <div className="food-grid compact">{wishlist.slice(0, 3).map((food) => <FoodCard key={food.id} food={food} onQuickView={setQuickView} />)}</div>
      </section>
      <Modal open={Boolean(quickView)} title={quickView?.name} onClose={() => setQuickView(null)}>
        {quickView && (
          <div className="quick-view">
            <img src={quickView.image} alt={quickView.name} />
            <p>{quickView.description}</p>
            <button className="btn primary" type="button" onClick={() => addToCart(quickView)}>Add to cart</button>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
