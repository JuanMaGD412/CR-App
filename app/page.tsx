"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      question: "¿Quiénes somos?",
      answer: "Somos una entidad dedicada a facilitar el acceso al crédito...",
    },
    {
      question: "¿Cómo pedir su crédito?",
      answer:
        "Solo necesitas registrarte, subir tus documentos y esperar aprobación.",
    },
    {
      question: "¿Cómo contactarnos?",
      answer:
        "Puedes escribirnos a contacto@credito.com o llamarnos al 300 123 4567.",
    },
    {
      question: "¿Cómo va su crédito?",
      answer:
        "Inicia sesión y consulta el estado de tu solicitud en tiempo real.",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Login (lado izquierdo) */}
      <div
        className="w-1/3 flex flex-col justify-between text-white p-10 relative"
        style={{ backgroundColor: "#EFBF04" }}
      >
        {/* Iconos en la esquina superior derecha */}
        <div className="absolute top-4 right-4 flex space-x-4 text-white">
          <a href="#" title="Facebook">
            <FaFacebookF className="text-xl hover:scale-110 transition" />
          </a>
          <a href="#" title="Instagram">
            <FaInstagram className="text-xl hover:scale-110 transition" />
          </a>
          <a href="#" title="Twitter">
            <FaTwitter className="text-xl hover:scale-110 transition" />
          </a>
          <a href="#" title="LinkedIn">
            <FaLinkedinIn className="text-xl hover:scale-110 transition" />
          </a>
        </div>

        {/* Contenido principal del login */}
        <div className="w-full max-w-md mx-auto mt-20">
          <h1 className="text-3xl font-bold mb-6">Bienvenido</h1>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-white text-green-600 font-semibold p-2 rounded"
            >
              Iniciar sesión
            </button>
            <p className="text-sm mt-2 underline cursor-pointer">
              ¿Olvidaste tu contraseña?
            </p>
          </form>
        </div>

        {/* Espacio opcional inferior */}
        <div></div>
      </div>

      {/* Info (lado derecho) */}
      <div className="w-2/3 bg-white flex flex-col justify-center p-12 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full text-left text-xl font-semibold py-4 flex justify-between items-center hover:text-yellow-600 transition"
              onClick={() => toggle(index)}
            >
              {item.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="text-gray-700 pb-4 pl-2 pr-6">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
