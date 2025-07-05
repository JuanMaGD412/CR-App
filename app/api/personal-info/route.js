  // src/app/api/personal-info/route.ts
  import { NextResponse } from 'next/server';
  import pool from '../../lib/db';

  export async function POST(req) {
    try {
      const data = await req.json();

      const {
        id_usuario,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        tipo_documento,
        numero_documento,
        nacionalidad,
        fecha_nacimiento,
        estado_civil,
        nivel_educativo,
        direccion_residencia,
        ciudad_departamento,
        estrato,
        tiempo_residencia,
        telefono,
        correo,
        personas_a_cargo,
        tipo_vivienda,
      } = data;

      const query = `
        INSERT INTO cr_personal_info (
          id_usuario,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido,
          tipo_documento,
          numero_documento,
          nacionalidad,
          fecha_nacimiento,
          estado_civil,
          nivel_educativo,
          direccion_residencia,
          ciudad_departamento,
          estrato,
          tiempo_residencia,
          telefono,
          correo,
          personas_a_cargo,
          tipo_vivienda,
          created_at,
          update_at
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          $16, $17, $18, $19,
          NOW(), NOW()
        )
        RETURNING id;
      `;

      const values = [
        id_usuario,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        tipo_documento,
        numero_documento,
        nacionalidad,
        fecha_nacimiento,
        estado_civil,
        nivel_educativo,
        direccion_residencia,
        ciudad_departamento,
        estrato,
        tiempo_residencia,
        telefono,
        correo,
        personas_a_cargo,
        tipo_vivienda,
      ];

      const result = await pool.query(query, values);

      return NextResponse.json(
        { message: 'Información personal guardada', id: result.rows[0].id },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error al guardar información personal:', error);
      return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
  }
