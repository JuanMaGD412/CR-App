// app/api/additional-data/route.js
import { NextResponse } from "next/server";
import { enviarAdditionalData } from "@/app/components/storage/enviarAdditionalData";

// Habilita procesamiento dinámico para manejar FormData
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extraer campos
    const userId = formData.get("userId");
    const caseId = formData.get("caseId");
    const autorizacion = formData.get("autorizacion") === "true";

    const firma_file = formData.get("firma_file");
    const firma_drawn = formData.get("firma_drawn");
    const cedula_file = formData.get("cedula_file");
    const soportes_files = formData.getAll("soportes_files");

    // DEBUG: Mostrar entradas recibidas
    console.log("📦 Campos recibidos en FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(`👉 ${key}:`, value);
    }

    // Validación
    if (!userId || !caseId) {
      throw new Error("userId y caseId son requeridos");
    }

    // Lógica de guardado
    const result = await enviarAdditionalData(
      {
        autorizacion,
        firma_file,
        firma_drawn,
        cedula_file,
        soportes_files,
      },
      userId,
      caseId
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error en API additional-data:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
