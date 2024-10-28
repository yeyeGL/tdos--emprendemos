import { useState, useEffect } from "react";
import CreateProductForm from "../components/profile/CreateProductForm";
import EditProductForm from "../components/profile/EditProductForm";
import ProductCard from "../components/profile/ProductCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import axios from "axios";
import { Products_Mockeados } from "../constants/const";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const redirect = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${updatedProduct.id}`, updatedProduct);
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handlePublish = (product) => {

    const imageUrl = `http://localhost:3000/${product.image_url.replace(/\\/g, '/')}`;
  
    const newProduct = {
      id: Products_Mockeados.length + 1,
      category: product.category,
      name: product.title,
      description: product.description,
      price: product.price,
      rating: 0,
      comments: 0,
      likes: 0,
      image: imageUrl, 
    };
    
    Products_Mockeados.push(newProduct);
    redirect("/home")
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <ProfileHeader />
      <div className="flex justify-start mb-4">
        <CreateProductForm handleCreateProduct={handleCreateProduct} />
      </div>
      <div className="mb-4">
        {editingProduct ? (
          <EditProductForm
            editingProduct={editingProduct}
            handleUpdate={handleUpdate}
            setEditingProduct={setEditingProduct}
          />
        ) : null}
      </div>

      <h2 className="text-4xl font-semibold mb-4 animate-flip-down animate-duration-[3000ms] animate-delay-[3000ms]">Productos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handlePublish={handlePublish} 
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
