import { guardarPersonalInfo } from './guardarDatosPersonales';
import { guardarDatosTrabajo } from './guardarDatosTrabajo';
import { guardarReferencias } from './guardarReferencias';
import { guardarDatosPatrimoniales } from './guardarDatosPatrimoniales';
import { guardarDetallesPrestamo } from './guardarDetallesPrestamo';

function mapearDatosPrestamo(prestamo, cr_personal_info_id) {
  return {
    cr_personal_info_id,
    monto: prestamo.monto,
    tiempo_meses: prestamo.tiempo_meses,
    frecuencia_pago: prestamo.frecuencia_pago,
    cuotas_calculadas: prestamo.cuotas_calculadas,
    destino: prestamo.destino_prestamo,
    tipo_garantia: prestamo.tipo_garantia,
    tiene_otros_prestamos: prestamo.otros_prestamos === 'si',
    descripcion: prestamo.descripcion,
  };
}

export const enviarDatos = async ({
  personal1,
  personal2,
  trabajo1,
  trabajo2,
  referencias,
  patrimoniales,
  adicionales,
  prestamo,
  idUsuario,
}) => {
  try {
    if (!idUsuario) throw new Error("El ID del usuario no está disponible");

    const datosPersonales = {
      ...personal1,
      ...personal2,
      id_usuario: idUsuario,
    };

    const resPersonal = await guardarPersonalInfo(datosPersonales);
    if (!resPersonal.success) throw new Error(resPersonal.message);
    const idPersonalInfo = resPersonal.id;

    const datosTrabajo = {
      ...trabajo1,
      ...trabajo2,
      cr_personal_info_id: idPersonalInfo,
      id_usuario: idUsuario,
    };

    const resTrabajo = await guardarDatosTrabajo(datosTrabajo);
    if (!resTrabajo.success) throw new Error(resTrabajo.message);

    const resReferencias = await guardarReferencias({
      referencias,
      cr_personal_info_id: idPersonalInfo,
    });
    if (!resReferencias.success) throw new Error(resReferencias.message);

    const resPatrimonio = await guardarDatosPatrimoniales({
      ...patrimoniales,
      cr_personal_info_id: idPersonalInfo,
      id_usuario: idUsuario,
    });
    if (!resPatrimonio.success) throw new Error(resPatrimonio.message);

    // 🔴 OMITIMOS envío de archivos adicionales
    /*
    const formData = new FormData();
    formData.append('userId', String(idUsuario));
    formData.append('caseId', String(idPersonalInfo));
    // ... omitir firma, cédula, soportes
    formData.append('autorizacion', adicionales.autorizacion ? 'true' : 'false');

    const resAdicional = await fetch('/api/additional-data', {
      method: 'POST',
      body: formData,
    });

    const resultado = await resAdicional.json();
    if (!resAdicional.ok || !resultado.success) {
      throw new Error(resultado.message || 'Error en datos adicionales');
    }
    */

    const datosPrestamo = mapearDatosPrestamo(prestamo, idPersonalInfo);
    console.log("📤 Enviando a guardarDetallesPrestamo:", datosPrestamo);

    const resPrestamo = await guardarDetallesPrestamo(datosPrestamo);
    if (!resPrestamo.success) throw new Error(resPrestamo.message);

    return { success: true };
  } catch (error) {
    console.error('❌ Error en enviarDatos:', error.message);
    return { success: false, message: error.message };
  }
};
