'use client';

import React from 'react';

type DatosPatrimoniales = {
  propiedades?: string;
  valor_comercial?: string;
  certificados?: string;
  vehiculos?: string;
  declaracion_renta?: string;
};

type Props = {
  data: DatosPatrimoniales;
  setData: React.Dispatch<React.SetStateAction<DatosPatrimoniales>>;
};

export function Assets({ data, setData }: Props) {
  const handleChange = (field: keyof DatosPatrimoniales, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className={labelClass}>Propiedades a nombre del solicitante</label>
        <input
          className={inputClass}
          value={data.propiedades || ''}
          onChange={(e) => handleChange('propiedades', e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Valor comercial</label>
        <input
          className={inputClass}
          type="number"
          value={data.valor_comercial || ''}
          onChange={(e) => handleChange('valor_comercial', e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Certificados o escrituras</label>
        <input
          className={inputClass}
          value={data.certificados || ''}
          onChange={(e) => handleChange('certificados', e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Vehículos u otros activos</label>
        <input
          className={inputClass}
          value={data.vehiculos || ''}
          onChange={(e) => handleChange('vehiculos', e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Declaración de renta</label>
        <input
          className={inputClass}
          value={data.declaracion_renta || ''}
          onChange={(e) => handleChange('declaracion_renta', e.target.value)}
        />
      </div>
    </form>
  );
}
