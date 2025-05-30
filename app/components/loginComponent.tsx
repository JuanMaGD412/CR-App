"use client";
import { useRouter } from 'next/navigation'; // 👈 ¡Corrección aquí!
import homeClient from "../Pages/homeClient/page";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function LoginComponent({ onRegisterClick }: { onRegisterClick: () => void }) {
  const router = useRouter(); // 👈 Aquí inicializas el router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías validar el login más adelante
    // Si todo va bien, navega:
    router.push("../Pages/homeClient"); // 👈 Cambia esto por la ruta a tu nueva pantalla
  };

  return (
    <div
      className="w-1/3 flex flex-col justify-between text-white p-10 relative"
      style={{ backgroundColor: "#EFBF04" }}
    >
      {/* Iconos */}
      <div className="absolute top-4 right-4 flex space-x-4 text-white">
        <a href="#"><FaFacebookF className="text-xl hover:scale-110 transition" /></a>
        <a href="#"><FaInstagram className="text-xl hover:scale-110 transition" /></a>
        <a href="#"><FaTwitter className="text-xl hover:scale-110 transition" /></a>
        <a href="#"><FaLinkedinIn className="text-xl hover:scale-110 transition" /></a>
      </div>

      {/* Formulario de login */}
      <div className="w-full max-w-md mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-6">Bienvenido</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" className="w-full p-2 rounded bg-white text-black border border-gray-300"/>
          <input type="password" placeholder="Contraseña" className="w-full p-2 rounded bg-white text-black border border-gray-300"/>
          <button
            type="submit"
            className="w-full bg-white text-green-600 font-semibold p-2 rounded"
          >
            Iniciar sesión
          </button>
          <p className="text-sm mt-2 underline cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
          <p className="text-sm mt-1 text-center underline cursor-pointer" onClick={onRegisterClick}>
            ¿Aún no estás registrado?
          </p>
        </form>
      </div>

      <div></div>
    </div>
  );
}
