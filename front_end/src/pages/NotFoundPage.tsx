import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          marginBottom: "2rem",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        <i
          className="pi pi-exclamation-triangle"
          style={{
            fontSize: "8rem",
            color: "#8b5cf6",
            filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))",
          }}
        ></i>
      </div>

      <h1
        style={{
          fontSize: "6rem",
          margin: "0",
          background: "linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: "bold",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "2rem",
          color: "var(--text-primary)",
          marginBottom: "1rem",
        }}
      >
        Página no encontrada
      </h2>

      <p
        style={{
          fontSize: "1.1rem",
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          maxWidth: "500px",
        }}
      >
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
        Verifica la URL o regresa al inicio.
      </p>

      <Button
        label="Volver al Inicio"
        icon="pi pi-home"
        onClick={() => navigate("/")}
        style={{
          background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
          border: "none",
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
        }}
      />

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};
