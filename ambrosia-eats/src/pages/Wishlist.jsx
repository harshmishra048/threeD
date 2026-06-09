import { Heart } from 'lucide-react'
import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import FoodCard from '../components/FoodCard'
import Modal from '../components/Modal'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const [quickView, setQuickView] = useState(null)
  const { addToCart } = useCart()
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) return <main className="page-pad page-top"><EmptyState title="No favorites yet" text="Tap the heart on dishes you want to remember." icon={Heart} /></main>

  return (
    <main className="page-pad page-top">
      <span className="eyebrow">Wishlist</span>
      <h1>Your saved cravings</h1>
      <div className="food-grid">
        {wishlist.map((food) => <FoodCard key={food.id} food={food} onQuickView={setQuickView} />)}
      </div>
      <Modal open={Boolean(quickView)} title={quickView?.name} onClose={() => setQuickView(null)}>
        {quickView && (
          <div className="quick-view">
            <img src={quickView.image} alt={quickView.name} />
            <p>{quickView.description}</p>
            <button className="btn primary" type="button" onClick={() => addToCart(quickView)}>Add to cart</button>
          </div>
        )}
      </Modal>
    </main>
  )
}
