import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((current) => (current + 1) % images.length), 3200)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="image-carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Featured dish"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45 }}
        />
      </AnimatePresence>
      <div className="carousel-dots">
        {images.map((image, dotIndex) => (
          <button
            key={image}
            className={dotIndex === index ? 'active' : ''}
            type="button"
            aria-label={`Show slide ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex)}
          />
        ))}
      </div>
    </div>
  )
}
