/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './Modal';

const EditProductForm = ({ editingProduct, handleUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(true); 

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Editar Producto">
      <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-green-700">Titulo</label>
          <input id="title" type="text" defaultValue={editingProduct.title} className="border border-green-400 p-2 w-full rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-green-700">Descripcion</label>
          <textarea id="description" defaultValue={editingProduct.description} className="border border-green-400 p-2 w-full rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-green-700">Precio</label>
          <input id="price" type="number" defaultValue={editingProduct.price} className="border border-green-400 p-2 w-full rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-green-700">Categoria</label>
          <select id="category" defaultValue={editingProduct.category} className="border border-green-400 p-2 w-full rounded" required>
            <option value="Producto">Producto</option>
            <option value="Comida">Comida</option>
            <option value="Servicio">Servicio</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Actualizar Producto</button>
      </form>
    </Modal>
  );
};

export default EditProductForm;
