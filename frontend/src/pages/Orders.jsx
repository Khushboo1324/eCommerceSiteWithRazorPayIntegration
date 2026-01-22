import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Loader2, Calendar, CreditCard, ShoppingBag, ExternalLink } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { getOrdersByUser } from '../services/api'

const Orders = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const data = await getOrdersByUser(user.id)
      setOrders(data)
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      PROCESSING: 'bg-blue-100 text-blue-800 border-blue-300',
      COMPLETED: 'bg-green-100 text-green-800 border-green-300',
      CANCELLED: 'bg-red-100 text-red-800 border-red-300'
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <Package className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Please Login</h2>
        <p className="text-gray-600 mb-6">You need to login to view your orders</p>
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
          <p className="text-gray-600 text-lg">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">{orders.length} total orders</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="card p-6 space-y-6">
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <ShoppingBag className="text-primary-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono font-semibold text-gray-900">{order.id}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-500" />
                    <p className="font-semibold text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Order Items:</h3>
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                      <Package className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{item.price?.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">per item</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total and Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <CreditCard size={20} />
                  <span className="font-semibold">Total Amount</span>
                </div>
                <span className="text-3xl font-bold text-primary-600">
                  ₹{order.totalAmount?.toLocaleString()}
                </span>
              </div>

              {/* Pay Now Button for Pending Orders */}
              {order.status === 'PENDING' && (
                <button
                  onClick={() => navigate(`/payment?orderId=${order.id}`)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Pay Now</span>
                  <ExternalLink size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
