import { ChefHat, Clock, IndianRupee, ShoppingBag, Users } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import { foods } from '../data/foods'
import { currency } from '../utils/calculations'
import { readStorage, writeStorage } from '../utils/localStorage'

export default function AdminDashboard() {
  const orders = readStorage('orders', [])
  const users = readStorage('users', [])
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pending = orders.filter((order) => order.status !== 'Delivered').length

  const updateStatus = (id, status) => {
    const nextOrders = orders.map((order) => (order.id === id ? { ...order, status } : order))
    writeStorage('orders', nextOrders)
    window.location.reload()
  }

  return (
    <DashboardLayout>
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Admin</span>
          <h1>Restaurant command center</h1>
          <p>Frontend-only operational UI using localStorage orders.</p>
        </div>
      </section>
      <div className="stat-grid">
        <article><ShoppingBag /><strong>{orders.length}</strong><span>Total Orders</span></article>
        <article><IndianRupee /><strong>{currency(revenue)}</strong><span>Revenue</span></article>
        <article><Users /><strong>{users.length}</strong><span>Customers</span></article>
        <article><Clock /><strong>{pending}</strong><span>Pending Orders</span></article>
      </div>
      <section className="section admin-grid">
        <article className="panel">
          <h2>Recent orders</h2>
          <div className="admin-table">
            {orders.slice(0, 6).map((order) => (
              <div key={order.id}>
                <span>{order.id}</span>
                <strong>{currency(order.total)}</strong>
                <select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)}>
                  <option>Preparing</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                </select>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <h2>Popular dishes</h2>
          {foods.filter((food) => food.isPopular).slice(0, 6).map((food) => (
            <div className="bar-row" key={food.id}>
              <span>{food.name}</span>
              <div><i style={{ width: `${Math.min(food.reviews / 5, 100)}%` }} /></div>
            </div>
          ))}
        </article>
      </section>
      <section className="section">
        <h2>Menu management</h2>
        <div className="menu-manage-grid">
          {foods.slice(0, 8).map((food) => (
            <article key={food.id}><img src={food.image} alt={food.name} /><strong>{food.name}</strong><span>{food.category}</span><ChefHat size={18} /></article>
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}
