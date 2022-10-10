import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

export const mountAppRemote1 = () => {
  const id = "root";
  const rootContainer =
    document.getElementById(id) ||
    document.body.appendChild(
      Object.assign(document.createElement("div"), { id })
    );

  const root = createRoot(rootContainer);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};
