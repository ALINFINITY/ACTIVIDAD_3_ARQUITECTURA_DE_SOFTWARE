import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AutoresPage } from "../pages/AutoresPage";
import { PublicacionesPage } from "../pages/PublicacionesPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/autores" element={<AutoresPage />} />
        <Route path="/publicaciones" element={<PublicacionesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
