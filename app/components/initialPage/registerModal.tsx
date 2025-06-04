"use client";

import React, { useState } from "react";
import { registrarUsuario } from "../storage/registerUserCall";

export default function RegistroModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    tipo_documento: "CC",
    numero_documento: "",
    fecha_expedicion: "",
    lugar_expedicion: "",
    fecha_nacimiento: "",
    genero: "Seleccione",
    correo: "",
    telefono: "",
    pais: "",
    departamento: "",
    ciudad: "",
    barrio: "",
    direccion: "",
    contrasena: "",
    confirmarContrasena: "",
    rol: "cliente",
    estado_laboral: "Seleccione situación laboral",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (form.contrasena !== form.confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }
  
    try {
      const response = await registrarUsuario(form);
      console.log("Usuario registrado con éxito:", response);
      alert("¡Registro exitoso!");
      onClose(); // cerrar el modal si todo va bien
    } catch (error) {
      alert("Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-600">Formulario de Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">

          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Nombres</label>
                <input name="nombres" onChange={handleChange} value={form.nombres} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Apellidos</label>
                <input name="apellidos" onChange={handleChange} value={form.apellidos} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Tipo de documento</label>
                <select name="tipo_documento" onChange={handleChange} value={form.tipo_documento} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="TI">TI</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Número de documento</label>
                <input name="numero_documento" onChange={handleChange} value={form.numero_documento} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Fecha de expedición</label>
                <input type="date" name="fecha_expedicion" onChange={handleChange} value={form.fecha_expedicion} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Lugar de expedición</label>
                <input name="lugar_expedicion" onChange={handleChange} value={form.lugar_expedicion} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Fecha de nacimiento</label>
                <input type="date" name="fecha_nacimiento" onChange={handleChange} value={form.fecha_nacimiento} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Género</label>
                <select name="genero" onChange={handleChange} value={form.genero} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="Masculino">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Estado laboral</label>
                <select name="estado_laboral" onChange={handleChange} value={form.estado_laboral} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="Empleado">Seleccione situación laboral</option>
                  <option value="Empleado">Empleado</option>
                  <option value="Desempleado">Desempleado</option>
                  <option value="Independiente">Independiente</option>
                  <option value="Pensionado">Pensionado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Correo electrónico</label>
                <input type="email" name="correo" onChange={handleChange} value={form.correo} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Teléfono</label>
                <input name="telefono" onChange={handleChange} value={form.telefono} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">País</label>
                <input name="pais" onChange={handleChange} value={form.pais} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Departamento</label>
                <input name="departamento" onChange={handleChange} value={form.departamento} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Ciudad</label>
                <input name="ciudad" onChange={handleChange} value={form.ciudad} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Barrio</label>
                <input name="barrio" onChange={handleChange} value={form.barrio} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">Dirección</label>
                <input name="direccion" onChange={handleChange} value={form.direccion} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Seguridad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Contraseña</label>
                <input type="password" name="contrasena" onChange={handleChange} value={form.contrasena} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Confirmar contraseña</label>
                <input type="password" name="confirmarContrasena" onChange={handleChange} value={form.confirmarContrasena} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
              </div>
            </div>
          </div>

          <div>
            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
