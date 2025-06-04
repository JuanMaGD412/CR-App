'use client'

import { useState } from 'react'

type Reference = {
  nombre: string
  relacion: string
  tiempo: string
  telefono: string
  direccion: string
  ocupacion: string
}

export default function PersonalReferences() {
  const [references, setReferences] = useState<Reference[]>([
    { nombre: '', relacion: '', tiempo: '', telefono: '', direccion: '', ocupacion: '' }
  ])

  const handleChange = (index: number, field: keyof Reference, value: string) => {
    const updated = [...references]
    updated[index][field] = value
    setReferences(updated)
  }

  const addReference = () => {
    setReferences([...references, { nombre: '', relacion: '', tiempo: '', telefono: '', direccion: '', ocupacion: '' }])
  }

  const removeReference = (index: number) => {
    if (references.length > 1) {
      setReferences(references.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-6">
      {references.map((ref, index) => (
        <div key={index} className="border p-4 rounded-md shadow space-y-4 relative">
          <h3 className="font-semibold mb-2">Referencia {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <input
                className="border p-2 w-full text-sm rounded"
                value={ref.nombre}
                onChange={e => handleChange(index, 'nombre', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Relación</label>
              <input
                className="border p-2 w-full text-sm rounded"
                value={ref.relacion}
                onChange={e => handleChange(index, 'relacion', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tiempo conociendo</label>
              <input
                className="border p-2 w-full text-sm rounded"
                value={ref.tiempo}
                onChange={e => handleChange(index, 'tiempo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                className="border p-2 w-full text-sm rounded"
                value={ref.telefono}
                onChange={e => handleChange(index, 'telefono', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Dirección</label>
              <input
                className="border p-2 w-full text-sm rounded"
                value={ref.direccion}
                onChange={e => handleChange(index, 'direccion', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Ocupación</label>
              <input
                className="border p-2 w-full text-sm rounded"
                value={ref.ocupacion}
                onChange={e => handleChange(index, 'ocupacion', e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeReference(index)}
            className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
          >
            Eliminar
          </button>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={addReference}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Agregar referencia
        </button>
      </div>
    </div>
  )
}
