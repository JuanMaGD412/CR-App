export const guardarDatosTrabajo = async (info) => {
    try {
      const res = await fetch('/api/work-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error || 'Error al guardar trabajo');
  
      return { success: true, id: data.id };
    } catch (err) {
      console.error('Error en guardarDatosTrabajo:', err.message);
      return { success: false, message: err.message };
    }
  };
  