import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login, demoLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const target = location.state?.from || '/dashboard'

  const submit = (event) => {
    event.preventDefault()
    if (login(form.email, form.password)) navigate(target)
  }

  const runDemo = () => {
    if (demoLogin()) navigate(target)
  }

  return (
    <main className="auth-page">
      <section className="auth-art">
        <span className="eyebrow">Welcome back</span>
        <h1>Step into your Ambrosia table.</h1>
        <p>Track orders, save favorites, and reorder chef recommendations in seconds.</p>
      </section>
      <form className="auth-form" onSubmit={submit}>
        <h2>Login</h2>
        <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
        <input type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" />
        <button className="btn primary full" type="submit">Login</button>
        <button className="btn ghost full" type="button" onClick={runDemo}>Use demo login</button>
        <p>New here? <Link to="/register">Create an account</Link></p>
      </form>
    </main>
  )
}
