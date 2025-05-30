import { Bell, UserCircle, AppWindow } from "lucide-react"; // Puedes usar cualquier ícono de Lucide u otro paquete

export default function HeaderSlideClient() {
  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Sección izquierda: Perfil + Bienvenida */}
      <div className="flex items-center gap-3">
        <button className="text-yellow-500 hover:text-yellow-600 transition">
          <UserCircle className="w-8 h-8" />
        </button>
        <span className="text-gray-700 font-semibold text-lg">
          👋 Bienvenido, Juanma
        </span>
      </div>

      {/* Sección derecha: Notificaciones + Logo */}
      <div className="flex items-center gap-4">
        <button className="text-yellow-500 hover:text-yellow-600 transition">
          <Bell className="w-6 h-6" />
        </button>
        <button className="text-yellow-500 hover:text-yellow-600 transition">
          <AppWindow className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
