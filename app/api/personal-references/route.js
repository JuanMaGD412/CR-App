import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(req) {
  try {
    const { referencias, cr_personal_info_id } = await req.json();

    if (!Array.isArray(referencias) || !cr_personal_info_id) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    const insertedIds = [];

    for (const ref of referencias) {
      const {
        nombre,
        relacion,
        tiempo,
        telefono,
        direccion,
        ocupacion
      } = ref;

      const result = await pool.query(`
        INSERT INTO cr_personal_references (
          cr_personal_info_id, nombre, relacion, tiempo_conociendo,
          telefono, direccion, ocupacion, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, NOW()
        ) RETURNING id
      `, [
        cr_personal_info_id, nombre, relacion, tiempo,
        telefono, direccion, ocupacion
      ]);

      insertedIds.push(result.rows[0].id);
    }

    return NextResponse.json({ message: 'Referencias guardadas', ids: insertedIds }, { status: 201 });
  } catch (error) {
    console.error('Error al guardar referencias:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
