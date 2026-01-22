import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Plus, Loader2, Edit } from 'lucide-react'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { getAllProducts, createProduct } from '../services/api'

const AdminProducts = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/products')
      return
    }
    fetchProducts()
  }, [user, navigate])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      }
      
      const newProduct = await createProduct(productData)
      setProducts([...products, newProduct])
      setFormData({ name: '', price: '', stock: '' })
      setShowAddForm(false)
      toast.success('Product added successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto text-primary-600" size={48} />
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-2">{products.length} total products</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{showAddForm ? 'Cancel' : 'Add Product'}</span>
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="input-field"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                min="0"
                className="input-field"
                placeholder="Enter stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Adding Product...
                  </span>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Price</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                        <Package className="text-primary-600" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price?.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{product.stock} units</span>
                  </td>
                  <td className="px-6 py-4">
                    {product.stock > 10 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        In Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1 mx-auto">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
