import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Header />
      <div id="page">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default App;
