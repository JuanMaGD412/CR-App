import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      cr_personal_info_id,
      propiedades,
      valor_comercial,
      certificados,
      vehiculos,
      declaracion_renta
    } = body;

    const result = await pool.query(`
      INSERT INTO cr_assets (
        cr_personal_info_id,
        propiedades,
        valor_comercial,
        certificados,
        vehiculos_activos,
        declaracion_renta,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `, [
      cr_personal_info_id,
      propiedades,
      valor_comercial,
      certificados,
      vehiculos,
      declaracion_renta
    ]);

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("❌ Error en /api/assets-info:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
