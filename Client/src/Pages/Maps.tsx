import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import FarmFilter from "../components/map/FarmFilter";
import PopupContent from "../components/map/PopupContent";

// Shape of a product
export interface Product {
  title: string;
  category: string;
  price: number;
  unit: string;
  image: string;
}

// Shape of a farmer
export interface Farmer {
  _id?: string;
  username: string;
  latitude?: number; // optional if missing in DB
  longitude?: number; // optional if missing in DB
  municipality: string;
  place: string;
  products: Product[];
}

// Default Leaflet icon setup
const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Maps: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [visibleFarmers, setVisibleFarmers] = useState<Farmer[]>([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  // Fetch from your server, using try/catch
  const getFarmers = async () => {
    try {
      // If your backend supports searchTerm in the URL:
      const res = await fetch(`http://localhost:5050/farmer/${searchTerm}`);
      if (!res.ok) throw new Error("Failed to fetch farmers data");

      const data: Farmer[] = await res.json();

      // Filter out those with missing coordinates
      const validFarmers = data.filter(
        (f) => f.latitude !== undefined && f.longitude !== undefined
      );

      // Update states
      setFarmers(validFarmers);
      setVisibleFarmers(validFarmers);
    } catch (err) {
      console.error("Error fetching farmers:", err);
    }
  };

  // Fetch on mount or whenever the searchTerm length changes
  useEffect(() => {
    getFarmers();
  }, [searchTerm.length]);

  // Handle updated filtered list from FarmFilter
  const handleFilterUpdate = (filtered: Farmer[]) => {
    setVisibleFarmers(filtered);
  };

  return (
    <>
      {/* Filter UI */}
      <FarmFilter
        farmers={farmers}
        onFilterUpdate={handleFilterUpdate}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedMunicipality={selectedMunicipality}
        setSelectedMunicipality={setSelectedMunicipality}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />

      {/* The actual Leaflet map */}
      <MapContainer
        center={[42.6218, 21.195]}
        zoom={10}
        style={{ height: 500 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Render markers only for farmers that have coordinates */}
        {visibleFarmers.map((farmer) => (
          <Marker
            key={farmer._id || farmer.username}
            position={[farmer.latitude!, farmer.longitude!]}
            icon={defaultIcon}
          >
            <Popup>
              <PopupContent farmer={farmer} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Maps;
