import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Sparkles, TrendingUp, Shield } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { createUser } from '../services/api'

const Home = () => {
  const navigate = useNavigate()
  const { user, login } = useUser()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'USER'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userData = await createUser(formData)
      login(userData)
      toast.success(`Welcome, ${userData.username}!`)
      navigate('/products')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Welcome Back, {user.username}!
            </h1>
            <p className="text-2xl text-gray-600">
              Ready to discover amazing products?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="btn-primary px-8 py-4 text-lg flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={24} />
              <span>Browse Products</span>
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="btn-secondary px-8 py-4 text-lg"
            >
              View My Orders
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Curated selection of top-tier products</p>
            </div>
            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing on all items</p>
            </div>
            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Safe and secure payment processing</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Modern E-Commerce Platform
              </span>
            </div>
            <h1 className="text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Shop Smart,
              </span>
              <br />
              <span className="text-gray-900">Live Better</span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover a world of amazing products at unbeatable prices. 
              Join thousands of happy customers today!
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="text-green-600" size={20} />
                </div>
                <span className="text-gray-700">Secure Payment Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <TrendingUp className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-700">Best Price Guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Sparkles className="text-purple-600" size={20} />
                </div>
                <span className="text-gray-700">Premium Quality Products</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="card p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Get Started</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  className="input-field"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="USER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account & Start Shopping'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
