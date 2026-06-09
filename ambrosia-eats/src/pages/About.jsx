import { Award, HeartHandshake, Leaf, Timer } from 'lucide-react'
import { galleryImages } from '../data/gallery'

export default function About() {
  return (
    <main className="page-pad page-top">
      <section className="page-hero">
        <span className="eyebrow">About Ambrosia</span>
        <h1>A premium kitchen built around warmth, speed, and craft.</h1>
        <p>We started Ambrosia Eats to make delivery feel less like a compromise and more like a beautifully hosted meal.</p>
      </section>
      <section className="split-section section">
        <div><h2>Our story</h2><p>From a small chef table in Mumbai to a delivery-first restaurant, our goal has stayed simple: thoughtful food, packaged carefully, delivered gracefully.</p></div>
        <div><h2>Mission</h2><p>Serve food with the polish of a dining room and the convenience of a modern delivery platform.</p></div>
      </section>
      <section className="stat-grid">
        <article><Timer /><strong>30 min</strong><span>Average delivery</span></article>
        <article><Award /><strong>4.9</strong><span>Guest rating</span></article>
        <article><Leaf /><strong>100%</strong><span>Fresh sourcing</span></article>
        <article><HeartHandshake /><strong>40k+</strong><span>Happy orders</span></article>
      </section>
      <section className="section">
        <div className="section-head"><span className="eyebrow">Chef section</span><h2>Led by flavor people</h2></div>
        <div className="chef-card"><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80" alt="Chef plating food" /><div><h3>Chef Mira Kapoor</h3><p>Our executive chef brings seasonal Indian comfort, Italian craft, and wok-fired favorites into one tight menu.</p></div></div>
      </section>
      <section className="section">
        <h2>Gallery</h2>
        <div className="gallery-grid small-gallery">{galleryImages.slice(0, 4).map((item) => <img key={item.id} src={item.image} alt={item.title} />)}</div>
      </section>
      <section className="timeline">
        {['2019: Chef table opens', '2021: Delivery kitchen launches', '2024: Ambrosia Club begins', '2026: Citywide premium delivery'].map((item) => <article key={item}>{item}</article>)}
      </section>
    </main>
  )
}
