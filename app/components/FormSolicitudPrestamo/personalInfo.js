'use client';

import React, { useState } from 'react';

const inputClass =
  "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export function PersonalInfo1({ data, setData }) {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación especial para fecha de nacimiento
    if (name === "fecha_nacimiento") {
      const selectedDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();
      const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
      const validAge = age > 18 || (age === 18 && isBirthdayPassed);

      if (data.tipo_documento !== 'NIT' && !validAge) {
        setError('Debe ser mayor de 18 años (excepto para NIT).');
      } else {
        setError('');
      }
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-4 max-w-xl mx-auto">
      {/* Nombres */}
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2 mb-3 md:mb-0">
          <label className={labelClass}>Primer nombre</label>
          <input
            className={inputClass}
            name="primer_nombre"
            value={data.primer_nombre || ''}
            onChange={handleChange}
            placeholder="Ej. Juan"
          />
        </div>
        <div className="md:w-1/2">
          <label className={labelClass}>Segundo nombre</label>
          <input
            className={inputClass}
            name="segundo_nombre"
            value={data.segundo_nombre || ''}
            onChange={handleChange}
            placeholder="Ej. Carlos"
          />
        </div>
      </div>

      {/* Apellidos */}
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2 mb-3 md:mb-0">
          <label className={labelClass}>Primer apellido</label>
          <input
            className={inputClass}
            name="primer_apellido"
            value={data.primer_apellido || ''}
            onChange={handleChange}
            placeholder="Ej. Pérez"
          />
        </div>
        <div className="md:w-1/2">
          <label className={labelClass}>Segundo apellido</label>
          <input
            className={inputClass}
            name="segundo_apellido"
            value={data.segundo_apellido || ''}
            onChange={handleChange}
            placeholder="Ej. Gómez"
          />
        </div>
      </div>

      {/* Tipo y número de documento */}
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/3 mb-3 md:mb-0">
          <label className={labelClass}>Tipo de documento</label>
          <select
            className={inputClass}
            name="tipo_documento"
            value={data.tipo_documento || ''}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
            <option value="Cédula de Extranjería">Cédula de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="NIT">NIT</option>
            <option value="Permiso temporal">Permiso temporal</option>
          </select>
        </div>

        <div className="md:w-2/3">
          <label className={labelClass}>Número de documento</label>
          <input
            className={inputClass}
            name="numero_documento"
            value={data.numero_documento || ''}
            onChange={handleChange}
            placeholder="Ej. 1234567890"
          />
        </div>
      </div>

      {/* Nacionalidad */}
      <div>
        <label className={labelClass}>Nacionalidad</label>
        <input
          className={inputClass}
          name="nacionalidad"
          value={data.nacionalidad || ''}
          onChange={handleChange}
          placeholder="Ej. Colombiana"
        />
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className={labelClass}>Fecha de nacimiento</label>
        <input
          className={inputClass}
          name="fecha_nacimiento"
          type="date"
          value={data.fecha_nacimiento || ''}
          onChange={handleChange}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      {/* Estado civil */}
      <div>
        <label className={labelClass}>Estado civil</label>
        <select
          className={inputClass}
          name="estado_civil"
          value={data.estado_civil || ''}
          onChange={handleChange}
        >
          <option value="">Selecciona una opción</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Unión libre">Unión libre</option>
          <option value="Separado">Separado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
        </select>
      </div>
    </form>
  );
}


export function PersonalInfo2({ data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-4 max-w-xl mx-auto">

      <div>
        <label className={labelClass}>Nivel educativo</label>
        <input
          className={inputClass}
          name="nivel_educativo"
          value={data.nivel_educativo || ''}
          onChange={handleChange}
          placeholder="Ej. Universitario"
        />
      </div>

      <div>
        <label className={labelClass}>Dirección de residencia</label>
        <input
          className={inputClass}
          name="direccion_residencia"
          value={data.direccion_residencia || ''}
          onChange={handleChange}
          placeholder="Ej. Calle 123 #45-67"
        />
      </div>

      <div>
        <label className={labelClass}>Ciudad y departamento</label>
        <input
          className={inputClass}
          name="ciudad_departamento"
          value={data.ciudad_departamento || ''}
          onChange={handleChange}
          placeholder="Ej. Medellín, Antioquia"
        />
      </div>

      <div>
        <label className={labelClass}>Estrato socioeconómico</label>
        <input
          className={inputClass}
          name="estrato"
          type="number"
          min={1}
          max={6}
          value={data.estrato || ''}
          onChange={handleChange}
          placeholder="Ej. 3"
        />
      </div>

      <div>
        <label className={labelClass}>Tiempo de residencia</label>
        <input
          className={inputClass}
          name="tiempo_residencia"
          value={data.tiempo_residencia || ''}
          onChange={handleChange}
          placeholder="Ej. 5 años"
        />
      </div>

      <div>
        <label className={labelClass}>Teléfono</label>
        <input
          className={inputClass}
          name="telefono"
          type="tel"
          value={data.telefono || ''}
          onChange={handleChange}
          placeholder="Ej. 3001234567"
        />
      </div>

      <div>
        <label className={labelClass}>Correo electrónico</label>
        <input
          className={inputClass}
          name="correo"
          type="email"
          value={data.correo || ''}
          onChange={handleChange}
          placeholder="Ej. ejemplo@correo.com"
        />
      </div>

      <div>
        <label className={labelClass}>Número de personas a cargo</label>
        <input
          className={inputClass}
          name="personas_a_cargo"
          type="number"
          min={0}
          value={data.personas_a_cargo || ''}
          onChange={handleChange}
          placeholder="Ej. 2"
        />
      </div>

      <div>
        <label className={labelClass}>Tipo de vivienda</label>
        <input
          className={inputClass}
          name="tipo_vivienda"
          value={data.tipo_vivienda || ''}
          onChange={handleChange}
          placeholder="Propia, Arrendada, Familiar, etc."
        />
      </div>
    </form>
  );
}
