import { Bell, UserCircle, AppWindow, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {UserMenu} from "./userMenu";
import {UserMenuSlideTramites} from "./userMenu";

export function HeaderSlideClient() {
  const [usuario, setUsuario] = useState<{ nombres: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <UserMenu />
        <span className="text-gray-700 font-semibold text-lg">
          👋 Bienvenido{usuario ? `, ${usuario.nombres}` : ""}
        </span>
      </div>

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

export function HeaderSlideTramites() {
  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Sección izquierda: Home */}
      <div className="flex items-center gap-3">
        <Link href="/Pages/homeClient" className="text-yellow-500 hover:text-yellow-600 transition">
          <Home className="w-8 h-8" />
        </Link>
      </div>

      {/* Sección derecha: Notificaciones + Menú Usuario */}
      <div className="flex items-center gap-4">
        <button className="text-yellow-500 hover:text-yellow-600 transition">
          <Bell className="w-6 h-6" />
        </button>
        <UserMenuSlideTramites />
      </div>
    </div>
  );
}