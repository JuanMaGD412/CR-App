import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function POST(req) {
  try {
    const {
      nombres,
      apellidos,
      tipo_documento,
      numero_documento,
      fecha_expedicion,
      lugar_expedicion,
      fecha_nacimiento,
      genero,
      correo,
      telefono,
      direccion,
      contrasena,
      rol,
      estado_laboral,
      pais,
      departamento,
      ciudad,
    } = await req.json();

    const query = `
      INSERT INTO cr_usuarios (
        nombres, apellidos, tipo_documento, numero_documento, fecha_expedicion,
        lugar_expedicion, fecha_nacimiento, genero, correo, telefono,
        direccion, contrasena, rol, estado_laboral, pais,
        departamento, ciudad, creado_en, actualizado_en
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, NOW(), NOW()
      )
      RETURNING id;
    `;

    const values = [
      nombres, apellidos, tipo_documento, numero_documento, fecha_expedicion,
      lugar_expedicion, fecha_nacimiento, genero, correo, telefono,
      direccion, contrasena, rol, estado_laboral, pais,
      departamento, ciudad,
    ];

    const result = await pool.query(query, values);
    const nuevoUsuarioId = result.rows[0].id;

    return NextResponse.json({ message: "Usuario registrado correctamente", id: nuevoUsuarioId }, { status: 201 });

  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
