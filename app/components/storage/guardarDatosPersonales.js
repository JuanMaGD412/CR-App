// app/api/formularioPrestamo/guardarPersonalInfo.ts
export const guardarPersonalInfo = async (info) => {
  try {
    const res = await fetch('/api/personal-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al guardar datos');
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error('Error en guardarPersonalInfo:', err.message);
    return { success: false, message: err.message };
  }
};
