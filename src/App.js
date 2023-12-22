import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import ProductAdd from "./Dashboard/Product/ProductAdd";
import Category from "./Dashboard/Category/CategoryAdd";
import ProductPage from "./Dashboard/Product/ProductPage";

function App() {
  return (
    <div>
      <h1 className="text-danger">Hello Al Amin</h1>

      <Routes>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<ProductPage></ProductPage>}></Route>
          <Route path="product-add" element={<ProductAdd></ProductAdd>}></Route>
          <Route path="category" element={<Category></Category>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
