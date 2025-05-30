import HeaderSlideClient from "../../components/headerSlideClient";

export default function HomeClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSlideClient />

      <div className="flex flex-1 flex-col items-center justify-center bg-yellow-100">
        <div className="flex w-[600px] h-[60px] shadow-lg rounded-xl overflow-hidden border-2 border-white">
          {/* Botón izquierdo */}
          <button className="flex-1 bg-yellow-400 text-white font-medium rounded-l-xl border-white hover:bg-yellow-500 transition-all">
            Solicitar crédito
          </button>

          {/* Botón derecho */}
          <button className="flex-1 bg-white text-yellow-500 font-medium rounded-r-xl  border-yellow-400 hover:bg-yellow-50 transition-all">
            Consultar historial de solicitudes y estados de créditos
          </button>
        </div>
      </div>
    </div>
  );
}
