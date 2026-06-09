import { motion } from 'framer-motion'

export default function CategoryCard({ category, active, onClick }) {
  const Icon = category.icon
  return (
    <motion.button
      className={`category-card ${active ? 'active' : ''}`}
      whileHover={{ y: -6 }}
      type="button"
      onClick={onClick}
    >
      <span className="category-icon"><Icon size={22} /></span>
      <strong>{category.name}</strong>
      <small>{category.description}</small>
    </motion.button>
  )
}
