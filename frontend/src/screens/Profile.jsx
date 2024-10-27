import { useState } from "react";
import CreateProductForm from "../components/profile/CreateProductForm";
import EditProductForm from "../components/profile/EditProductForm";
import FilterProductForm from "../components/profile/FilterProductForm";
import ProductCard from "../components/profile/ProductCard";
import ProfileHeader from "../components/profile/ProfileHeader";

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ category: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title: e.target.title.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
      category: e.target.category.value,
      image: URL.createObjectURL(e.target.image.files[0]),
    };
    setProducts([...products, newProduct]);
    setFilteredProducts([...products, newProduct]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(
      updatedProducts.filter(
        (product) =>
          (filter.category ? product.category === filter.category : true) &&
          (filter.price ? product.price <= filter.price : true)
      )
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editingProduct,
      title: e.target.title.value,
      description: e.target.description.value,
      price: parseFloat(e.target.price.value),
      category: e.target.category.value,
    };
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filtered = products.filter(
      (product) =>
        (filter.category ? product.category === filter.category : true) &&
        (filter.price ? product.price <= filter.price : true)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <ProfileHeader />
      <div className="flex justify-start">
        <div className="mb-4">
          <CreateProductForm handleCreateProduct={handleCreateProduct} />
        </div>

        <div className="mb-4">
          {editingProduct ? (
            <EditProductForm
              editingProduct={editingProduct}
              handleUpdate={handleUpdate}
            />
          ) : (
            <FilterProductForm
              handleFilter={handleFilter}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>

      <h2 className="text-4xl font-semibold  mb-4 animate-fade-down animate-duration-[3000ms] animate-delay-[3000ms]">Productos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(filteredProducts.length > 0 ? filteredProducts : products).map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              className="transition-transform duration-300 transform hover:scale-105"
            />
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
