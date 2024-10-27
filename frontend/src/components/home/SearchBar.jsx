/* eslint-disable react/prop-types */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="mb-8 animate-fade-down animate-duration-[3000ms] animate-delay-[3000ms]">
        <input
          type="text"
          placeholder="Buscar productos, servicios o comidas..."
          className="w-full px-4 py-2 rounded-full border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };
  
  export default SearchBar;
  