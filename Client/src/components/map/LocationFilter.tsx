import React, { useState, useEffect } from "react";
import { Farmer } from "../../Pages/Maps"; // Or a shared interface file

interface LocationFilterProps {
  farmers: Farmer[];
  selectedMunicipality: string;
  setSelectedMunicipality: (value: string) => void;
  selectedPlace: string;
  setSelectedPlace: (value: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({
  farmers,
  selectedMunicipality,
  setSelectedMunicipality,
  selectedPlace,
  setSelectedPlace,
}) => {
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const [places, setPlaces] = useState<string[]>([]);

  useEffect(() => {
    const unique = Array.from(
      new Set(farmers.map((f) => f.municipality))
    ).filter(Boolean);
    setMunicipalities(unique);
  }, [farmers]);

  useEffect(() => {
    if (!selectedMunicipality) {
      setPlaces([]);
      return;
    }
    const list = farmers
      .filter((f) => f.municipality === selectedMunicipality)
      .map((f) => f.place);
    setPlaces(Array.from(new Set(list)).filter(Boolean));
  }, [selectedMunicipality, farmers]);

  return (
    <>
      {/* Municipality */}
      <select
        value={selectedMunicipality}
        onChange={(e) => {
          setSelectedMunicipality(e.target.value);
          setSelectedPlace("");
        }}
      >
        <option value="">Select Municipality</option>
        {municipalities.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Place */}
      {places.length > 0 && (
        <select
          value={selectedPlace}
          onChange={(e) => setSelectedPlace(e.target.value)}
        >
          <option value="">Select Place</option>
          {places.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default LocationFilter;
