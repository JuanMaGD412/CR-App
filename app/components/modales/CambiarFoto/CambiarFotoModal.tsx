import React, { useState } from "react";

export default function CambiarFotoVentana({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (newPhoto: File) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">Cambiar Foto de Perfil</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedFile(file);
          }}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
        />

        {selectedFile && (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Previsualización"
            className="w-32 h-32 rounded-full mx-auto mt-4 border"
          />
        )}

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:underline"
          >
            Cancelar
          </button>
          <button
            disabled={!selectedFile}
            onClick={() => selectedFile && onSave(selectedFile)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}
