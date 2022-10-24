import React from "react";
import ProductDetail from "./components/ProductDetail";
import "./styles/main.css";

interface AppProps {
  productId: number;
}

const App = ({ productId }: AppProps) => {
  return (
    <div>
      <ProductDetail id={productId} />
    </div>
  );
};

export default App;
