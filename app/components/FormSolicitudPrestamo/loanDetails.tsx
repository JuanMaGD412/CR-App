export function LoanDetails() {
    return (
      <form className="space-y-4">
        <input type="number" className="border p-2 w-full" placeholder="Monto solicitado ($)" />
        <input type="number" className="border p-2 w-full" placeholder="Cantidad de cuotas" />
        <select className="border p-2 w-full">
          <option value="">Frecuencia de pago</option>
          <option value="mensual">Mensual</option>
          <option value="quincenal">Quincenal</option>
          <option value="semanal">Semanal</option>
        </select>
        <input className="border p-2 w-full" placeholder="Destino del préstamo (ej. educación, vivienda)" />
        <select className="border p-2 w-full">
          <option value="">Tipo de garantía</option>
          <option value="personal">Personal</option>
          <option value="prendaria">Prendaria</option>
          <option value="hipotecaria">Hipotecaria</option>
          <option value="sin_garantia">Sin garantía</option>
        </select>
        <select className="border p-2 w-full">
          <option value="">¿Tiene otros préstamos actualmente?</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </form>
    )
  }
  