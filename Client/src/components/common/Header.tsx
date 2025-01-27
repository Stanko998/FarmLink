// src/components/common/Header.tsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFarmers } from "../../context/FarmersProvider";
import SearchBar from "../Home/SearchBar/SearchBar";
import FarmFilter from "../map/FarmFilter";
// ^ Import your filter or any other special components you want on certain pages

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  // location.pathname will tell us which route the user is on, e.g. "/Maps", "/About", etc.

  //ovde ce da uzmemo podatke koji su nam potrebni da bi smo mogli da filtriramo korisnike

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedMunicipality,
    setSelectedMunicipality,
    selectedPlace,
    setSelectedPlace,
  } = useFarmers();

  const handleLogout = () => logout();

  // Decide what to render on the left side
  let leftContent: React.ReactNode = null;

  if (location.pathname === "/") {
    // If user is on Home route
    leftContent = <SearchBar onSearchResults={() => {}} />;
  } else if (location.pathname === "/Maps") {
    // If on Maps route
    // Optionally include the entire FarmFilter or only parts of it
    leftContent = (
      <div style={{ display: "flex", gap: "1rem" }}>
        <FarmFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedMunicipality={selectedMunicipality}
          setSelectedMunicipality={setSelectedMunicipality}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          farmers={[]}
          onFilterUpdate={function (filteredFarmers: Farmer[]): void {
            throw new Error("Function not implemented.");
          }}
        />
        {/* Could put a <LocationFilter /> or something here, or combined in FarmFilter */}
      </div>
    );
  } else if (location.pathname === "/About") {
    // If on About page, maybe no special content on the left
    leftContent = null;
  } else if (location.pathname.startsWith("/Profile")) {
    // If on Profile or some sub-route => maybe no left content
    leftContent = null;
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      {/* Left side: route-specific content */}
      <div>{leftContent}</div>

      {/* Right side: user info */}
      <div>
        {/* If user is logged in, show greeting + logout. Else show a login link. */}
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>Hello, {user.username}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/Profile/login">Login</NavLink>
        )}
      </div>
    </header>
  );
}
