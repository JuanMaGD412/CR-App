export async function iniciarSesion(data: { correo: string; contrasena: string }) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || "Error al iniciar sesión");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en iniciarSesion:", error);
      throw error;
    }
  }
  