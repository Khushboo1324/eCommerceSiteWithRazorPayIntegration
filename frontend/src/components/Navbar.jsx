import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, ShoppingCart, Package, User, LogOut, Home } from 'lucide-react'
import { useUser } from '../context/UserContext'

const Navbar = () => {
  const location = useLocation()
  const { user, logout } = useUser()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/products"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/products') 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag size={20} />
              <span className="font-medium">Products</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/cart"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive('/cart') 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span className="font-medium">Cart</span>
                </Link>

                <Link
                  to="/orders"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive('/orders') 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package size={20} />
                  <span className="font-medium">Orders</span>
                </Link>

                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin/products"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive('/admin/products') 
                        ? 'bg-primary-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Package size={20} />
                    <span className="font-medium">Manage</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <User size={20} className="text-gray-700" />
                  <span className="font-medium text-gray-700">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                Please login from Home page
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
