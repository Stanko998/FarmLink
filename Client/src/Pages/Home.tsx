import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../assets/Style/pages/Home.scss"; // We'll define .products-grid here

export default function Home() {
  const [searchResults, setSearchResults] = useState("");
  const [records, setRecords] = useState<any[]>([]);

  async function getRecords() {
    const res = await fetch("http://localhost:5050/farmer/" + searchResults);
    if (!res.ok) {
      console.log("An error occurred fetching data.");
      return;
    }
    const data = await res.json();
    setRecords(data);
  }

  useEffect(() => {
    getRecords();
    // We re-fetch whenever searchResults length changes
  }, [searchResults.length]);

  // Flatten each farmer into a list of products, each with a farmerUsername
  const allProducts = records.flatMap((farmer) => {
    return farmer.products.map((prod: any) => ({
      ...prod,
      farmerUsername: farmer.username,
    }));
  });

  return (
    <div className="main">
      <h1>All Products</h1>
      <div className="products-grid">
        {allProducts.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
