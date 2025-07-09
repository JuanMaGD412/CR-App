'use client';

import React, { useEffect } from "react";

type LoanData = {
  monto: string;
  tiempo_meses: number | string;
  frecuencia_pago: string;
  cuotas_calculadas: number;
  destino_prestamo: string;
  tipo_garantia: string;
  otros_prestamos: string;
  descripcion: string;
};

type Props = {
  data: LoanData;
  setData: React.Dispatch<React.SetStateAction<LoanData>>;
};

export function LoanDetails({ data, setData }: Props) {
  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const tiempos = [2, 4, 6, 12, 18, 24, 36, 48, 60];
  const destinos = ["Libre inversión", "Vivienda", "Estudio", "Otro"];

  const periodicidadMap = {
    mensual: 1,
    quincenal: 2,
    semanal: 4,
  };

  // Calcular automáticamente las cuotas cuando cambia el tiempo o frecuencia
  useEffect(() => {
    if (
      data.frecuencia_pago === 'mensual' ||
      data.frecuencia_pago === 'quincenal' ||
      data.frecuencia_pago === 'semanal'
    ) {
      const pagosPorMes = periodicidadMap[data.frecuencia_pago];
      const cuotas = Number(data.tiempo_meses) * pagosPorMes;
      setData((prev) => ({ ...prev, cuotas_calculadas: cuotas }));
    } else {
      setData((prev) => ({ ...prev, cuotas_calculadas: 0 }));
    }
  }, [data.tiempo_meses, data.frecuencia_pago]);
  

  const handleChange = (field: keyof LoanData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="space-y-4 max-w-xl mx-auto">

      <div>
        <label className={labelClass}>Monto solicitado ($)</label>
        <input
          type="number"
          className={inputClass}
          placeholder="Ej. 5000000"
          value={data.monto || ''}
          onChange={(e) => handleChange("monto", e.target.value)}
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/3">
          <label className={labelClass}>Tiempo (meses)</label>
          <select
            className={inputClass}
            value={data.tiempo_meses || ''}
            onChange={(e) => handleChange("tiempo_meses", Number(e.target.value))}
          >
            <option value="">Seleccione una opción</option>
            {tiempos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label className={labelClass}>Frecuencia de pago</label>
          <select
            className={inputClass}
            value={data.frecuencia_pago || ''}
            onChange={(e) => handleChange("frecuencia_pago", e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="mensual">Mensual</option>
            <option value="quincenal">Quincenal</option>
            <option value="semanal">Semanal</option>
          </select>
        </div>

        <div className="w-1/3">
          <label className={labelClass}>Cantidad de cuotas</label>
          <input
            type="number"
            className={inputClass}
            value={data.cuotas_calculadas || 0}
            readOnly
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Destino del préstamo</label>
        <select
          className={inputClass}
          value={data.destino_prestamo || ''}
          onChange={(e) => handleChange("destino_prestamo", e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          {destinos.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tipo de garantía</label>
        <select
          className={inputClass}
          value={data.tipo_garantia || ''}
          onChange={(e) => handleChange("tipo_garantia", e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="personal">Personal</option>
          <option value="prendaria">Prendaria</option>
          <option value="hipotecaria">Hipotecaria</option>
          <option value="sin_garantia">Sin garantía</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>¿Tiene otros préstamos actualmente?</label>
        <select
          className={inputClass}
          value={data.otros_prestamos || ''}
          onChange={(e) => handleChange("otros_prestamos", e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Descripción (detalles complementarios)</label>
        <textarea
          className={inputClass}
          rows={3}
          placeholder="Escriba aquí detalles adicionales del préstamo"
          value={data.descripcion || ''}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        />
      </div>

    </form>
  );
}
