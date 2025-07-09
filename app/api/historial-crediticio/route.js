import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(req) {
  try {
    const { id_usuario } = await req.json();

    const result = await pool.query(
      `
      SELECT 
        p.id AS solicitud_id,
        p.created_at::date AS fecha,
        l.monto,

        -- Estado de Info Personal
        CASE
          WHEN 
            p.primer_nombre IS NULL OR p.primer_apellido IS NULL OR
            p.numero_documento IS NULL OR p.correo IS NULL OR
            p.telefono IS NULL OR p.direccion_residencia IS NULL
          THEN 'faltante'
          ELSE 'ok'
        END AS info_personal,

        -- Estado de Info Laboral
        CASE 
          WHEN w.id IS NULL THEN 'faltante'
          WHEN 
            w.ocupacion IS NULL OR w.nombre_empresa IS NULL OR
            w.cargo IS NULL OR w.ingresos_mensuales IS NULL OR
            w.tipo_contrato IS NULL
          THEN 'faltante'
          ELSE 'ok'
        END AS info_laboral,

        -- Estado de Referencias
        CASE 
          WHEN r.total = 0 THEN 'faltante'
          WHEN r.total_incompletas > 0 THEN 'faltante'
          ELSE 'ok'
        END AS referencias,

        'en proceso' AS estado_credito -- puedes reemplazar con estado real
      FROM cr_personal_info p
      LEFT JOIN cr_loan_details l ON l.cr_personal_info_id = p.id
      LEFT JOIN cr_work_info w ON w.cr_personal_info_id = p.id
      LEFT JOIN (
        SELECT 
          cr_personal_info_id,
          COUNT(*) AS total,
          COUNT(*) FILTER (
            WHERE 
              nombre IS NULL OR 
              relacion IS NULL OR 
              telefono IS NULL OR 
              direccion IS NULL
          ) AS total_incompletas
        FROM cr_personal_references
        GROUP BY cr_personal_info_id
      ) r ON r.cr_personal_info_id = p.id
      WHERE p.id_usuario = $1
      ORDER BY p.created_at DESC;
      `,
      [id_usuario]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("❌ Error historial:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
