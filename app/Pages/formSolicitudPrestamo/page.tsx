'use client'

import { useState } from 'react'
import {HeaderSlideTramites} from "../../components/uiClient/headerSlideClient";
import {PersonalInfo1, PersonalInfo2} from '../../components/FormSolicitudPrestamo/personalInfo';
import {WorkInfo1, WorkInfo2} from '../../components/FormSolicitudPrestamo/workInfo';
import PersonalReferences from '../../components/FormSolicitudPrestamo/PersonalReferences';
import {Assets} from '../../components/FormSolicitudPrestamo/assets';
import {AdditionalData} from '../../components/FormSolicitudPrestamo/additionalData';
import {LoanDetails} from '../../components/FormSolicitudPrestamo/loanDetails';

const steps = [
  'Información Personal 1',
  'Información Personal 2',
  'Datos Laborales 1',
  'Datos Laborales 2',
  'Referencias Personales',
  'Datos Patrimoniales',
  'Otros Datos Complementarios',
  'Datos del Préstamo'
]

export default function LoanApplicationForm() {
  const [step, setStep] = useState(0)

  const next = () => setStep(prev => Math.min(prev + 1, steps.length - 1))
  const prev = () => setStep(prev => Math.max(prev - 1, 0))

  return (
    <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50">
            <HeaderSlideTramites />
        </div>
        
        <div className="flex flex-1 pt-16">
            {/* Panel Izquierdo fijo */}
            <div
                className="w-1/3 h-screen text-white p-10 flex flex-col items-center justify-center"
                style={{ backgroundColor: "#EFBF04", position: "fixed", left: 0, top: 0 }}
            >
                <h2 className="text-3xl font-bold mb-4">Solicitud de préstamo</h2>
                <p className="text-lg">
                Solicitar un préstamo nunca había sido tan fácil. Completa el
                formulario y evaluaremos tu perfil para recomendarte las mejores opciones.
                </p>
            </div>
            {/* Panel Derecho */}
            
            <div className="ml-[33.33%] w-2/3 h-screen  p-10">
            {/*<div className="bg-gray-100 p-8 rounded-xl shadow-md max-w-3xl mx-auto">*/}
              <div className="space-y-4 max-w-xl mx-auto text-gray-500">
                Paso {step + 1} de {steps.length} - <strong>{steps[step]}</strong>
              </div>
              {/* Formulario dinámico */}
              {step === 0 && <PersonalInfo1 />}
              {step === 1 && <PersonalInfo2 />}
              {step === 2 && <WorkInfo1 />}
              {step === 3 && <WorkInfo2 />}
              {step === 4 && <PersonalReferences />}
              {step === 5 && <Assets />}
              {step === 6 && <AdditionalData />}
              {step === 7 && <LoanDetails />}
              <div className="mt-6 flex justify-between items-centerreparado">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={prev}
                  disabled={step === 0}
                >
                  Atrás
                </button>
                <button
  className="px-4 py-2 bg-green-500 text-white rounded"
  onClick={() => {
    if (step === steps.length - 1) {
      alert("Formulario enviado correctamente.");
    } else {
      next();
    }
  }}
>
  {step === steps.length - 1 ? 'Enviar' : 'Siguiente'}
</button>

              </div>
            {/*</div>*/}
          </div>
        </div>
    </div>
  )
}





/*function CreditHistory() {
  return (
    <form className="space-y-4">
      <input className="border p-2 w-full" placeholder="Score crediticio" />
      <input className="border p-2 w-full" placeholder="Historial de pagos" />
      <input className="border p-2 w-full" placeholder="Número de productos de crédito" />
      <input className="border p-2 w-full" placeholder="Tipo de productos" />
      <input className="border p-2 w-full" placeholder="Entidades financieras relacionadas" />
      <input className="border p-2 w-full" placeholder="Consultas recientes de crédito" />
      <input className="border p-2 w-full" placeholder="Cupo disponible vs. utilizado" />
      <input className="border p-2 w-full" placeholder="Reportes positivos/negativos" />
      <input className="border p-2 w-full" placeholder="Reestructuraciones de deuda" />
    </form>
  )
}


function CommercialReferences() {
  return (
    <form className="space-y-4">
      <input className="border p-2 w-full" placeholder="Nombre de contacto o empresa" />
      <input className="border p-2 w-full" placeholder="Teléfono o correo del contacto" />
      <input className="border p-2 w-full" placeholder="Tipo de relación" />
      <input className="border p-2 w-full" placeholder="Tiempo de relación" />
      <input className="border p-2 w-full" placeholder="Concepto financiero sobre el solicitante" />
    </form>
  )
}*/
