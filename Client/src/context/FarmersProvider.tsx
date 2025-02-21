import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";

export interface Product {
  title: string;
  category: string;
  price: number;
  unit: string;
  image: string;
}

export interface Farmer {
  _id?: string;
  username: string;
  latitude?: number;
  longitude?: number;
  municipality: string;
  place: string;
  products: Product[];
}

// Define shape of our context
interface FarmersContextProps {
  farmers: Farmer[];
  filteredFarmers: Farmer[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedMunicipality: string;
  setSelectedMunicipality: (m: string) => void;
  selectedPlace: string;
  setSelectedPlace: (p: string) => void;
}

// Create the actual context
const FarmersContext = createContext<FarmersContextProps>({
  farmers: [],
  filteredFarmers: [],
  searchTerm: "",
  setSearchTerm: () => {},
  selectedCategory: "all",
  setSelectedCategory: () => {},
  selectedMunicipality: "",
  setSelectedMunicipality: () => {},
  selectedPlace: "",
  setSelectedPlace: () => {},
});

export function FarmersProvider({ children }: { children: ReactNode }) {
  // 1) All farmers from server
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  // 2) Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  // 3) Fetch farmers from server once
  useEffect(() => {
    async function fetchFarmers() {
      try {
        // If your backend uses the searchTerm in the URL, do so.
        // Otherwise, just fetch all farmers:
        const res = await fetch(`http://localhost:5050/farmer/`);
        if (!res.ok) throw new Error("Failed to fetch farmers");
        const data: Farmer[] = await res.json();
        setFarmers(data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    }
    fetchFarmers();
  }, []);

  // 4) filteredFarmers: computed via useMemo
  const filteredFarmers = useMemo(() => {
    return farmers.filter((farmer) => {
      // Skip if lat/long missing => optional
      if (farmer.latitude === undefined || farmer.longitude === undefined) {
        return false;
      }

      // Filter by searchTerm + category
      const productMatch = farmer.products.some((prod) => {
        const inSearch = prod.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const inCategory =
          selectedCategory === "all" ||
          prod.category.toLowerCase() === selectedCategory.toLowerCase();
        return inSearch && inCategory;
      });

      // Filter by municipality / place
      const inMunicipality =
        !selectedMunicipality || farmer.municipality === selectedMunicipality;
      const inPlace = !selectedPlace || farmer.place === selectedPlace;

      return productMatch && inMunicipality && inPlace;
    });
  }, [
    farmers,
    searchTerm,
    selectedCategory,
    selectedMunicipality,
    selectedPlace,
  ]);

  // 5) Provide everything
  const value: FarmersContextProps = {
    farmers,
    filteredFarmers,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedMunicipality,
    setSelectedMunicipality,
    selectedPlace,
    setSelectedPlace,
  };

  return (
    <FarmersContext.Provider value={value}>{children}</FarmersContext.Provider>
  );
}

export function useFarmers() {
  return useContext(FarmersContext);
}
