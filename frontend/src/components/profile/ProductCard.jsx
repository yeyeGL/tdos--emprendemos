/* eslint-disable react/prop-types */
import { Edit, Trash } from 'lucide-react'

const ProductCard = ({ product, handleEdit, handleDelete }) => {
  return (
    <div className="bg-green-200 shadow-xl rounded p-4">
      {product.image && (
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded mb-4" />
      )}
      <h3 className="text-xl font-bold text-black">{product.title}</h3>
      <p className="text-green-800">{product.description}</p>
      <p className="text-green-800 font-bold">${product.price}</p>
      <p className="text-green-800">{product.category}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center">
          <Edit className="w-4 h-4 mr-1" /> Editar
        </button>
        <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
          <Trash className="w-4 h-4 mr-1" /> Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProductCard
