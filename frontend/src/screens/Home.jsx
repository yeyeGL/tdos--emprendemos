import { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/home/SearchBar';
import ItemCard from '../components/home/ItemCard';
import {Products_Mockeados} from "../constants/const";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = Products_Mockeados.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 animate-fade-down animate-duration-[2000ms] animate-delay-[2000ms]">Productos disponibles</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
