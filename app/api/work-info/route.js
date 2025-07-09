import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      cr_personal_info_id,
      ocupacion,
      nombre_empresa,
      direccion_laboral,
      telefono_laboral,
      cargo,
      antiguedad_laboral,
      tipo_contrato,
      ingresos_mensuales,
      ingresos_adicionales,
      gastos_mensuales,
      productos_financieros,
      obligaciones_financieras,
      nivel_endeudamiento
    } = data;

    const query = `
      INSERT INTO cr_work_info (
        cr_personal_info_id, ocupacion, nombre_empresa, direccion_laboral,
        telefono_laboral, cargo, antiguedad_laboral, tipo_contrato,
        ingresos_mensuales, ingresos_adicionales, gastos_mensuales,
        productos_financieros, obligaciones_financieras, nivel_endeudamiento,
        created_at, update_at
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12,
        $13, $14,
        NOW(), NOW()
      ) RETURNING id;
    `;

    const values = [
      cr_personal_info_id,
      ocupacion,
      nombre_empresa,
      direccion_laboral,
      telefono_laboral,
      cargo,
      antiguedad_laboral,
      tipo_contrato,
      ingresos_mensuales,
      ingresos_adicionales,
      gastos_mensuales,
      productos_financieros,
      obligaciones_financieras,
      nivel_endeudamiento,
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({ message: 'Datos laborales guardados', id: result.rows[0].id }, { status: 201 });
  } catch (error) {
    console.error('Error al guardar datos laborales:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
