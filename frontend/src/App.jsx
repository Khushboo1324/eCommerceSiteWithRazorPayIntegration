import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from './context/UserContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Payment from './pages/Payment'
import AdminProducts from './pages/AdminProducts'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
