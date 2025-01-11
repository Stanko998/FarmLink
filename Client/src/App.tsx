import { Outlet } from "react-router-dom";
// import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer";
import "./App.css";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </>
  );
}
export default App;
