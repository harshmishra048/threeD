import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import About from '../pages/About'
import AdminDashboard from '../pages/AdminDashboard'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import Dashboard from '../pages/Dashboard'
import FoodDetails from '../pages/FoodDetails'
import Gallery from '../pages/Gallery'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Menu from '../pages/Menu'
import OrderSuccess from '../pages/OrderSuccess'
import Orders from '../pages/Orders'
import Register from '../pages/Register'
import Tracking from '../pages/Tracking'
import Wishlist from '../pages/Wishlist'

const page = (children) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
    {children}
  </motion.div>
)

export default function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/menu" element={page(<Menu />)} />
        <Route path="/menu/:id" element={page(<FoodDetails />)} />
        <Route path="/cart" element={page(<Cart />)} />
        <Route path="/checkout" element={page(<ProtectedRoute><Checkout /></ProtectedRoute>)} />
        <Route path="/order-success/:orderId" element={page(<OrderSuccess />)} />
        <Route path="/orders" element={page(<ProtectedRoute><Orders /></ProtectedRoute>)} />
        <Route path="/tracking/:orderId" element={page(<ProtectedRoute><Tracking /></ProtectedRoute>)} />
        <Route path="/login" element={page(<Login />)} />
        <Route path="/register" element={page(<Register />)} />
        <Route path="/dashboard" element={page(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
        <Route path="/about" element={page(<About />)} />
        <Route path="/contact" element={page(<Contact />)} />
        <Route path="/wishlist" element={page(<Wishlist />)} />
        <Route path="/gallery" element={page(<Gallery />)} />
        <Route path="/admin" element={page(<ProtectedRoute><AdminDashboard /></ProtectedRoute>)} />
      </Routes>
    </AnimatePresence>
  )
}
