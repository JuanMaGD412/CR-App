// app/page.tsx (o donde esté tu componente principal)
"use client";

import React, { useState } from "react";
import LoginComponent from "../app/components/loginComponent";
import InfoComponent from "../app/components/infoComponent";
import RegistroModal from "../app/components/registerModal";

export default function Home() {
  const [showRegistro, setShowRegistro] = useState(false);

  return (
    <div className="flex h-screen relative">
      <LoginComponent onRegisterClick={() => setShowRegistro(true)} />
      <InfoComponent />

      {showRegistro && (
        <RegistroModal onClose={() => setShowRegistro(false)} />
      )}
    </div>
  );
}
