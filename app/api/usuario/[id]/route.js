import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const result = await pool.query("SELECT * FROM cr_usuarios WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(req) {
    const id = req.nextUrl.pathname.split("/").pop();
    const data = await req.json();
  
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
        pais,
        departamento,
        ciudad,
        direccion,
        contrasena, // opcional
        rol,
        estado_laboral,
      } = data;
  
      let query = "";
      let values = [];
  
      if (contrasena && contrasena.trim() !== "") {
        query = `
          UPDATE cr_usuarios SET
            nombres = $1,
            apellidos = $2,
            tipo_documento = $3,
            numero_documento = $4,
            fecha_expedicion = $5,
            lugar_expedicion = $6,
            fecha_nacimiento = $7,
            genero = $8,
            correo = $9,
            telefono = $10,
            pais = $11,
            departamento = $12,
            ciudad = $13,
            direccion = $14,
            contrasena = $15,
            rol = $16,
            estado_laboral = $17,
            actualizado_en = NOW()
          WHERE id = $18
        `;
        values = [
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
          pais,
          departamento,
          ciudad,
          direccion,
          contrasena,
          rol,
          estado_laboral,
          id,
        ];
      } else {
        query = `
          UPDATE cr_usuarios SET
            nombres = $1,
            apellidos = $2,
            tipo_documento = $3,
            numero_documento = $4,
            fecha_expedicion = $5,
            lugar_expedicion = $6,
            fecha_nacimiento = $7,
            genero = $8,
            correo = $9,
            telefono = $10,
            pais = $11,
            departamento = $12,
            ciudad = $13,
            direccion = $14,
            rol = $15,
            estado_laboral = $16,
            actualizado_en = NOW()
          WHERE id = $17
        `;
        values = [
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
          pais,
          departamento,
          ciudad,
          direccion,
          rol,
          estado_laboral,
          id,
        ];
      }
  
      await pool.query(query, values);
      return NextResponse.json({ message: "Usuario actualizado correctamente" }, { status: 200 });
  
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
  }