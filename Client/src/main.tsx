import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/Style/global.scss";

import App from "./App.tsx";

import About from "./Pages/About.tsx";
import Card from "./Pages/Card.tsx";
import Maps from "./Pages/Maps.tsx";
import Profile from "./Pages/Profile.tsx";
import Home from "./Pages/Home.tsx";
import Registration from "./components/profile/Registration.tsx";
import UserPage from "./Pages/UserPage.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Maps", element: <Maps /> },
      { path: "/About", element: <About /> },
      { path: "/Card", element: <Card /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/Registration", element: <Registration /> },
      { path: "/:username", element: <UserPage /> },
      //TODO: prepraviti rute da vode /profile/login i /profile/registration
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
