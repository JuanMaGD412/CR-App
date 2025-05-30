"use client";

import React, { useState } from "react";

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

export default function InfoComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
  );
}
