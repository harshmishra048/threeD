/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { readStorage, writeStorage } from '../utils/localStorage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('cart', []))

  const persistCart = (nextCart) => {
    setCart(nextCart)
    writeStorage('cart', nextCart)
  }

  const addToCart = (food, quantity = 1) => {
    const nextCart = cart.some((item) => item.id === food.id)
      ? cart.map((item) => (item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item))
      : [...cart, { ...food, quantity }]
    persistCart(nextCart)
    toast.success(`${food.name} added to cart`)
  }

  const updateQuantity = (id, quantity) => {
    const nextCart = cart
      .map((item) => (item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item))
      .filter((item) => item.quantity > 0)
    persistCart(nextCart)
  }

  const removeFromCart = (id) => {
    persistCart(cart.filter((item) => item.id !== id))
    toast.success('Item removed')
  }

  const clearCart = () => persistCart([])

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  const value = { cart, cartCount, addToCart, updateQuantity, removeFromCart, clearCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
