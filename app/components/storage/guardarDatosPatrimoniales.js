// components/storage/guardarDatosPatrimoniales.ts
export const guardarDatosPatrimoniales = async ({
    cr_personal_info_id,
    propiedades,
    valor_comercial,
    certificados,
    vehiculos,
    declaracion_renta,
  }) => {
    try {
      const res = await fetch('/api/assets-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cr_personal_info_id,
          propiedades,
          valor_comercial,
          certificados,
          vehiculos,
          declaracion_renta
        }),
      })
  
      const data = await res.json()
  
      if (!res.ok) throw new Error(data.message || 'Error al guardar activos')
  
      return { success: true, id: data.id }
    } catch (err) {
      console.error('Error en guardarDatosPatrimoniales:', err.message)
      return { success: false, message: err.message }
    }
  }
  