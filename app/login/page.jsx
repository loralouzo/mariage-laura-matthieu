"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const CODE_SECRET = "LilouZoëGabin"; // 🔐 Ton code unique

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (code.trim() === CODE_SECRET) {
      // 🔓 On autorise l’accès
      sessionStorage.setItem("authorized", "true");

      // Redirection vers le formulaire
      router.push("/rsvp");
    } else {
      setError("❌ Code incorrect. Merci de réessayer.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/floral.png')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md border border-amber-100">

        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          Accès invité
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Merci d’entrer le code reçu avec votre invitation 🌿✨
        </p>

        {error && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            className="input text-center text-lg"
            placeholder="Entrez votre code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            type="submit"
            className="px-8 py-3 bg-amber-600 text-white text-lg rounded-full shadow-md hover:bg-amber-700 transition-all"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
