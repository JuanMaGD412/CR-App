// app/api/login/route.js
import { NextResponse } from "next/server";
import pool from "../../lib/db";
import bcrypt from "bcrypt"; // Opcional, si usas contraseñas encriptadas

export async function POST(req) {
  try {
    const { correo, contrasena } = await req.json();

    const query = "SELECT * FROM cr_usuarios WHERE correo = $1";
    const result = await pool.query(query, [correo]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const usuario = result.rows[0];

    // Si usas contraseñas en texto plano:
    if (usuario.contrasena !== contrasena) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Si usas contraseñas encriptadas (mejor práctica):
    // const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    // if (!passwordMatch) {
    //   return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    // }

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        rol: usuario.rol,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
