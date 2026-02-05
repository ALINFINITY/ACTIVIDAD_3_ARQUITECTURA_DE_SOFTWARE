import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

export const MenuBar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Autores",
      icon: "pi pi-users",
      command: () => navigate("/autores"),
    },
    {
      label: "Publicaciones",
      icon: "pi pi-book",
      command: () => navigate("/publicaciones"),
    },
  ];

  const start = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <i className="pi pi-bolt" style={{ fontSize: "1.5rem", color: "#8b5cf6" }}></i>
      <span style={{ fontSize: "1.2rem", fontWeight: "bold", background: "linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Sistema de Publicaciones
      </span>
    </div>
  );

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Menubar model={items} start={start} />
    </div>
  );
};
