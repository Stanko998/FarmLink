import { useState } from "react";
import "./Home.scss";

import SearchBar from "../components/Home/SearchBar/SearchBar";
import ProizvodCarousel from "../components/Home/ProizvodCarousel";

import productsData from "../components/Home/Proizvodi.json"; //TODO realizovati podatke preko baze podataka

function getfarmers(searchResults: any) {
  if (searchResults.length === 0) {
    return productsData;
  }

  const farmers = productsData.filter((farmer) =>
    farmer.products.some((product) =>
      searchResults.some((searchResult: any) =>
        product.title.toLowerCase().includes(searchResult.title.toLowerCase())
      )
    )
  );

  return farmers;
}

export default function Home() {
  const [searchResults, setSearchResults] = useState<any>([]);
  const farmers = getfarmers(searchResults);

  return (
    <>
      <SearchBar onSearchResults={setSearchResults} />

      {farmers.map((farmer, index) => (
        <div className="farmer-products" key={index}>
          <h2 className="farmer-username">USERNAME: {farmer.username}</h2>
          <ProizvodCarousel products={farmer.products} />
        </div>
      ))}
    </>
  );
}
