import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import FoodCard from '../components/FoodCard'
import Modal from '../components/Modal'
import { foods } from '../data/foods'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'

export default function Menu() {
  const [params] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [search, setSearch] = useState(params.get('search') || '')
  const [sort, setSort] = useState('featured')
  const [quickView, setQuickView] = useState(null)
  const { addToCart } = useCart()

  const filteredFoods = useMemo(() => {
    const nextFoods = foods
      .filter((food) => category === 'All' || food.category === category)
      .filter((food) => `${food.name} ${food.category} ${food.description}`.toLowerCase().includes(search.toLowerCase()))

    if (sort === 'price-low') return [...nextFoods].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...nextFoods].sort((a, b) => b.price - a.price)
    if (sort === 'rating') return [...nextFoods].sort((a, b) => b.rating - a.rating)
    return nextFoods
  }, [category, search, sort])

  return (
    <main className="page-pad page-top">
      <div className="page-hero compact-hero">
        <span className="eyebrow">Menu</span>
        <h1>Choose your next favorite dish.</h1>
      </div>
      <div className="menu-toolbar">
        <label className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes" /></label>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="filter-row">
        {['All', ...categories.slice(0, 9).map((item) => item.name)].map((item) => (
          <button key={item} className={category === item ? 'active' : ''} type="button" onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>
      <div className="food-grid">
        {filteredFoods.map((food) => <FoodCard key={food.id} food={food} onQuickView={setQuickView} />)}
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
