import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useFarmers } from "../context/FarmersProvider";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import "../assets/Style/pages/Maps.scss";
import PopupContent from "../components/map/PopupContent";

const defaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

const Maps: React.FC = () => {
  // Instead of local states, read from context
  const { filteredFarmers } = useFarmers();

  return (
    <MapContainer center={[42.6218, 21.195]} zoom={10} style={{ height: 500 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {filteredFarmers.map((farmer) => (
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
  );
};

export default Maps;
