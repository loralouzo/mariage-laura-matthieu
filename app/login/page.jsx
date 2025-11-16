"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const correctCode = "LilouZoëGabin"; // 🔐 Code unique

  function verifierCode() {
    if (code.trim() === correctCode) {
      sessionStorage.setItem("authorized", "true");
      router.push("/rsvp?code=" + encodeURIComponent(code));
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf7f2]">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Entrer votre code d'invitation
        </h1>

        <p className="text-gray-600 mb-6">
          Merci d'indiquer le code reçu dans votre invitation 🤎
        </p>

        <input
          type="text"
          className="w-full px-4 py-3 border rounded-xl mb-4"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {/* 🚀 Nouveau bouton identique à celui de l’accueil */}
        <button
          onClick={verifierCode}
          style={{
            display: "inline-block",
            width: "100%",
            padding: "0.8rem 1.5rem",
            background: "#c89a4a",
            color: "#fff",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "background 0.2s ease-in-out",
          }}
          onMouseOver={(e) => (e.target.style.background = "#b38940")}
          onMouseOut={(e) => (e.target.style.background = "#c89a4a")}
        >
          Valider
        </button>

        {error && (
          <p className="text-red-600 mt-4">Code incorrect. Merci de réessayer.</p>
        )}
      </div>
    </div>
  );
}
