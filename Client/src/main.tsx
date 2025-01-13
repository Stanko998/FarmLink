import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/Style/global.scss";

import App from "./App.tsx";

import Home from "./Pages/Home.tsx";
import Maps from "./Pages/Maps.tsx";
import Profile from "./Pages/Profile.tsx";
import About from "./Pages/About.tsx";
import Card from "./Pages/Card.tsx";
import Registration from "./components/profile/Registration.tsx";
import Login from "./components/profile/Login.tsx";
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
      { path: "/Profile/login", element: <Login /> },
      { path: "/Profile/Registration", element: <Registration /> },
      { path: "/:username", element: <UserPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
