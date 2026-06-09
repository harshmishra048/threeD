import EmptyState from '../components/EmptyState'
import OrderCard from '../components/OrderCard'
import { useAuth } from '../context/AuthContext'
import { readStorage } from '../utils/localStorage'

export default function Orders() {
  const { currentUser } = useAuth()
  const orders = readStorage('orders', []).filter((order) => order.userEmail === currentUser.email)

  if (orders.length === 0) return <main className="page-pad page-top"><EmptyState title="No orders yet" text="Your order history will appear here after checkout." /></main>

  return (
    <main className="page-pad page-top">
      <span className="eyebrow">Orders</span>
      <h1>Your recent orders</h1>
      <div className="order-list">
        {orders.map((order) => <OrderCard key={order.id} order={order} />)}
      </div>
    </main>
  )
}
