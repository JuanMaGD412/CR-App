'use client'

export function Assets() {
    const inputClass =
      "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  
    return (
      <form className="space-y-4 max-w-xl mx-auto">
  
        <div>
          <label className={labelClass}>Propiedades a nombre del solicitante</label>
          <input className={inputClass} placeholder="Ej. Casa, Apartamento, Lote" />
        </div>
  
        <div>
          <label className={labelClass}>Valor comercial</label>
          <input className={inputClass} type="number" placeholder="Ej. 150000000" />
        </div>
  
        <div>
          <label className={labelClass}>Certificados o escrituras</label>
          <input className={inputClass} placeholder="Ej. Certificado de libertad, Escritura No. 123" />
        </div>
  
        <div>
          <label className={labelClass}>Vehículos u otros activos</label>
          <input className={inputClass} placeholder="Ej. Vehículo particular, Motos, Acciones" />
        </div>
  
        <div>
          <label className={labelClass}>Declaración de renta</label>
          <input className={inputClass} placeholder="Ej. Año gravable 2023" />
        </div>
  
      </form>
    );
  }
  