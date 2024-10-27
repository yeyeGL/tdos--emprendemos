/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import { Plus } from "lucide-react";

const CreateProductForm = ({ handleCreateProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" justify-center">
      <button onClick={openModal} className="buttons-profile"><Plus className="h-5 w-5 mr-2" />Crear Producto</button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Crear Nuevo Producto">
        <form onSubmit={handleCreateProduct}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-green-700">Titulo</label>
            <input id="title" type="text" placeholder="Titulo del producto" className="border border-green-400 p-2 w-full rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-green-700">Descripcion</label>
            <textarea id="description" placeholder="Descripcion del producto" className="border border-green-400 p-2 w-full rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-green-700">Precio</label>
            <input id="price" type="number" placeholder="Precio" className="border border-green-400 p-2 w-full rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-green-700">Categoria</label>
            <select id="category" className="border border-green-400 p-2 w-full rounded" required>
              <option value="">Selecciona una categoria</option>
              <option value="Producto">Producto</option>
              <option value="Comida">Comida</option>
              <option value="Servicio">Servicio</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-green-700">Imagen del Producto</label>
            <input id="image" type="file" accept="image/*" className="border border-green-400 p-2 w-full rounded" />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            Crear Producto
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateProductForm;
