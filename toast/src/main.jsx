import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { resetHooks } from "./components/ToastComponent.jsx";

const root = createRoot(document.getElementById("root"));
export const renderApp = () => {
  resetHooks();
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

renderApp();
