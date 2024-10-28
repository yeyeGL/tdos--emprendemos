/* eslint-disable react/prop-types */
import { Edit, Trash } from 'lucide-react';

const ProductCard = ({ product, handleEdit, handleDelete }) => {
 
  const imageUrl = `http://localhost:3000/${product.image_url.replace(/\\/g, '/')}`;

  return (
    <div className="bg-green-200 shadow-md rounded p-4">
      {product.image_url && (
        <img
          src={imageUrl} 
          alt={product.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-lg font-bold text-green-700">{product.title}</h3>
      <p className="text-green-600">{product.description}</p>
      <p className="text-green-800 font-bold">${product.price}</p>
      <p className="text-green-500">{product.category}</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => handleEdit(product)}
          className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
        >
          <Edit className="w-4 h-4 mr-1" /> Editar
        </button>
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
        >
          <Trash className="w-4 h-4 mr-1" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
