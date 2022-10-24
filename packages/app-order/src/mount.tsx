import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

export const mountappOrder = () => {
  const id = "app-order";
  const rootContainer =
    document.getElementById(id) ||
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id })
    );

  const root = createRoot(rootContainer);
  root.render(
    <StrictMode>
      <App productId={2} />
    </StrictMode>
  );
};
