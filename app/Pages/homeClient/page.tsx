"use client";

import { useRouter } from "next/navigation";
import { HeaderSlideClient } from "../../components/uiClient/headerSlideClient";
import { useState } from "react";
export default function HomeClient() {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(
    "¡Bienvenido! Presiona el botón para iniciar tu solicitud de crédito."
  );

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSlideClient />

      <div className="flex flex-1 flex-col items-center justify-center bg-yellow-100 py-10">
        {/* Mensaje interactivo fijo */}
        <div className="mb-4 text-yellow-700 text-lg font-semibold transition-opacity duration-300">
          {mensaje}
        </div>

        {/* Botones para navegar */}
        <div className="flex w-[600px] h-[60px] shadow-lg rounded-xl overflow-hidden border-2 border-white mb-8">
          <button
            onClick={() => router.push("/Pages/formSolicitudPrestamo")}
            onMouseEnter={() =>
              setMensaje("¡Bienvenido! Presiona el botón para iniciar tu solicitud de crédito.")
            }
            className="flex-1 bg-white text-yellow-500 font-medium rounded-l-xl hover:bg-yellow-500 hover:text-white transition-all"
          >
            Solicitar crédito
          </button>

          <button
            onClick={() => router.push("/Pages/creditHistoryTable")}
            onMouseEnter={() =>
              setMensaje("Consulta aquí el estado de tus solicitudes anteriores.")
            }
            className="flex-1 bg-white text-yellow-500 font-medium rounded-r-xl hover:bg-yellow-500 hover:text-white transition-all"
          >
            Consultar historial de solicitudes
          </button>
        </div>
      </div>
    </div>
  );
}
