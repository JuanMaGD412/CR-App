import {NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(req) {
  try {
    const {
        cr_personal_info_id,
        monto,
        tiempo_meses,
        frecuencia_pago,
        cuotas_calculadas,
        destino,
        tipo_garantia,
        tiene_otros_prestamos, // ✅ cambio aquí
        descripcion,
      } = await req.json();
      
      const result = await pool.query(
        `INSERT INTO cr_loan_details (
          cr_personal_info_id, monto, tiempo_meses, frecuencia_pago,
          cuotas_calculadas, destino, tipo_garantia, tiene_otros_prestamos, descripcion
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
        [
          cr_personal_info_id,
          monto,
          tiempo_meses,
          frecuencia_pago,
          cuotas_calculadas,
          destino,
          tipo_garantia,
          tiene_otros_prestamos,
          descripcion,
        ]
      );
      
      
    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('❌ Error en POST /api/loan-details:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
