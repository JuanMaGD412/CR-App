import { supabase } from "@/app/lib/supabaseClient";

export const enviarAdditionalData = async (data, userId, caseId) => {
  try {
    if (!userId || !caseId) throw new Error("userId y caseId son requeridos");

    const folderPath = `${userId}/${caseId}`;

    const firmaUrl = await subirArchivo(data.firma_file || data.firma_drawn, folderPath, "firma.png");
    const cedulaUrl = await subirArchivo(data.cedula_file, folderPath, "cedula.png");

    const soportesUrls = [];
    if (data.soportes_files && Array.isArray(data.soportes_files)) {
      for (let i = 0; i < data.soportes_files.length; i++) {
        const soporte = data.soportes_files[i];
        const soporteUrl = await subirArchivo(soporte, folderPath, `soporte_${i + 1}.png`);
        soportesUrls.push(soporteUrl);
      }
    }

    // Inserta los datos en la tabla cr_additional_data
    const { data: insertData, error: insertError } = await supabase
      .from("cr_additional_data")
      .insert([{
        cr_personal_info_id: caseId,
        firma_url: firmaUrl,
        cedula_url: cedulaUrl,
        soportes_urls: soportesUrls,
        autorizacion: data.autorizacion || false,
      }])
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);

    return { success: true, data: insertData };
  } catch (err) {
    console.error("Error en enviarAdditionalData:", err.message);
    return { success: false, message: err.message };
  }
};

// Función auxiliar para subir archivo o dataURL al bucket
async function subirArchivo(fileOrDataUrl, path, filename) {
  const bucket = "cr-additional-data";
  const filePath = `${path}/${filename}`;
  let file;

  if (typeof fileOrDataUrl === "string" && fileOrDataUrl.startsWith("data:image/")) {
    // Convertir base64 a Blob SIN usar fetch
    const [metadata, base64Data] = fileOrDataUrl.split(",");
    const mimeMatch = metadata.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: mimeType });

    file = new File([blob], filename, { type: mimeType });
  } else if (fileOrDataUrl instanceof File) {
    file = fileOrDataUrl;
  } else {
    return null;
  }

  const { error: uploadError } = await supabase
    .storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrlData } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
