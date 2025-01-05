import React, { useState } from "react";
import productsData from "../Proizvodi.json";
import "./SearchBar.scss";
import CategorySearch from "./CategorySearch";

interface SearchBarProps {
  onSearchResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term: string, category: string) => {
    if (term.trim() === "" && category === "all") {
      onSearchResults(productsData.flatMap((farmer) => farmer.products));
    } else {
      const filteredProducts = productsData.flatMap((farmer) =>
        farmer.products.filter(
          (product) =>
            (product.title.toLowerCase().includes(term.toLowerCase()) ||
              product.category.toLowerCase().includes(term.toLowerCase())) &&
            (category === "all" ||
              product.category.toLowerCase() === category.toLowerCase())
        )
      );
      onSearchResults(filteredProducts);
    }
  };

  return (
    <div className="search-container">
      <CategorySearch
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
