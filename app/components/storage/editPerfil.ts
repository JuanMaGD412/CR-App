export async function actualizarUsuario(id: string, data: any) {
    const res = await fetch(`/api/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al actualizar usuario");
    }
  
    return res.json();
  }
  