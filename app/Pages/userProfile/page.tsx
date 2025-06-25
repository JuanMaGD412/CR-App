"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import EditarPerfilModal from "../../components/modales/EditPerfil/EditarPerfilModal";
import CambiarFotoVentana from "../../components/modales/CambiarFoto/CambiarFotoModal";
import { HeaderSlideProfile } from "../../components/uiClient/headerSlideClient";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-white/60 p-3 rounded-lg shadow-sm border border-gray-200">
      <span className="text-gray-500 font-medium text-sm">{label}</span>
      <span className="text-gray-800 text-base">{value || "—"}</span>
    </div>
  );
}

export default function UserProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const usuarioLocal = localStorage.getItem("usuario");
      if (!usuarioLocal) return;

      const { id } = JSON.parse(usuarioLocal);

      try {
        const res = await fetch(`/api/usuario/${id}`);
        if (!res.ok) throw new Error("Error al obtener datos del usuario");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error al cargar el perfil:", err);
      }
    };

    fetchUserData(); 
  }, []);

  const handleSave = (newData: any) => {
    setUser((prev: any) => ({ ...prev, ...newData }));
    setOpenModal(false);
  };

  const handlePhotoSave = (newPhoto: File) => {
    const nuevaUrl = URL.createObjectURL(newPhoto);
    setUser((prev: any) => ({ ...prev, foto: nuevaUrl }));
    setOpenPhotoModal(false);
  };

  if (!user) {
    return <div className="p-10 text-center">Cargando perfil...</div>;
  }

  return (
    <>
      <HeaderSlideProfile />

      <div className="flex justify-center items-start py-10 px-4 bg-yellow-100 min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl space-y-6 border border-yellow-200">
          {/* Encabezado con imagen */}
          <div className="flex items-center space-x-6">
            <Image
              src={user.foto || "/perfil_demo.jpg"}
              alt="Foto de perfil"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-500 shadow-md object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.nombres} {user.apellidos}
              </h2>
              <p className="text-sm text-yellow-600 font-medium">Usuario registrado</p>
            </div>
          </div>

          {/* Información personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Tipo de documento" value={user.tipo_documento} />
            <InfoItem label="Número de documento" value={user.numero_documento} />
            <InfoItem label="Fecha de nacimiento" value={user.fecha_nacimiento} />
            <InfoItem label="Género" value={user.genero} />
            <InfoItem label="Correo electrónico" value={user.correo} />
            <InfoItem label="Teléfono" value={user.telefono} />
            <InfoItem label="Ciudad" value={user.ciudad} />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
            >
              <Pencil className="w-4 h-4" />
              Editar perfil
            </button>
            <button
              onClick={() => setOpenPhotoModal(true)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
            >
              Cambiar mi foto
            </button>
          </div>
        </div>
      </div>

      {/* Modal editar perfil */}
      {openModal && (
        <EditarPerfilModal
          user={user}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}

      {/* Ventana cambiar foto */}
      {openPhotoModal && (
        <CambiarFotoVentana
          onClose={() => setOpenPhotoModal(false)}
          onSave={handlePhotoSave}
        />
      )}
    </>
  );
}
