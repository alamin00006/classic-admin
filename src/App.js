import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ProductAdd from "./Dashboard/Product/ProductAdd";

import ProductPage from "./Dashboard/Product/ProductPage";
import Login from "./Pages/Login/Login";
import Navber from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#12856b",
        }}
      >
        <Navber />
      </div>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<ProductPage></ProductPage>}></Route>
          <Route path="product-add" element={<ProductAdd></ProductAdd>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
