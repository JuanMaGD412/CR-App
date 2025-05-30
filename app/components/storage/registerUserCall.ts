export async function registrarUsuario(data: any) {
    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Error al registrar el usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en registrarUsuario:", error);
      throw error;
    }
  }
  