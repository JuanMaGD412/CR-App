"use client";

import React, { useState } from "react";
import { actualizarUsuario } from "../../storage/editPerfil"; 
export default function EditUserModal({
  user,
  onClose,
  onSave,
}: {
  user: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    nombres: user.nombres || "",
    apellidos: user.apellidos || "",
    tipo_documento: user.tipo_documento || "CC",
    numero_documento: user.numero_documento || "",
    fecha_expedicion: user.fecha_expedicion || "",
    lugar_expedicion: user.lugar_expedicion || "",
    fecha_nacimiento: user.fecha_nacimiento || "",
    genero: user.genero || "Seleccione",
    correo: user.correo || "",
    telefono: user.telefono || "",
    pais: user.pais || "",
    departamento: user.departamento || "",
    ciudad: user.ciudad || "",
    direccion: user.direccion || "",
    contrasena: "",
    confirmarContrasena: "",
    rol: user.rol || "cliente",
    estado_laboral: user.estado_laboral || "Seleccione situación laboral",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.contrasena && form.contrasena !== form.confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      await actualizarUsuario(user.id, form);
      alert("Perfil actualizado correctamente.");
      onSave(form);
      onClose();
    } catch (error: any) {
      console.error("Error al actualizar:", error);
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nombres" name="nombres" value={form.nombres} onChange={handleChange} />
              <Input label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} />
              <Select label="Tipo de documento" name="tipo_documento" value={form.tipo_documento} onChange={handleChange} options={["CC", "CE", "TI", "PASAPORTE"]} />
              <Input label="Número de documento" name="numero_documento" value={form.numero_documento} onChange={handleChange} />
              <Input label="Fecha de expedición" name="fecha_expedicion" type="date" value={form.fecha_expedicion} onChange={handleChange} />
              <Input label="Lugar de expedición" name="lugar_expedicion" value={form.lugar_expedicion} onChange={handleChange} />
              <Input label="Fecha de nacimiento" name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} />
              <Select label="Género" name="genero" value={form.genero} onChange={handleChange} options={["Masculino", "Femenino", "Otro"]} />
              <Select label="Estado laboral" name="estado_laboral" value={form.estado_laboral} onChange={handleChange} options={["Empleado", "Desempleado", "Independiente", "Pensionado"]} />
            </div>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Correo electrónico" name="correo" type="email" value={form.correo} onChange={handleChange} />
              <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
              <Input label="País" name="pais" value={form.pais} onChange={handleChange} />
              <Input label="Departamento" name="departamento" value={form.departamento} onChange={handleChange} />
              <Input label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} />
              <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
            </div>
          </div>
          {/* Seguridad */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Seguridad</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Contraseña nueva (opcional)" name="contrasena" type="password" value={form.contrasena} onChange={handleChange} />
                <Input label="Confirmar contraseña" name="confirmarContrasena" type="password" value={form.confirmarContrasena} onChange={handleChange} />
              </div>
          </div>
          {/* Botón de guardar */}
          <div>
            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="">Seleccione</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
