import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CreditCard, Loader2, ShieldCheck, Lock, CheckCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { createPayment, getOrder } from '../services/api'

const Payment = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    if (!orderId) {
      navigate('/orders')
      return
    }

    fetchOrder()
  }, [user, orderId, navigate])

  const fetchOrder = async () => {
    try {
      const data = await getOrder(orderId)
      setOrder(data)
    } catch (error) {
      toast.error('Failed to load order details')
      navigate('/orders')
    } finally {
      setLoading(false)
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!orderId) return

    setProcessing(true)

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        toast.error('Failed to load Razorpay SDK. Please try again.')
        setProcessing(false)
        return
      }

      // Create payment order
      const paymentData = await createPayment(orderId)

      const options = {
        key: 'rzp_test_S6559zCerrUAAq', // Your Razorpay key from application.yaml
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'ShopHub',
        description: `Order #${orderId.substring(0, 8)}`,
        order_id: paymentData.razorpayOrderId,
        handler: function (response) {
          // Payment successful
          toast.success('Payment successful! 🎉')
          setTimeout(() => {
            navigate('/orders')
          }, 2000)
        },
        prefill: {
          name: user.username,
          email: user.email,
        },
        theme: {
          color: '#0ea5e9',
        },
        modal: {
          ondismiss: function () {
            setProcessing(false)
            toast.warning('Payment cancelled')
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process payment')
      setProcessing(false)
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto text-primary-600" size={48} />
          <p className="text-gray-600 text-lg">Loading payment details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <CreditCard className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-6">Unable to find the order for payment</p>
        <button onClick={() => navigate('/orders')} className="btn-primary">
          View Orders
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Complete Payment</h1>
        <p className="text-gray-600">Secure payment powered by Razorpay</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Details Card */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              <span className="text-sm text-gray-600">Order #{order.id.substring(0, 8)}</span>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-xl font-bold text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-primary-600">
                ₹{order.totalAmount?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <ShieldCheck className="text-green-600 mx-auto mb-2" size={32} />
              <p className="text-sm font-semibold text-gray-700">Secure Payment</p>
            </div>
            <div className="card p-4 text-center">
              <Lock className="text-blue-600 mx-auto mb-2" size={32} />
              <p className="text-sm font-semibold text-gray-700">SSL Encrypted</p>
            </div>
            <div className="card p-4 text-center">
              <CheckCircle className="text-purple-600 mx-auto mb-2" size={32} />
              <p className="text-sm font-semibold text-gray-700">PCI Compliant</p>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24 space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-4 rounded-full w-20 h-20 mx-auto mb-4">
                <CreditCard className="text-primary-600 mx-auto mt-2" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Gateway</h3>
              <p className="text-sm text-gray-600">Powered by Razorpay</p>
            </div>

            <div className="space-y-3 py-4 border-y border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Order Total</span>
                <span className="font-semibold">₹{order.totalAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Processing Fee</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Amount to Pay</span>
              <span className="text-2xl text-primary-600">₹{order.totalAmount?.toLocaleString()}</span>
            </div>

            <button
              onClick={handlePayment}
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
                  Pay Now
                </span>
              )}
            </button>

            <div className="space-y-2 text-xs text-gray-500 text-center">
              <p>✓ 100% Secure & Safe Payments</p>
              <p>✓ Multiple Payment Options</p>
              <p>✓ UPI, Cards, Netbanking & More</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accepted Payment Methods */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Accepted Payment Methods</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-gray-50 px-6 py-3 rounded-lg font-semibold text-gray-700">💳 Credit Card</div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg font-semibold text-gray-700">💳 Debit Card</div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg font-semibold text-gray-700">📱 UPI</div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg font-semibold text-gray-700">🏦 Net Banking</div>
          <div className="bg-gray-50 px-6 py-3 rounded-lg font-semibold text-gray-700">💰 Wallets</div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/orders')}
          className="text-gray-600 hover:text-gray-900 font-semibold"
        >
          ← Back to Orders
        </button>
      </div>
    </div>
  )
}

export default Payment
