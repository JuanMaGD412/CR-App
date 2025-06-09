'use client'

import { useState } from 'react';

const inputClass =
  "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export function PersonalInfo1() {
  const [documentType, setDocumentType] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();
    const isBirthdayPassed =
      monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);

    const validAge = age > 18 || (age === 18 && isBirthdayPassed);

    if (documentType !== 'NIT' && !validAge) {
      setError('Debe ser mayor de 18 años (excepto para NIT).');
    } else {
      setError('');
    }

    setBirthDate(e.target.value);
  };

  return (
    <form className="space-y-4 max-w-xl mx-auto">
      {/* Nombres */}
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2 mb-3 md:mb-0">
          <label className={labelClass}>Primer nombre</label>
          <input className={inputClass} placeholder="Ej. Juan" />
        </div>
        <div className="md:w-1/2">
          <label className={labelClass}>Segundo nombre</label>
          <input className={inputClass} placeholder="Ej. Carlos" />
        </div>
      </div>

      {/* Apellidos */}
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/2 mb-3 md:mb-0">
          <label className={labelClass}>Primer apellido</label>
          <input className={inputClass} placeholder="Ej. Pérez" />
        </div>
        <div className="md:w-1/2">
          <label className={labelClass}>Segundo apellido</label>
          <input className={inputClass} placeholder="Ej. Gómez" />
        </div>
      </div>

      {/* Tipo y número de documento */}
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/3 mb-3 md:mb-0">
          <label className={labelClass}>Tipo de documento</label>
          <select
            className={inputClass}
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
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
          <input className={inputClass} placeholder="Ej. 1234567890" />
        </div>
      </div>

      {/* Nacionalidad */}
      <div>
        <label className={labelClass}>Nacionalidad</label>
        <input className={inputClass} placeholder="Ej. Colombiana" />
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className={labelClass}>Fecha de nacimiento</label>
        <input
          className={inputClass}
          type="date"
          value={birthDate}
          onChange={handleBirthDateChange}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      {/* Estado civil */}
      <div>
        <label className={labelClass}>Estado civil</label>
        <select className={inputClass}>
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

export function PersonalInfo2() {
  return (
    <form className="space-y-4 max-w-xl mx-auto">

      <div>
        <label className={labelClass}>Nivel educativo</label>
        <input className={inputClass} placeholder="Ej. Universitario" />
      </div>

      <div>
        <label className={labelClass}>Dirección de residencia</label>
        <input className={inputClass} placeholder="Ej. Calle 123 #45-67" />
      </div>

      <div>
        <label className={labelClass}>Ciudad y departamento</label>
        <input className={inputClass} placeholder="Ej. Medellín, Antioquia" />
      </div>

      <div>
        <label className={labelClass}>Estrato socioeconómico</label>
        <input className={inputClass} placeholder="Ej. 3" type="number" min={1} max={6} />
      </div>

      <div>
        <label className={labelClass}>Tiempo de residencia</label>
        <input className={inputClass} placeholder="Ej. 5 años" />
      </div>

      <div>
        <label className={labelClass}>Teléfono</label>
        <input className={inputClass} placeholder="Ej. 3001234567" type="tel" />
      </div>

      <div>
        <label className={labelClass}>Correo electrónico</label>
        <input className={inputClass} placeholder="Ej. ejemplo@correo.com" type="email" />
      </div>

      <div>
        <label className={labelClass}>Número de personas a cargo</label>
        <input className={inputClass} type="number" placeholder="Ej. 2" min={0} />
      </div>

      <div>
        <label className={labelClass}>Tipo de vivienda</label>
        <input className={inputClass} placeholder="Propia, Arrendada, Familiar, etc." />
      </div>
    </form>
  );
}
