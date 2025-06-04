'use client'

import { useState } from 'react'

export function PersonalInfo1() {
    return (
      <form className="space-y-4">
        <input className="border p-2 w-full" placeholder="Nombres y apellidos" />
        <input className="border p-2 w-full" placeholder="Tipo de documento" />
        <input className="border p-2 w-full" placeholder="Número de documento" />
        <input className="border p-2 w-full" placeholder="Fecha de nacimiento" />
        <input className="border p-2 w-full" placeholder="Estado civil" />
        <input className="border p-2 w-full" placeholder="Nacionalidad" />
        <input className="border p-2 w-full" placeholder="Sexo" />
      </form>
    )
  }
  
  export function PersonalInfo2() {
    return (
      <form className="space-y-4">
        <input className="border p-2 w-full" placeholder="Nivel educativo" />
        <input className="border p-2 w-full" placeholder="Dirección de residencia" />
        <input className="border p-2 w-full" placeholder="Ciudad y departamento" />
        <input className="border p-2 w-full" placeholder="Estrato socioeconómico" />
        <input className="border p-2 w-full" placeholder="Tiempo de residencia" />
        <input className="border p-2 w-full" placeholder="Teléfono" />
        <input className="border p-2 w-full" placeholder="Correo electrónico" />
        <input className="border p-2 w-full" placeholder="Número de personas a cargo" />
        <input className="border p-2 w-full" placeholder="Tipo de vivienda" />
      </form>
    )
  }