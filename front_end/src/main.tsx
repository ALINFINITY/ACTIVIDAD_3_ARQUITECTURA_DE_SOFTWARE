import { createRoot } from "react-dom/client";
import "primereact/resources/themes/lara-dark-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/index.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
