import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ProductAdd from "./Dashboard/ProductAdd";

function App() {
  return (
    <div>
      <h1 className="text-danger">Hello Al Amin</h1>

      <Routes>
        {/* <Route path="/" element={<Dashboard></Dashboard>}></Route> */}

        <Route path="/side-navbar" element={<Dashboard></Dashboard>}>
          {/* <Route index element={<Dashboard></Dashboard>}></Route> */}
          <Route path="product-add" element={<ProductAdd></ProductAdd>}></Route>
          {/* <Route path="support" element={<Support></Support>}></Route>
          <Route path="product-page" element={<ProductManage />}></Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
