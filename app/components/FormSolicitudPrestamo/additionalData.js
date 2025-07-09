'use client';

import { useRef, useEffect } from "react";

export function AdditionalData({ data, setData }) {
  const inputClass = "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);

  const signOption = data.signOption || "upload";

  useEffect(() => {
    if (signOption === "draw" && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 400;
      canvas.height = 150;
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctxRef.current = ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [signOption]);

  function getCursorPosition(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function startDrawing(e) {
    drawing.current = true;
    const { x, y } = getCursorPosition(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  }

  function draw(e) {
    if (!drawing.current) return;
    const { x, y } = getCursorPosition(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  }

  function stopDrawing() {
    drawing.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setData((prev) => ({ ...prev, firma_drawn: null }));
  }

  function saveSignature() {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setData((prev) => ({ ...prev, firma_drawn: dataUrl }));
  }

  return (
    <form className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className={labelClass}>Firma del solicitante</label>
        <div className="mb-2 flex space-x-4">
          <label className="inline-flex items-center space-x-1">
            <input type="radio" name="signOption" value="upload" checked={signOption === "upload"} onChange={() => setData(prev => ({ ...prev, signOption: "upload" }))} />
            <span>Subir archivo</span>
          </label>
          <label className="inline-flex items-center space-x-1">
            <input type="radio" name="signOption" value="draw" checked={signOption === "draw"} onChange={() => setData(prev => ({ ...prev, signOption: "draw" }))} />
            <span>Dibujar firma</span>
          </label>
        </div>
        {signOption === "upload" && (
          <input
            type="file"
            className={inputClass}
            accept="image/*"
            onChange={(e) => setData((prev) => ({ ...prev, firma_file: e.target.files?.[0] }))}
          />
        )}
        {signOption === "draw" && (
          <div className="border border-gray-300 rounded p-2">
            <canvas
              ref={canvasRef}
              className="border border-gray-400 rounded w-full"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
            <div className="flex space-x-2 mt-2">
              <button type="button" onClick={clearCanvas} className="px-3 py-1 bg-red-500 text-white rounded">Limpiar</button>
              <button type="button" onClick={saveSignature} className="px-3 py-1 bg-green-600 text-white rounded">Guardar</button>
            </div>
            {data.firma_drawn && <img src={data.firma_drawn} alt="Firma guardada" className="mt-2 max-w-xs border" />}
          </div>
        )}
      </div>

      <div>
  <label className={labelClass}>Subida de cédula</label>
  <input
    className={inputClass}
    type="file"
    onChange={(e) =>
      setData(prev => ({ ...prev, cedula_file: e.target.files?.[0] }))
    }
  />
  {data.cedula_file && (
    <p className="text-sm text-green-700 mt-1">
      Archivo cargado: {data.cedula_file.name}
    </p>
  )}
</div>


<div>
  <label className={labelClass}>Subida de recibos/soportes</label>
  <input
    className={inputClass}
    type="file"
    multiple
    onChange={(e) =>
      setData(prev => ({
        ...prev,
        soportes_files: Array.from(e.target.files || []),
      }))
    }
  />
  {data.soportes_files && data.soportes_files.length > 0 && (
    <ul className="text-sm text-green-700 mt-1 list-disc list-inside">
      {data.soportes_files.map((file, i) => (
        <li key={i}>{file.name}</li>
      ))}
    </ul>
  )}
</div>


      <div className="flex items-center space-x-2">
      <input
  type="checkbox"
  id="autorizacion"
  checked={!!data.autorizacion}
  onChange={(e) => setData(prev => ({ ...prev, autorizacion: e.target.checked }))}
/>
<label htmlFor="autorizacion" className="text-sm text-gray-700">Autorizo la consulta en centrales de riesgo</label>
      </div>
    </form>
  );
}
