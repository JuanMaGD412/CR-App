import { guardarPersonalInfo } from './guardarDatosPersonales';
import { guardarDatosTrabajo } from './guardarDatosTrabajo';

export const enviarDatos = async ({ personal1, personal2, trabajo1, trabajo2 }) => {
  try {
    const datosPersonales = { ...personal1, ...personal2 };

    const resPersonal = await guardarPersonalInfo(datosPersonales);
    if (!resPersonal.success) throw new Error(resPersonal.message);

    const idPersonalInfo = resPersonal.id;

    const datosTrabajo = {
      ...trabajo1,
      ...trabajo2,
      cr_personal_info_id: idPersonalInfo,
      id_usuario: datosPersonales.id_usuario,
    };

    const resTrabajo = await guardarDatosTrabajo(datosTrabajo);
    if (!resTrabajo.success) throw new Error(resTrabajo.message);

    return { success: true };
  } catch (error) {
    console.error('Error en enviarDatos:', error.message);
    return { success: false, message: error.message };
  }
};
