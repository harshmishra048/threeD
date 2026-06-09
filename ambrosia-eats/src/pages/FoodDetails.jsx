import { Minus, Plus, Star, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import FoodCard from '../components/FoodCard'
import Modal from '../components/Modal'
import { useCart } from '../context/CartContext'
import { foods } from '../data/foods'
import { currency } from '../utils/calculations'

export default function FoodDetails() {
  const { id } = useParams()
  const food = foods.find((item) => item.id === id)
  const [quantity, setQuantity] = useState(1)
  const [quickView, setQuickView] = useState(null)
  const { addToCart } = useCart()
  const similar = useMemo(() => foods.filter((item) => item.category === food?.category && item.id !== food?.id).slice(0, 3), [food])

  if (!food) return <main className="page-pad page-top"><EmptyState title="Dish not found" text="This plate is no longer on the menu." /></main>

  return (
    <main className="page-pad page-top">
      <section className="details-grid">
        <img className="details-image" src={food.image} alt={food.name} />
        <div className="details-panel">
          <span className="eyebrow">{food.category}</span>
          <h1>{food.name}</h1>
          <div className="rating-line"><Star size={18} fill="currentColor" /> {food.rating} rating · {food.reviews} reviews</div>
          <p>{food.description}</p>
          <div className="details-price"><strong>{currency(food.price)}</strong><del>{currency(food.oldPrice)}</del></div>
          <div className="qty-control">
            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
          </div>
          <button className="btn primary" type="button" onClick={() => addToCart(food, quantity)}>Add to cart</button>
          <div className="delivery-card"><Truck size={20} /> Estimated delivery in {food.deliveryTime}</div>
        </div>
      </section>
      <section className="section">
        <h2>Ingredients</h2>
        <div className="pill-row">{food.ingredients.map((item) => <span key={item}>{item}</span>)}</div>
      </section>
      <section className="stat-grid">
        <article><strong>{food.calories}</strong><span>Calories</span></article>
        <article><strong>{food.protein}g</strong><span>Protein</span></article>
        <article><strong>{food.deliveryTime}</strong><span>Delivery</span></article>
      </section>
      <section className="section">
        <div className="section-head"><h2>Recommended with this</h2><Link to="/menu">View all</Link></div>
        <div className="food-grid compact">
          {similar.map((item) => <FoodCard key={item.id} food={item} onQuickView={setQuickView} />)}
        </div>
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
    </main>
  )
}
