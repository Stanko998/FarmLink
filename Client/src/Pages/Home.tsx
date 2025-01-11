import { useState, useEffect } from "react";
import "../assets/Style/pages/Home.scss";

import SearchBar from "../components/Home/SearchBar/SearchBar";
import Farmer from "../components/Home/Farmer/Farmer";

//DONE Realizovano uzimanje podataka iz baze podataka

export default function Home() {
  const [searchResults, setSearchResults] = useState("");
  const [records, setRecords] = useState<any>([]);

  async function getRecords() {
    const res = await fetch("http://localhost:5050/farmer/" + searchResults);
    if (!res.ok) {
      const message = "An error ";
      console.log(message);
      return;
    }
    const records = await res.json();
    setRecords(records);
  }

  useEffect(() => {
    getRecords();
    return;
  }, [searchResults.length]);

  return (
    <>
      <SearchBar onSearchResults={setSearchResults} />

      <div className="page">
        <h1>Svi Farmeri</h1>
        <div className="Farmers">
          {records.map((record: any) => {
            return <Farmer record={record} key={record._id} />;
          })}
        </div>
      </div>
    </>
  );
}
