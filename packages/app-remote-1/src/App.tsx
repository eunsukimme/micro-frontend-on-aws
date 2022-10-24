import React from "react";
import ProductDetail from "./components/ProductDetail";
import "./styles/main.css";

const App = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <ProductDetail id={2} />
    </div>
  );
};

export default App;
