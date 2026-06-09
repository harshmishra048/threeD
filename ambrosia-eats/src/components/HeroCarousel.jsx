import { Clock, Leaf, Star } from 'lucide-react'
import ImageCarousel from './ImageCarousel'

const heroImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=80',
]

export default function HeroCarousel() {
  return (
    <div className="hero-visual">
      <ImageCarousel images={heroImages} />
      <div className="float-card delivery"><Clock size={18} /> 30 min delivery</div>
      <div className="float-card rating"><Star size={18} fill="currentColor" /> 4.9 rating</div>
      <div className="float-card fresh"><Leaf size={18} /> Fresh ingredients</div>
    </div>
  )
}
