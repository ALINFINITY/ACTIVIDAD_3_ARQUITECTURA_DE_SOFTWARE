import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Sistema de Gestión de Publicaciones
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
          Plataforma moderna para la gestión integral de autores y publicaciones académicas
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <Card
          className="card-futuristic"
          style={{ textAlign: "center" }}
        >
          <i
            className="pi pi-users"
            style={{ fontSize: "4rem", color: "#8b5cf6", marginBottom: "1rem" }}
          ></i>
          <h2 style={{ color: "#c4b5fd", marginBottom: "1rem" }}>Autores</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Gestiona la información de autores, incluyendo sus datos personales,
            especialidades y trayectoria editorial.
          </p>
          <Button
            label="Ir a Autores"
            icon="pi pi-arrow-right"
            onClick={() => navigate("/autores")}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              border: "none",
            }}
          />
        </Card>

        <Card
          className="card-futuristic"
          style={{ textAlign: "center" }}
        >
          <i
            className="pi pi-book"
            style={{ fontSize: "4rem", color: "#8b5cf6", marginBottom: "1rem" }}
          ></i>
          <h2 style={{ color: "#c4b5fd", marginBottom: "1rem" }}>
            Publicaciones
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            Administra publicaciones académicas, controla estados editoriales y
            mantén un registro completo de todas las obras.
          </p>
          <Button
            label="Ir a Publicaciones"
            icon="pi pi-arrow-right"
            onClick={() => navigate("/publicaciones")}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              border: "none",
            }}
          />
        </Card>
      </div>

      <div
        style={{
          marginTop: "4rem",
          padding: "2rem",
          background: "var(--bg-tertiary)",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2 style={{ color: "#c4b5fd", marginBottom: "1.5rem", textAlign: "center" }}>
          Características del Sistema
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <i className="pi pi-check-circle" style={{ fontSize: "2rem", color: "#8b5cf6" }}></i>
            <h3 style={{ color: "var(--text-primary)", marginTop: "0.5rem" }}>
              Gestión Completa
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              CRUD completo para autores y publicaciones
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <i className="pi pi-sync" style={{ fontSize: "2rem", color: "#8b5cf6" }}></i>
            <h3 style={{ color: "var(--text-primary)", marginTop: "0.5rem" }}>
              Estados Dinámicos
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Control de estados editoriales en tiempo real
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <i className="pi pi-shield" style={{ fontSize: "2rem", color: "#8b5cf6" }}></i>
            <h3 style={{ color: "var(--text-primary)", marginTop: "0.5rem" }}>
              Arquitectura Moderna
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Microservicios con API Gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}