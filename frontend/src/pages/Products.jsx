import { useState, useEffect } from 'react'
import { ShoppingCart, Package, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { getAllProducts, addToCart } from '../services/api'

const Products = () => {
  const { user } = useUser()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState({})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.warning('Please login first')
      return
    }

    setAddingToCart(prev => ({ ...prev, [productId]: true }))

    try {
      await addToCart({
        userId: user.id,
        productId: productId,
        quantity: 1
      })
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto text-primary-600" size={48} />
          <p className="text-gray-600 text-lg">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Products Available</h2>
        <p className="text-gray-600">Check back soon for new items!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          Our Products
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of premium products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="card group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            {/* Product Image Placeholder */}
            <div className="h-56 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 group-hover:from-primary-500/30 group-hover:to-primary-700/30 transition-all duration-300"></div>
              <Package className="text-primary-600 group-hover:scale-110 transition-transform duration-300" size={80} />
              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Only {product.stock} left!
                </div>
              )}
              {product.stock === 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={!user || product.stock === 0 || addingToCart[product.id]}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {addingToCart[product.id] ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
