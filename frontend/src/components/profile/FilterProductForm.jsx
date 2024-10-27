/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './Modal';
import { Filter } from 'lucide-react'; 

const FilterProductForm = ({ handleFilter, filter, setFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=' justify-center'>
      
      <button onClick={openModal} className="buttons-profile" ><Filter className="h-5 w-5 mr-2" /> 
      Filtrar Productos
    </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Filtrar Productos">
        <form onSubmit={handleFilter}>
          <div className="mb-4">
            <label htmlFor="filterCategory" className="block text-green-700">Categoria</label>
            <select
              id="filterCategory"
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="border border-green-400 p-2 w-full rounded"
            >
              <option value="">Selecciona una categoria</option>
              <option value="Producto">Producto</option>
              <option value="Comida">Comida</option>
              <option value="Servicio">Servicio</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="filterPrice" className="block text-green-700">Precio Maximo</label>
            <input
              id="filterPrice"
              type="number"
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
              className="border border-green-400 p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            Aplicar Filtro
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default FilterProductForm;
