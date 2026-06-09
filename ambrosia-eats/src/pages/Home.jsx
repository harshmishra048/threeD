import { ArrowRight, Award, Bike, Clock, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import FoodCard from '../components/FoodCard'
import HeroCarousel from '../components/HeroCarousel'
import Modal from '../components/Modal'
import ReviewCard from '../components/ReviewCard'
import { categories } from '../data/categories'
import { foods } from '../data/foods'
import { reviews } from '../data/reviews'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [query, setQuery] = useState('')
  const [quickView, setQuickView] = useState(null)
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const featured = foods.filter((food) => food.isPopular).slice(0, 6)
  const chef = foods.filter((food) => food.isChefSpecial).slice(0, 4)
  const special = foods.find((food) => food.id === 'tandoori-platter')

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/menu?search=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <section className="hero-section page-pad">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow"><Sparkles size={16} /> Premium food delivery</span>
          <h1>Restaurant-grade comfort, delivered with amber warmth.</h1>
          <p>Ambrosia Eats brings chef-led menus, fast local delivery, and polished ordering into one calm, beautiful experience.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pizza, biryani, pasta..." />
            <button className="btn primary" type="submit">Search</button>
          </form>
          <div className="hero-actions">
            <Link className="btn primary" to="/menu">Order Now <ArrowRight size={18} /></Link>
            <Link className="btn ghost" to="/menu">View Menu</Link>
          </div>
        </motion.div>
        <HeroCarousel />
      </section>

      <section className="section page-pad">
        <div className="section-head">
          <span className="eyebrow">Popular categories</span>
          <h2>Start with a craving</h2>
        </div>
        <div className="category-grid">
          {categories.slice(0, 9).map((category) => (
            <CategoryCard key={category.name} category={category} onClick={() => navigate(`/menu?category=${category.name}`)} />
          ))}
        </div>
      </section>

      <section className="section page-pad">
        <div className="section-head">
          <span className="eyebrow">Featured dishes</span>
          <h2>Most loved this week</h2>
        </div>
        <div className="food-grid">
          {featured.map((food) => <FoodCard key={food.id} food={food} onQuickView={setQuickView} />)}
        </div>
      </section>

      <section className="special-band page-pad">
        <img src={special.image} alt={special.name} />
        <div>
          <span className="eyebrow">Today's special</span>
          <h2>{special.name}</h2>
          <p>{special.description}</p>
          <button className="btn primary" type="button" onClick={() => addToCart(special)}>Add Special</button>
        </div>
      </section>

      <section className="section page-pad split-section">
        <div>
          <span className="eyebrow">Our story</span>
          <h2>Built for people who love serious food without complicated ordering.</h2>
          <p>Our chefs plan menus around seasonality, texture, and travel-ready packaging, so every dish lands with the same care it leaves the pass.</p>
          <Link className="btn ghost" to="/about">Meet the kitchen</Link>
        </div>
        <div className="why-grid">
          <article><Bike size={24} /><strong>Fast routes</strong><span>Optimized delivery windows across the city.</span></article>
          <article><Award size={24} /><strong>Chef-led</strong><span>Every recipe is tested for flavor and travel.</span></article>
          <article><Clock size={24} /><strong>Live tracking</strong><span>Clear order progress from kitchen to doorstep.</span></article>
        </div>
      </section>

      <section className="section page-pad">
        <div className="section-head">
          <span className="eyebrow">Chef recommended</span>
          <h2>Signature plates</h2>
        </div>
        <div className="food-grid compact">
          {chef.map((food) => <FoodCard key={food.id} food={food} onQuickView={setQuickView} />)}
        </div>
      </section>

      <section className="section page-pad">
        <div className="section-head">
          <span className="eyebrow">Customer reviews</span>
          <h2>Warm words from hungry people</h2>
        </div>
        <div className="review-grid">
          {reviews.map((review) => <ReviewCard key={review.name} review={review} />)}
        </div>
      </section>

      <section className="app-band page-pad">
        <div>
          <span className="eyebrow">Ambrosia app</span>
          <h2>Save favorites, reorder faster, track every delivery.</h2>
        </div>
        <Link className="btn primary" to="/dashboard">Open dashboard</Link>
      </section>

      <section className="newsletter page-pad">
        <h2>Join the supper list</h2>
        <form onSubmit={(event) => { event.preventDefault(); toast.success('You are on the list') }}>
          <input type="email" required placeholder="you@example.com" />
          <button className="btn primary" type="submit">Subscribe</button>
        </form>
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
    </>
  )
}
