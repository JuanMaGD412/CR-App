'use client'

import { useState } from 'react'

export function WorkInfo1() {
    return (
      <form className="space-y-4">
        <input className="border p-2 w-full" placeholder="Ocupación" />
        <input className="border p-2 w-full" placeholder="Nombre de la empresa" />
        <input className="border p-2 w-full" placeholder="Dirección laboral" />
        <input className="border p-2 w-full" placeholder="Teléfono laboral" />
        <input className="border p-2 w-full" placeholder="Cargo" />
        <input className="border p-2 w-full" placeholder="Antigüedad laboral" />
        <input className="border p-2 w-full" placeholder="Tipo de contrato" />
      </form>
    )
  }
  
  export function WorkInfo2() {
    return (
      <form className="space-y-4">
        <input className="border p-2 w-full" placeholder="Ingresos mensuales" />
        <input className="border p-2 w-full" placeholder="Ingresos adicionales" />
        <input className="border p-2 w-full" placeholder="Gastos mensuales fijos" />
        <input className="border p-2 w-full" placeholder="Productos financieros activos" />
        <input className="border p-2 w-full" placeholder="Obligaciones financieras actuales" />
        <input className="border p-2 w-full" placeholder="Nivel de endeudamiento" />
      </form>
    )
  }