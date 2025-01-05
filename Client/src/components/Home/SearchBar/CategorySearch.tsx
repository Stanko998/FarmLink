import React from "react";
import "./CategorySearch.scss";

const CategorySearch = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: "all", label: "All" },
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "milky", label: "Milky" },
    { value: "meats", label: "Meats" },
    { value: "processed", label: "Processed" },
  ];

  return (
    <select
      className="category-dropdown"
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

export default CategorySearch;
