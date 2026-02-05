import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { autoresService } from "../services/autoresService";
import type { Autor } from "../types";

export const AutoresPage = () => {
  const toast = useRef<Toast>(null);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [selectedAutor, setSelectedAutor] = useState<Autor | null>(null);
  const [formData, setFormData] = useState<Autor>({
    edad: 18,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    alias: "",
    especialidad: "",
    libros_publicados: 0,
  });

  useEffect(() => {
    loadAutores();
  }, []);

  const loadAutores = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El nombre es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.apellido.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El apellido es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El email es requerido",
        life: 4000,
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.current?.show({
        severity: "warn",
        summary: "Email inválido",
        detail: "Por favor ingresa un email válido",
        life: 4000,
      });
      return false;
    }

    if (!formData.telefono.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El teléfono es requerido",
        life: 4000,
      });
      return false;
    }

    if (formData.telefono.length !== 10) {
      toast.current?.show({
        severity: "warn",
        summary: "Teléfono inválido",
        detail: "El teléfono debe tener 10 dígitos",
        life: 4000,
      });
      return false;
    }

    if (!formData.alias.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "El alias es requerido",
        life: 4000,
      });
      return false;
    }

    if (!formData.especialidad.trim()) {
      toast.current?.show({
        severity: "warn",
        summary: "Campos incompletos",
        detail: "La especialidad es requerida",
        life: 4000,
      });
      return false;
    }

    if (formData.edad < 18 || formData.edad > 100) {
      toast.current?.show({
        severity: "warn",
        summary: "Edad inválida",
        detail: "La edad debe estar entre 18 y 100 años",
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
      await autoresService.create(formData);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Autor creado exitosamente",
        life: 3000,
      });
      setDialogVisible(false);
      resetForm();
      loadAutores();
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al crear autor",
        life: 4000,
      });
    }
  };

  const handleView = async (autor: Autor) => {
    try {
      const data = await autoresService.getById(autor.id!);
      setSelectedAutor(data);
      setViewDialogVisible(true);
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.detail || "Error al obtener autor",
        life: 4000,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      edad: 18,
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      alias: "",
      especialidad: "",
      libros_publicados: 0,
    });
  };

  const actionBodyTemplate = (rowData: Autor) => {
    return (
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-info p-button-text"
        onClick={() => handleView(rowData)}
        tooltip="Ver detalles"
      />
    );
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
          <h1 style={{ margin: 0 }}>Gestión de Autores</h1>
          <Button
            label="Nuevo Autor"
            icon="pi pi-plus"
            onClick={() => setDialogVisible(true)}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              border: "none",
            }}
          />
        </div>

        <DataTable
          value={autores}
          loading={loading}
          paginator
          rows={10}
          emptyMessage="No hay autores registrados"
          stripedRows
        >
          <Column field="nombre" header="Nombre" sortable />
          <Column field="apellido" header="Apellido" sortable />
          <Column field="alias" header="Alias" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="especialidad" header="Especialidad" sortable />
          <Column
            field="libros_publicados"
            header="Libros Publicados"
            sortable
          />
          <Column body={actionBodyTemplate} header="Acciones" />
        </DataTable>
      </div>

      <Dialog
        header="Crear Autor"
        visible={dialogVisible}
        style={{ width: "50vw" }}
        onHide={() => {
          setDialogVisible(false);
          resetForm();
        }}
      >
        <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              style={{ width: "100%" }}
              maxLength={30}
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido</label>
            <InputText
              id="apellido"
              value={formData.apellido}
              onChange={(e) =>
                setFormData({ ...formData, apellido: e.target.value })
              }
              style={{ width: "100%" }}
              maxLength={30}
            />
          </div>
          <div>
            <label htmlFor="edad">Edad</label>
            <InputNumber
              id="edad"
              value={formData.edad}
              onValueChange={(e) =>
                setFormData({ ...formData, edad: e.value || 18 })
              }
              min={18}
              max={100}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{ width: "100%" }}
              maxLength={30}
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono</label>
            <InputText
              id="telefono"
              value={formData.telefono}
              onChange={(e) =>
                setFormData({ ...formData, telefono: e.target.value })
              }
              style={{ width: "100%" }}
              maxLength={10}
            />
          </div>
          <div>
            <label htmlFor="alias">Alias</label>
            <InputText
              id="alias"
              value={formData.alias}
              onChange={(e) =>
                setFormData({ ...formData, alias: e.target.value })
              }
              style={{ width: "100%" }}
              maxLength={30}
            />
          </div>
          <div>
            <label htmlFor="especialidad">Especialidad</label>
            <InputText
              id="especialidad"
              value={formData.especialidad}
              onChange={(e) =>
                setFormData({ ...formData, especialidad: e.target.value })
              }
              style={{ width: "100%" }}
              maxLength={50}
            />
          </div>
          <div>
            <label htmlFor="libros">Libros Publicados</label>
            <InputNumber
              id="libros"
              value={formData.libros_publicados}
              onValueChange={(e) =>
                setFormData({ ...formData, libros_publicados: e.value || 0 })
              }
              min={0}
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
        header="Detalles del Autor"
        visible={viewDialogVisible}
        style={{ width: "50vw" }}
        onHide={() => setViewDialogVisible(false)}
      >
        {selectedAutor && (
          <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
            <div>
              <strong>ID:</strong> {selectedAutor.id}
            </div>
            <div>
              <strong>Nombre:</strong> {selectedAutor.nombre}
            </div>
            <div>
              <strong>Apellido:</strong> {selectedAutor.apellido}
            </div>
            <div>
              <strong>Edad:</strong> {selectedAutor.edad}
            </div>
            <div>
              <strong>Email:</strong> {selectedAutor.email}
            </div>
            <div>
              <strong>Teléfono:</strong> {selectedAutor.telefono}
            </div>
            <div>
              <strong>Alias:</strong> {selectedAutor.alias}
            </div>
            <div>
              <strong>Especialidad:</strong> {selectedAutor.especialidad}
            </div>
            <div>
              <strong>Libros Publicados:</strong>{" "}
              {selectedAutor.libros_publicados}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
