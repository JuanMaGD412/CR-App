'use client'

const inputClass =
  "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export function WorkInfo1() {
  return (
    <form className="space-y-4 max-w-xl mx-auto">

      <div>
        <label className={labelClass}>Ocupación</label>
        <input className={inputClass} placeholder="Ej. Empleado, Independiente" />
      </div>

      <div>
        <label className={labelClass}>Nombre de la empresa</label>
        <input className={inputClass} placeholder="Ej. Soluciones S.A." />
      </div>

      <div>
        <label className={labelClass}>Dirección laboral</label>
        <input className={inputClass} placeholder="Ej. Calle 123 #45-67" />
      </div>

      <div>
        <label className={labelClass}>Teléfono laboral</label>
        <input className={inputClass} type="tel" placeholder="Ej. 6041234567" />
      </div>

      <div>
        <label className={labelClass}>Cargo</label>
        <input className={inputClass} placeholder="Ej. Analista, Gerente" />
      </div>

      <div>
        <label className={labelClass}>Antigüedad laboral</label>
        <input className={inputClass} placeholder="Ej. 3 años" />
      </div>

      <div>
        <label className={labelClass}>Tipo de contrato</label>
        <input className={inputClass} placeholder="Ej. Término fijo, Indefinido, Prestación de servicios" />
      </div>

    </form>
  );
}

export function WorkInfo2() {
  return (
    <form className="space-y-4 max-w-xl mx-auto">

      <div>
        <label className={labelClass}>Ingresos mensuales</label>
        <input className={inputClass} type="number" placeholder="Ej. 2000000" />
      </div>

      <div>
        <label className={labelClass}>Ingresos adicionales</label>
        <input className={inputClass} type="number" placeholder="Ej. 500000" />
      </div>

      <div>
        <label className={labelClass}>Gastos mensuales fijos</label>
        <input className={inputClass} type="number" placeholder="Ej. 1500000" />
      </div>

      <div>
        <label className={labelClass}>Productos financieros activos</label>
        <input className={inputClass} placeholder="Ej. Tarjetas de crédito, Créditos hipotecarios" />
      </div>

      <div>
        <label className={labelClass}>Obligaciones financieras actuales</label>
        <input className={inputClass} type="number" placeholder="Ej. 800000" />
      </div>

      <div>
        <label className={labelClass}>Nivel de endeudamiento</label>
        <input className={inputClass} type="text" placeholder="Ej. Bajo, Medio, Alto o % estimado" />
      </div>

    </form>
  );
}
