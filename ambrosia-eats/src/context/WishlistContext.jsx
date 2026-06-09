/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { readStorage, writeStorage } from '../utils/localStorage'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readStorage('wishlist', []))

  const persistWishlist = (nextWishlist) => {
    setWishlist(nextWishlist)
    writeStorage('wishlist', nextWishlist)
  }

  const isFavorite = (id) => wishlist.some((item) => item.id === id)

  const toggleWishlist = (food) => {
    if (isFavorite(food.id)) {
      persistWishlist(wishlist.filter((item) => item.id !== food.id))
      toast.success('Removed from wishlist')
      return
    }
    persistWishlist([...wishlist, food])
    toast.success('Saved to wishlist')
  }

  const removeFromWishlist = (id) => persistWishlist(wishlist.filter((item) => item.id !== id))

  const value = { wishlist, isFavorite, toggleWishlist, removeFromWishlist }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
