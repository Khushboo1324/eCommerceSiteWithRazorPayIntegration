import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, Package, Loader2, CreditCard } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { getCart, clearCart, createOrder } from '../services/api'

const Cart = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (user) {
      fetchCart()
    }
  }, [user])

  const fetchCart = async () => {
    try {
      const data = await getCart(user.id)
      setCartItems(data)
    } catch (error) {
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) {
      return
    }

    try {
      await clearCart(user.id)
      setCartItems([])
      toast.success('Cart cleared!')
    } catch (error) {
      toast.error('Failed to clear cart')
    }
  }

  const handleCheckout = async () => {
    setProcessing(true)
    try {
      const order = await createOrder(user.id)
      toast.success('Order created! Redirecting to payment...')
      setCartItems([])
      // Redirect to payment page with order ID
      navigate(`/payment?orderId=${order.id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setProcessing(false)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0
      return total + (price * item.quantity)
    }, 0)
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Please Login</h2>
        <p className="text-gray-600 mb-6">You need to login to view your cart</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go to Home
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto text-primary-600" size={48} />
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started!</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </div>
        <button
          onClick={handleClearCart}
          className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
        >
          <Trash2 size={20} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="card p-6">
              <div className="flex items-center space-x-6">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="text-primary-600" size={40} />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.product?.name || 'Product'}
                  </h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>Quantity: {item.quantity}</span>
                    <span>•</span>
                    <span className="text-primary-600 font-semibold">
                      ₹{(item.product?.price || 0).toLocaleString()} each
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>

            <div className="space-y-3 py-4 border-y border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span className="text-primary-600">₹{calculateTotal().toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <CreditCard className="mr-2" size={20} />
                  Proceed to Checkout
                </span>
              )}
            </button>

            <div className="text-center text-sm text-gray-600">
              <p>🔒 Secure checkout powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
