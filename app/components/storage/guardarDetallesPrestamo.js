export async function guardarDetallesPrestamo(data) {
    try {
      const res = await fetch('/api/loan-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      return result;
    } catch (error) {
      console.error('❌ Error en guardarDetallesPrestamo:', error.message);
      return { success: false, message: error.message };
    }
  }
  