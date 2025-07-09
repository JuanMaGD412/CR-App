'use client';
import React, { useState, useEffect } from "react";
import { HeaderSlideTramites } from "../../components/uiClient/headerSlideClient";

type CreditStatus = 'aprobado' | 'rechazado' | 'en proceso';
type InfoStatus = 'ok' | 'inconsistente' | 'faltante';
const itemsPerPage = 10;

interface CreditRequest {
  id: string;
  fecha: string;
  monto: string;
  infoPersonal: InfoStatus;
  infoLaboral: InfoStatus;
  referencias: InfoStatus;
  estadoCredito: CreditStatus;
}

const statusColor = {
  ok: 'text-green-600',
  inconsistente: 'text-yellow-600',
  faltante: 'text-red-600',
  aprobado: 'text-green-700',
  rechazado: 'text-red-700',
  'en proceso': 'text-yellow-700',
};

export default function CreditHistoryTable() {
  const [data, setData] = useState<CreditRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Cargar datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      const usuarioLocal = localStorage.getItem("usuario");
      if (!usuarioLocal) return;

      const { id: id_usuario } = JSON.parse(usuarioLocal);

      try {
        const res = await fetch("/api/historial-crediticio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_usuario }),
        });

        const result = await res.json();
        if (result.success) {
          const formatted = result.data.map((item: any) => ({
            id: item.solicitud_id,
            fecha: item.fecha,
            monto: `$${Number(item.monto).toLocaleString()}`,
            infoPersonal: item.info_personal,
            infoLaboral: item.info_laboral,
            referencias: item.referencias,
            estadoCredito: item.estado_credito,
          }));
          setData(formatted);
        } else {
          console.error("❌ Error al obtener datos:", result.message);
        }
      } catch (error) {
        console.error("❌ Error en fetch:", error);
      }
    };

    fetchData();
  }, []);

  // Paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white flex flex-col items-center">
      <div className="fixed top-0 left-0 right-0 z-50">
        <HeaderSlideTramites />
      </div>

      <div className="mt-32 w-full max-w-6xl px-6">
        <h2 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
          🧾 Historial de solicitudes de crédito
        </h2>

        <div className="overflow-auto rounded-xl shadow-2xl border border-yellow-200 bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-yellow-500 text-white text-base font-semibold">
              <tr>
                <th className="px-6 py-4"># Solicitud</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Monto</th>
                <th className="px-6 py-4">Info Personal</th>
                <th className="px-6 py-4">Info Laboral</th>
                <th className="px-6 py-4">Referencias</th>
                <th className="px-6 py-4">Estado Crédito</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentData.map((solicitud, index) => (
                <tr
                  key={solicitud.id}
                  className={`border-t border-yellow-200 ${
                    index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3 font-medium">{solicitud.id}</td>
                  <td className="px-6 py-3">{solicitud.fecha}</td>
                  <td className="px-6 py-3">{solicitud.monto}</td>
                  <td className={`px-6 py-3 ${statusColor[solicitud.infoPersonal]}`}>
                    {solicitud.infoPersonal}
                  </td>
                  <td className={`px-6 py-3 ${statusColor[solicitud.infoLaboral]}`}>
                    {solicitud.infoLaboral}
                  </td>
                  <td className={`px-6 py-3 ${statusColor[solicitud.referencias]}`}>
                    {solicitud.referencias}
                  </td>
                  <td className={`px-6 py-3 font-semibold ${statusColor[solicitud.estadoCredito]}`}>
                    {solicitud.estadoCredito}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border border-yellow-400 ${
              currentPage === 1
                ? "text-yellow-300 border-yellow-300 cursor-not-allowed"
                : "text-yellow-700 hover:bg-yellow-100"
            }`}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md border border-yellow-400 ${
                page === currentPage
                  ? "bg-yellow-500 text-white"
                  : "text-yellow-700 hover:bg-yellow-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border border-yellow-400 ${
              currentPage === totalPages
                ? "text-yellow-300 border-yellow-300 cursor-not-allowed"
                : "text-yellow-700 hover:bg-yellow-100"
            }`}
          >
            Siguiente
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          * Colores indican el estado de cada sección. Revisa los datos inconsistentes o faltantes para mejorar la probabilidad de aprobación.
        </p>
      </div>
    </div>
  );
}
