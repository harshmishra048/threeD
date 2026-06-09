import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const { register } = useAuth()
  const navigate = useNavigate()

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (form.password !== form.confirm) return toast.error('Passwords do not match')
    if (register(form)) navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      <section className="auth-art register-art">
        <span className="eyebrow">Join Ambrosia</span>
        <h1>Make every order feel remembered.</h1>
        <p>Create a local demo account for saved orders, favorites, addresses, and reward points.</p>
      </section>
      <form className="auth-form" onSubmit={submit}>
        <h2>Create account</h2>
        <input name="name" required value={form.name} onChange={update} placeholder="Full name" />
        <input name="email" type="email" required value={form.email} onChange={update} placeholder="Email" />
        <input name="phone" required value={form.phone} onChange={update} placeholder="Phone" />
        <input name="password" type="password" required value={form.password} onChange={update} placeholder="Password" />
        <input name="confirm" type="password" required value={form.confirm} onChange={update} placeholder="Confirm password" />
        <button className="btn primary full" type="submit">Create account</button>
        <p>Already a member? <Link to="/login">Login</Link></p>
      </form>
    </main>
  )
}
