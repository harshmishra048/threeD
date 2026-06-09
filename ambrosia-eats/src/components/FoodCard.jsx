import { Eye, Heart, Plus, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { currency } from '../utils/calculations'

export default function FoodCard({ food, onQuickView }) {
  const { addToCart } = useCart()
  const { isFavorite, toggleWishlist } = useWishlist()

  return (
    <motion.article className="food-card" whileHover={{ y: -7 }} layout>
      <div className="food-image">
        <img src={food.image} alt={food.name} />
        <span className={`badge ${food.isVeg ? 'veg' : 'nonveg'}`}>{food.isVeg ? 'Veg' : 'Non-veg'}</span>
        {food.isChefSpecial && <span className="badge chef">Chef</span>}
        <button className={`heart-btn ${isFavorite(food.id) ? 'active' : ''}`} type="button" onClick={() => toggleWishlist(food)} aria-label="Toggle wishlist">
          <Heart size={18} fill={isFavorite(food.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="food-body">
        <div className="food-meta">
          <span>{food.category}</span>
          <span><Star size={15} fill="currentColor" /> {food.rating}</span>
        </div>
        <Link to={`/menu/${food.id}`} className="food-title">{food.name}</Link>
        <p>{food.description}</p>
        <div className="price-row">
          <strong>{currency(food.price)}</strong>
          <del>{currency(food.oldPrice)}</del>
          <span>{food.deliveryTime}</span>
        </div>
        <div className="food-actions">
          <button className="btn primary small" type="button" onClick={() => addToCart(food)}>
            <Plus size={16} /> Add
          </button>
          <button className="btn ghost small" type="button" onClick={() => onQuickView(food)}>
            <Eye size={16} /> View
          </button>
        </div>
      </div>
    </motion.article>
  )
}
