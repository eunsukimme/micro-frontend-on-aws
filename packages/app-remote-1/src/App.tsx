import React from "react";
import ProductDetail from "./components/ProductDetail";
import "./styles/main.css";

interface AppProps {
  productId: number;
}

const App = ({ productId }: AppProps) => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <ProductDetail id={productId} />
    </div>
  );
};

export default App;
