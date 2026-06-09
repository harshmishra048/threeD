import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    toast.success('Message sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <main className="page-pad page-top contact-layout">
      <section className="form-card">
        <span className="eyebrow">Contact</span>
        <h1>Tell us what you are craving.</h1>
        <form onSubmit={submit} className="stack-form">
          <input name="name" required value={form.name} onChange={update} placeholder="Name" />
          <input name="email" type="email" required value={form.email} onChange={update} placeholder="Email" />
          <textarea name="message" required value={form.message} onChange={update} placeholder="Message" />
          <button className="btn primary" type="submit">Send Message</button>
        </form>
      </section>
      <aside className="contact-panel">
        <article><MapPin size={22} /><strong>Address</strong><span>18 Amber Lane, Mumbai</span></article>
        <article><Clock size={22} /><strong>Opening hours</strong><span>10:00 AM - 11:30 PM</span></article>
        <article><Phone size={22} /><strong>Phone</strong><span>+91 98765 43210</span></article>
        <article><Mail size={22} /><strong>Email</strong><span>hello@ambrosiaeats.com</span></article>
        <div className="map-placeholder">Ambrosia Eats map preview</div>
      </aside>
    </main>
  )
}
