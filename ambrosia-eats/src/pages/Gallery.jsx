import { useState } from 'react'
import Modal from '../components/Modal'
import { galleryImages } from '../data/gallery'

const filters = ['All', 'Food', 'Interior', 'Chef', 'Events']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const images = galleryImages.filter((item) => filter === 'All' || item.category === filter)

  return (
    <main className="page-pad page-top">
      <section className="page-hero compact-hero">
        <span className="eyebrow">Gallery</span>
        <h1>Food, rooms, and nights worth remembering.</h1>
      </section>
      <div className="filter-row">
        {filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} type="button" onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="gallery-grid">
        {images.map((item) => (
          <button key={item.id} type="button" className="gallery-tile" onClick={() => setSelected(item)}>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <Modal open={Boolean(selected)} title={selected?.title} onClose={() => setSelected(null)}>
        {selected && <img className="lightbox-image" src={selected.image} alt={selected.title} />}
      </Modal>
    </main>
  )
}
