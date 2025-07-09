export const guardarReferencias = async ({ referencias, cr_personal_info_id }) => {
    try {
      const res = await fetch('/api/personal-references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referencias, cr_personal_info_id }),
      });
  
      const data = await res.json();
  
      if (!res.ok) throw new Error(data.error || 'Error al guardar referencias');
  
      return { success: true, ids: data.ids };
    } catch (err) {
      console.error('Error en guardarReferencias:', err.message);
      return { success: false, message: err.message };
    }
  };
  