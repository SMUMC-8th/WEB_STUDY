import { StrictMode } from "react"; // React의 StrictMode 컴포넌트 import
import { createRoot } from "react-dom/client";
import App from "./App.tsx"; //  App 컴포넌트 import

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
