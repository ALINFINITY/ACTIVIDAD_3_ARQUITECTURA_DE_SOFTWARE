import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { publicacionesService } from "../services/publicacionesService";
import { autoresService } from "../services/autoresService";
import type { Publicacion, Autor, EstadoEditorial } from "../types";

export const PublicacionesPage = () => {
  const toast = useRef<Toast>(null);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [estadosEditoriales, setEstadosEditoriales] = useState<EstadoEditorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [statusDialogVisible, setStatusDialogVisible] = useState(false);
  const [selectedPublicacion, setSelectedPublicacion] =
    useState<Publicacion | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const [formData, setFormData] = useState<Publicacion>({
    titulo: "",
    descripcion: "",
    tipoPublicacion: "",
    medioPublicacion: "",
    codigoIdentificacion: "",
    autor_id: "",
    estado_editorial: "",
  });

  useEffect(() => {
    loadPublicaciones();
    loadAutores();
    loadEstadosValidos();
  }, []);

  const loadPublicaciones = async () => {
    setLoading(true);
    try {
      const data = await publicacionesService.getAll();
      setPublicaciones(data);
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al cargar publicaciones",
        life: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAutores = async () => {
    try {
      const data = await autoresService.getAll();
      setAutores(data);
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al cargar autores",
        life: 4000,
      });
    }
  };

  const loadEstadosValidos = async () => {
    try {
      const estados = await publicacionesService.getEstadosValidos();
      const estadosFormateados = estados.map((estado) => ({
        label: formatearEstado(estado),
        value: estado,
      }));
      setEstadosEditoriales(estadosFormateados);
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al cargar estados válidos",
        life: 4000,
      });
    }
  };

  const formatearEstado = (estado: string): string => {
    const formatos: { [key: string]: string } = {
      en_revision: "En Revisión",
      aprobado: "Aprobado",
      rechazado: "Rechazado",
      publicado: "Publicado",
      archivado: "Archivado",
    };
    return formatos[estado] || estado.charAt(0).toUpperCase() + estado.slice(1).replace(/_/g, " ");
  };

  const validateForm = (): boolean => {
    if (!formData.titulo.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El título es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.descripcion.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "La descripción es requerida",
        life: 4000,
      });
      return false;
    }

    if (!formData.tipoPublicacion.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El tipo de publicación es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.medioPublicacion.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El medio de publicación es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.codigoIdentificacion.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El código de identificación es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.autor_id) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "Debes seleccionar un autor",
        life: 4000,
      });
      return false;
    }

    if (!formData.estado_editorial) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "Debes seleccionar un estado editorial",
        life: 4000,
      });
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await publicacionesService.create(formData);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Publicación creada exitosamente",
        life: 3000,
      });
      setDialogVisible(false);
      resetForm();
      loadPublicaciones();
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al crear publicación",
        life: 4000,
      });
    }
  };

  const handleView = async (publicacion: Publicacion) => {
    try {
      const data = await publicacionesService.getById(publicacion.id!);
      setSelectedPublicacion(data);
      setViewDialogVisible(true);
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al obtener publicación",
        life: 4000,
      });
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedPublicacion?.id) return;

    if (!newStatus) {
      toast.current?.show({
        severity: "warn",
        summary: "Campo incompleto",
        detail: "Debes seleccionar un estado editorial",
        life: 4000,
      });
      return;
    }

    try {
      await publicacionesService.updateStatus(
        selectedPublicacion.id,
        newStatus
      );
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Estado actualizado exitosamente",
        life: 3000,
      });
      setStatusDialogVisible(false);
      setSelectedPublicacion(null);
      setNewStatus("");
      loadPublicaciones();
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al actualizar estado",
        life: 4000,
      });
    }
  };

  const openStatusDialog = (publicacion: Publicacion) => {
    setSelectedPublicacion(publicacion);
    setNewStatus(publicacion.estado_editorial);
    setStatusDialogVisible(true);
  };

  const resetForm = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      tipoPublicacion: "",
      medioPublicacion: "",
      codigoIdentificacion: "",
      autor_id: "",
      estado_editorial: "",
    });
  };

  const actionBodyTemplate = (rowData: Publicacion) => {
    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-text"
          onClick={() => handleView(rowData)}
          tooltip="Ver detalles"
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning p-button-text"
          onClick={() => openStatusDialog(rowData)}
          tooltip="Cambiar estado"
        />
      </div>
    );
  };

  const estadoBodyTemplate = (rowData: Publicacion) => {
    const estado = estadosEditoriales.find(
      (e) => e.value === rowData.estado_editorial
    );
    return (
      <span
        style={{
          padding: "0.25rem 0.75rem",
          borderRadius: "12px",
          background: "rgba(139, 92, 246, 0.2)",
          color: "#c4b5fd",
          fontSize: "0.85rem",
        }}
      >
        {estado?.label || rowData.estado_editorial}
      </span>
    );
  };

  const fechaBodyTemplate = (rowData: Publicacion) => {
    if (!rowData.fecha_creacion) return "-";
    return new Date(rowData.fecha_creacion).toLocaleDateString("es-ES");
  };

  return (
    <div className="page-container">
      <Toast ref={toast} position="top-right" />
      <div className="card-futuristic">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ margin: 0 }}>Gestión de Publicaciones</h1>
          <Button
            label="Nueva Publicación"
            icon="pi pi-plus"
            onClick={() => setDialogVisible(true)}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              border: "none",
            }}
          />
        </div>

        <DataTable
          value={publicaciones}
          loading={loading}
          paginator
          rows={10}
          emptyMessage="No hay publicaciones registradas"
          stripedRows
        >
          <Column field="titulo" header="Título" sortable />
          <Column field="tipoPublicacion" header="Tipo" sortable />
          <Column field="medioPublicacion" header="Medio" sortable />
          <Column
            field="estado_editorial"
            header="Estado"
            body={estadoBodyTemplate}
            sortable
          />
          <Column
            field="fecha_creacion"
            header="Fecha"
            body={fechaBodyTemplate}
            sortable
          />
          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </div>

      <Dialog
        header="Crear Publicación"
        visible={dialogVisible}
        style={{ width: "60vw" }}
        onHide={() => {
          setDialogVisible(false);
          resetForm();
        }}
      >
        <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
          <div>
            <label htmlFor="titulo">Título</label>
            <InputText
              id="titulo"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción</label>
            <InputTextarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              style={{ width: "100%" }}
              rows={3}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label htmlFor="tipo">Tipo de Publicación</label>
              <InputText
                id="tipo"
                value={formData.tipoPublicacion}
                onChange={(e) =>
                  setFormData({ ...formData, tipoPublicacion: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label htmlFor="medio">Medio de Publicación</label>
              <InputText
                id="medio"
                value={formData.medioPublicacion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medioPublicacion: e.target.value,
                  })
                }
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="codigo">Código de Identificación</label>
            <InputText
              id="codigo"
              value={formData.codigoIdentificacion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  codigoIdentificacion: e.target.value,
                })
              }
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label htmlFor="autor">Autor</label>
            <Dropdown
              id="autor"
              value={formData.autor_id}
              options={autores.map((a) => ({
                label: `${a.nombre} ${a.apellido} (${a.alias})`,
                value: a.id,
              }))}
              onChange={(e) =>
                setFormData({ ...formData, autor_id: e.value })
              }
              placeholder="Selecciona un autor"
              style={{ width: "100%" }}
              filter
            />
          </div>
          <div>
            <label htmlFor="estado">Estado Editorial</label>
            <Dropdown
              id="estado"
              value={formData.estado_editorial}
              options={estadosEditoriales}
              onChange={(e) =>
                setFormData({ ...formData, estado_editorial: e.value })
              }
              placeholder="Selecciona un estado"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => {
              setDialogVisible(false);
              resetForm();
            }}
            className="p-button-text"
          />
          <Button
            label="Guardar"
            icon="pi pi-check"
            onClick={handleCreate}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              border: "none",
            }}
          />
        </div>
      </Dialog>

      <Dialog
        header="Detalles de la Publicación"
        visible={viewDialogVisible}
        style={{ width: "60vw" }}
        onHide={() => setViewDialogVisible(false)}
      >
        {selectedPublicacion && (
          <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
            <div>
              <strong>ID:</strong> {selectedPublicacion.id}
            </div>
            <div>
              <strong>Título:</strong> {selectedPublicacion.titulo}
            </div>
            <div>
              <strong>Descripción:</strong> {selectedPublicacion.descripcion}
            </div>
            <div>
              <strong>Tipo:</strong> {selectedPublicacion.tipoPublicacion}
            </div>
            <div>
              <strong>Medio:</strong> {selectedPublicacion.medioPublicacion}
            </div>
            <div>
              <strong>Código:</strong>{" "}
              {selectedPublicacion.codigoIdentificacion}
            </div>
            <div>
              <strong>Estado:</strong>{" "}
              {estadosEditoriales.find(
                (e) => e.value === selectedPublicacion.estado_editorial
              )?.label || selectedPublicacion.estado_editorial}
            </div>
            <div>
              <strong>Fecha de Creación:</strong>{" "}
              {selectedPublicacion.fecha_creacion
                ? new Date(selectedPublicacion.fecha_creacion).toLocaleString(
                    "es-ES"
                  )
                : "-"}
            </div>
            {selectedPublicacion.autor_data && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "rgba(139, 92, 246, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#c4b5fd" }}>
                  Información del Autor
                </h3>
                <div>
                  <strong>Nombre:</strong>{" "}
                  {selectedPublicacion.autor_data.nombre}{" "}
                  {selectedPublicacion.autor_data.apellido}
                </div>
                <div>
                  <strong>Alias:</strong> {selectedPublicacion.autor_data.alias}
                </div>
                <div>
                  <strong>Email:</strong> {selectedPublicacion.autor_data.email}
                </div>
                <div>
                  <strong>Especialidad:</strong>{" "}
                  {selectedPublicacion.autor_data.especialidad}
                </div>
                <div>
                  <strong>Libros Publicados:</strong>{" "}
                  {selectedPublicacion.autor_data.libros_publicados}
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>

      <Dialog
        header="Actualizar Estado Editorial"
        visible={statusDialogVisible}
        style={{ width: "30vw" }}
        onHide={() => {
          setStatusDialogVisible(false);
          setSelectedPublicacion(null);
          setNewStatus("");
        }}
      >
        <div style={{ padding: "1rem" }}>
          <label htmlFor="newEstado">Nuevo Estado</label>
          <Dropdown
            id="newEstado"
            value={newStatus}
            options={estadosEditoriales}
            onChange={(e) => setNewStatus(e.value)}
            placeholder="Selecciona un estado"
            style={{ width: "100%", marginTop: "0.5rem" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => {
              setStatusDialogVisible(false);
              setSelectedPublicacion(null);
              setNewStatus("");
            }}
            className="p-button-text"
          />
          <Button
            label="Actualizar"
            icon="pi pi-check"
            onClick={handleUpdateStatus}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              border: "none",
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};
