import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req, { params }) {
  const { numero_documento } = params;

  try {
    const result = await pool.query(
      "SELECT * FROM cr_usuarios WHERE numero_documento = $1 LIMIT 1",
      [numero_documento]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { numero_documento } = params;
  const data = await req.json();

  try {
    const {
      nombres,
      apellidos,
      tipo_documento,
      fecha_expedicion,
      lugar_expedicion,
      fecha_nacimiento,
      genero,
      correo,
      telefono,
      pais,
      departamento,
      ciudad,
      barrio,
      direccion,
      contrasena,
      rol,
      estado_laboral,
    } = data;

    const query = `
      UPDATE cr_usuarios SET
        nombres = $1,
        apellidos = $2,
        tipo_documento = $3,
        fecha_expedicion = $4,
        lugar_expedicion = $5,
        fecha_nacimiento = $6,
        genero = $7,
        correo = $8,
        telefono = $9,
        pais = $10,
        departamento = $11,
        ciudad = $12,
        barrio = $13,
        direccion = $14,
        contrasena = $15,
        rol = $16,
        estado_laboral = $17,
        actualizado_en = NOW()
      WHERE numero_documento = $18
    `;

    const values = [
      nombres,
      apellidos,
      tipo_documento,
      fecha_expedicion,
      lugar_expedicion,
      fecha_nacimiento,
      genero,
      correo,
      telefono,
      pais,
      departamento,
      ciudad,
      barrio,
      direccion,
      contrasena,
      rol,
      estado_laboral,
      numero_documento,
    ];

    await pool.query(query, values);

    return NextResponse.json({ message: "Usuario actualizado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
