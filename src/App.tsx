import { BrowserRouter, Route, Routes } from "react-router";
import Products from "./components/products/Products";
import Layout from "./Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Products />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
