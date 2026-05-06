import { BrowserRouter, Route, Routes } from "react-router";
import Products from "./components/products/Products";
import Layout from "./Layout";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Products />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
