import React, { useRef, useState, useEffect } from "react";

export function AdditionalData() {
  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const [signOption, setSignOption] = useState("upload"); // 'upload' o 'draw'
  const [signatureImage, setSignatureImage] = useState(null);

  // Canvas refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);

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

  // Handlers para dibujar
  // ... código anterior

// Handlers para dibujar
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
    setSignatureImage(null);
  }

  function saveSignature() {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setSignatureImage(dataUrl);
  }

  return (
    <form className="space-y-4 max-w-xl mx-auto">

      {/* Firma del solicitante */}
      <div>
        <label className={labelClass}>Firma del solicitante</label>

        {/* Opción para elegir */}
        <div className="mb-2 flex space-x-4">
          <label className="inline-flex items-center space-x-1">
            <input
              type="radio"
              name="signOption"
              value="upload"
              checked={signOption === "upload"}
              onChange={() => setSignOption("upload")}
            />
            <span>Subir archivo</span>
          </label>
          <label className="inline-flex items-center space-x-1">
            <input
              type="radio"
              name="signOption"
              value="draw"
              checked={signOption === "draw"}
              onChange={() => setSignOption("draw")}
            />
            <span>Dibujar firma</span>
          </label>
        </div>

        {/* Si sube archivo */}
        {signOption === "upload" && (
          <input
            className={inputClass}
            type="file"
            accept="image/*"
          />
        )}

        {/* Si dibuja firma */}
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
              <button type="button" onClick={clearCanvas} className="px-3 py-1 bg-red-500 text-white rounded">
                Limpiar
              </button>
              <button type="button" onClick={saveSignature} className="px-3 py-1 bg-green-600 text-white rounded">
                Guardar
              </button>
            </div>
            {signatureImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Firma guardada:</p>
                <img
                  src={signatureImage}
                  alt="Firma guardada"
                  className="border border-gray-300 rounded max-w-xs"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subida de cédula */}
      <div>
        <label className={labelClass}>Subida de cédula</label>
        <input className={inputClass} type="file" />
      </div>

      {/* Subida de recibos/soportes */}
      <div>
        <label className={labelClass}>Subida de recibos/soportes</label>
        <input className={inputClass} type="file" multiple />
      </div>

      {/* Checkbox autorización */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="autorizacion"
          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
        />
        <label htmlFor="autorizacion" className="text-sm text-gray-700">
          Autorizo la consulta en centrales de riesgo
        </label>
      </div>
    </form>
  );
}
