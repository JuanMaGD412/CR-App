import pool from "../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

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
      barrio,
    } = data;

    const query = `
      INSERT INTO usuarios (
        nombres, apellidos, tipo_documento, numero_documento, fecha_expedicion,
        lugar_expedicion, fecha_nacimiento, genero, correo, telefono,
        direccion, contrasena, rol, estado_laboral, pais,
        departamento, ciudad, barrio, creado_en, actualizado_en
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, now(), now()
      )
      RETURNING *;
    `;

    const values = [
      nombres, apellidos, tipo_documento, numero_documento, fecha_expedicion,
      lugar_expedicion, fecha_nacimiento, genero, correo, telefono,
      direccion, contrasena, rol, estado_laboral, pais,
      departamento, ciudad, barrio,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      message: "Usuario registrado correctamente",
      data: result.rows[0],
    }, { status: 201 });

  } catch (error) {
    console.error("Error en el registro:", error);

    // Puedes usar código y mensaje del error para responder con más detalle
    const pgError = {
      code: error.code || null,
      message: error.message || "Error desconocido",
      detail: error.detail || null,
      severity: error.severity || null,
      hint: error.hint || null,
    };

    return NextResponse.json({
      error: "Error al registrar el usuario",
      detalle: pgError
    }, { status: 500 });
  }
}
