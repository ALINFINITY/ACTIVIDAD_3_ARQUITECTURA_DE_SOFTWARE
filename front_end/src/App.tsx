import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { MenuBar } from "./components/MenuBar";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import "./styles/App.css";

export const toastRef = { current: null as any };

export const App = () => {
  const toast = useRef<Toast>(null);
  toastRef.current = toast;

  return (
    <div className="app-container">
      <BrowserRouter>
        <Toast ref={toast} position="top-right" />
        <MenuBar />
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
};
