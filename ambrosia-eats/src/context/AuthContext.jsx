/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { readStorage, removeStorage, writeStorage } from '../utils/localStorage'

const AuthContext = createContext(null)

const demoUser = {
  id: 'demo-user',
  name: 'Demo Diner',
  email: 'demo@ambrosia.com',
  phone: '9999999999',
  password: 'demo123',
  points: 1280,
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage('users', []))
  const [currentUser, setCurrentUser] = useState(() => readStorage('currentUser', null))

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers)
    writeStorage('users', nextUsers)
  }

  const login = (email, password) => {
    const user = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    )
    if (!user) {
      toast.error('Invalid email or password')
      return false
    }
    setCurrentUser(user)
    writeStorage('currentUser', user)
    toast.success(`Welcome back, ${user.name}`)
    return true
  }

  const demoLogin = () => {
    const existing = users.find((user) => user.email === demoUser.email)
    const user = existing || demoUser
    if (!existing) persistUsers([...users, demoUser])
    setCurrentUser(user)
    writeStorage('currentUser', user)
    toast.success('Demo account ready')
    return true
  }

  const register = (payload) => {
    const exists = users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase())
    if (exists) {
      toast.error('An account with this email already exists')
      return false
    }
    const user = {
      id: `USR${Date.now()}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      points: 250,
    }
    const nextUsers = [...users, user]
    persistUsers(nextUsers)
    setCurrentUser(user)
    writeStorage('currentUser', user)
    toast.success('Account created')
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    removeStorage('currentUser')
    toast.success('Logged out')
  }

  const value = { users, currentUser, isAuthenticated: Boolean(currentUser), login, demoLogin, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
