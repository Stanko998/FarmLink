import React, { useState, useEffect, ChangeEvent } from "react";
// import "./FarmFilter.scss";
// import "../../header/Header.scss";
// import "../../header/search/CategorySearch.scss";
import LocationFilter from "./LocationFilter";
// If you have a PriceFilter component, import it here

import { Farmer } from "../../Pages/Maps"; // Import the Farmer interface from Maps.tsx (or a shared file)

const categories = [
  { value: "all", label: "All" },
  { value: "meats", label: "Meats" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "milky", label: "Milky" },
  { value: "processed", label: "Processed" },
];

interface FarmFilterProps {
  farmers: Farmer[];
  onFilterUpdate: (filteredFarmers: Farmer[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedMunicipality: string;
  setSelectedMunicipality: (municipality: string) => void;
  selectedPlace: string;
  setSelectedPlace: (place: string) => void;
}

const FarmFilter: React.FC<FarmFilterProps> = ({
  farmers,
  onFilterUpdate,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  selectedMunicipality,
  setSelectedMunicipality,
  selectedPlace,
  setSelectedPlace,
}) => {
  const filterFarmers = () => {
    const filtered = farmers.filter((farmer) => {
      const productMatch = farmer.products.some((prod) => {
        const inSearch = prod.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const inCategory =
          selectedCategory === "all" ||
          prod.category.toLowerCase() === selectedCategory.toLowerCase();
        return inSearch && inCategory;
      });
      const inMunicipality =
        !selectedMunicipality || farmer.municipality === selectedMunicipality;
      const inPlace = !selectedPlace || farmer.place === selectedPlace;
      return productMatch && inMunicipality && inPlace;
    });
    onFilterUpdate(filtered);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <div>
        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Location (Municipality, Place) */}
        <LocationFilter
          farmers={farmers}
          selectedMunicipality={selectedMunicipality}
          setSelectedMunicipality={setSelectedMunicipality}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />

        {/* Run filter */}
        <button onClick={filterFarmers}>Search</button>
      </div>

      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default FarmFilter;
