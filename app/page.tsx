"use client";

import React, { useState } from "react";
import LoginComponent from "./components/initialPage/loginComponent";
import InfoComponent from "./components/initialPage/infoComponent";
import RegistroModal from "./components/initialPage/registerModal";

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
