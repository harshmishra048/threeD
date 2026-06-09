import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand" to="/"><span>AE</span> Ambrosia Eats</Link>
        <p>Premium restaurant dining and delivery, crafted for slow evenings and fast cravings.</p>
        <div className="socials">
          <span>IG</span>
          <span>FB</span>
          <span>X</span>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <h4>Contact</h4>
        <p><MapPin size={16} /> 18 Amber Lane, Mumbai</p>
        <p><Phone size={16} /> +91 98765 43210</p>
        <p><Mail size={16} /> hello@ambrosiaeats.com</p>
      </div>
    </footer>
  )
}
