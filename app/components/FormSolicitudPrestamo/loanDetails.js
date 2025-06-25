import { useState, useEffect } from "react";

export function LoanDetails() {
  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  // Estado para campos
  const [monto, setMonto] = useState("");
  const [tiempoMeses, setTiempoMeses] = useState("");
  const [frecuenciaPago, setFrecuenciaPago] = useState("");
  const [cuotasCalculadas, setCuotasCalculadas] = useState(0);
  const [destinoPrestamo, setDestinoPrestamo] = useState("");
  const [tipoGarantia, setTipoGarantia] = useState("");
  const [otrosPrestamos, setOtrosPrestamos] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Opciones fijas
  const tiempos = [2, 4, 6, 12, 18, 24, 36, 48, 60];
  const destinos = ["Libre inversión", "Vivienda", "Estudio", "Otro"];

  // Función para calcular cuotas
  // mensual = 1, quincenal = 2, semanal = 4 (aprox)
  const periodicidadMap = {
    mensual: 1,
    quincenal: 2,
    semanal: 4,
  };

  useEffect(() => {
    if (tiempoMeses && frecuenciaPago) {
      const pagosPorMes = periodicidadMap[frecuenciaPago];
      if (pagosPorMes) {
        setCuotasCalculadas(tiempoMeses * pagosPorMes);
      } else {
        setCuotasCalculadas(0);
      }
    } else {
      setCuotasCalculadas(0);
    }
  }, [tiempoMeses, frecuenciaPago]);

  return (
    <form className="space-y-4 max-w-xl mx-auto">

      <div>
        <label className={labelClass}>Monto solicitado ($)</label>
        <input
          type="number"
          className={inputClass}
          placeholder="Ej. 5000000"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
      </div>

      <div className="flex space-x-4 max-w-xl mx-auto">
        <div className="w-1/3">
          <label className={labelClass}>Tiempo (meses)</label>
          <select
            className={inputClass}
            value={tiempoMeses}
            onChange={(e) => setTiempoMeses(Number(e.target.value))}
          >
            <option value="">Seleccione una opción</option>
            {tiempos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label className={labelClass}>Frecuencia de pago</label>
          <select
            className={inputClass}
            value={frecuenciaPago}
            onChange={(e) => setFrecuenciaPago(e.target.value)}
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
            value={cuotasCalculadas}
            readOnly
            placeholder="Se calcula automáticamente"
          />
        </div>
      </div>


      <div>
        <label className={labelClass}>Destino del préstamo</label>
        <select
          className={inputClass}
          value={destinoPrestamo}
          onChange={(e) => setDestinoPrestamo(e.target.value)}
        >
          <option value="">Seleccione una opción</option>
          {destinos.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tipo de garantía</label>
        <select
          className={inputClass}
          value={tipoGarantia}
          onChange={(e) => setTipoGarantia(e.target.value)}
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
          value={otrosPrestamos}
          onChange={(e) => setOtrosPrestamos(e.target.value)}
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
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

    </form>
  );
}
