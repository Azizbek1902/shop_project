import { Route, Routes } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import Product from "./views/Product";
import Batafsil from "./views/Batafsil";
import Karzinka from "./views/Karzinka";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/dashboard" element={<Router />} />
        <Route path="/batafsil" element={<Batafsil />} />
        <Route path="/corzinka" element={<Karzinka />} />
      </Routes>
    </div>
  );
}

export default App;
