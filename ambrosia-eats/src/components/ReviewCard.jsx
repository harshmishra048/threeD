import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ReviewCard({ review }) {
  return (
    <motion.article className="review-card" whileHover={{ y: -4 }}>
      <div className="stars">
        <Star size={16} fill="currentColor" />
        <span>{review.rating}</span>
      </div>
      <p>{review.text}</p>
      <strong>{review.name}</strong>
      <small>{review.role}</small>
    </motion.article>
  )
}
