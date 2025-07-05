'use client';

const inputClass =
  "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export function WorkInfo1({ data, setData }) {
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
        <label className={labelClass}>Ocupación</label>
        <input
          name="ocupacion"
          className={inputClass}
          value={data.ocupacion || ""}
          onChange={handleChange}
          placeholder="Ej. Empleado, Independiente"
        />
      </div>

      <div>
        <label className={labelClass}>Nombre de la empresa</label>
        <input
          name="nombre_empresa"
          className={inputClass}
          value={data.nombre_empresa || ""}
          onChange={handleChange}
          placeholder="Ej. Soluciones S.A."
        />
      </div>

      <div>
        <label className={labelClass}>Dirección laboral</label>
        <input
          name="direccion_laboral"
          className={inputClass}
          value={data.direccion_laboral || ""}
          onChange={handleChange}
          placeholder="Ej. Calle 123 #45-67"
        />
      </div>

      <div>
        <label className={labelClass}>Teléfono laboral</label>
        <input
          type="tel"
          name="telefono_laboral"
          className={inputClass}
          value={data.telefono_laboral || ""}
          onChange={handleChange}
          placeholder="Ej. 6041234567"
        />
      </div>

      <div>
        <label className={labelClass}>Cargo</label>
        <input
          name="cargo"
          className={inputClass}
          value={data.cargo || ""}
          onChange={handleChange}
          placeholder="Ej. Analista, Gerente"
        />
      </div>

      <div>
        <label className={labelClass}>Antigüedad laboral</label>
        <input
          name="antiguedad_laboral"
          className={inputClass}
          value={data.antiguedad_laboral || ""}
          onChange={handleChange}
          placeholder="Ej. 3 años"
        />
      </div>

      <div>
        <label className={labelClass}>Tipo de contrato</label>
        <input
          name="tipo_contrato"
          className={inputClass}
          value={data.tipo_contrato || ""}
          onChange={handleChange}
          placeholder="Ej. Término fijo, Indefinido, Prestación de servicios"
        />
      </div>
    </form>
  );
}

export function WorkInfo2({ data, setData }) {
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
        <label className={labelClass}>Ingresos mensuales</label>
        <input
          type="number"
          name="ingresos_mensuales"
          className={inputClass}
          value={data.ingresos_mensuales || ""}
          onChange={handleChange}
          placeholder="Ej. 2000000"
        />
      </div>

      <div>
        <label className={labelClass}>Ingresos adicionales</label>
        <input
          type="number"
          name="ingresos_adicionales"
          className={inputClass}
          value={data.ingresos_adicionales || ""}
          onChange={handleChange}
          placeholder="Ej. 500000"
        />
      </div>

      <div>
        <label className={labelClass}>Gastos mensuales fijos</label>
        <input
          type="number"
          name="gastos_mensuales"
          className={inputClass}
          value={data.gastos_mensuales || ""}
          onChange={handleChange}
          placeholder="Ej. 1500000"
        />
      </div>

      <div>
        <label className={labelClass}>Productos financieros activos</label>
        <input
          name="productos_financieros"
          className={inputClass}
          value={data.productos_financieros || ""}
          onChange={handleChange}
          placeholder="Ej. Tarjetas de crédito, Créditos hipotecarios"
        />
      </div>

      <div>
        <label className={labelClass}>Obligaciones financieras actuales</label>
        <input
          type="number"
          name="obligaciones_financieras"
          className={inputClass}
          value={data.obligaciones_financieras || ""}
          onChange={handleChange}
          placeholder="Ej. 800000"
        />
      </div>

      <div>
        <label className={labelClass}>Nivel de endeudamiento</label>
        <input
          name="nivel_endeudamiento"
          className={inputClass}
          value={data.nivel_endeudamiento || ""}
          onChange={handleChange}
          placeholder="Ej. Bajo, Medio, Alto o % estimado"
        />
      </div>
    </form>
  );
}