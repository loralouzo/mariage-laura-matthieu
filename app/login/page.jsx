"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const CORRECT_CODE = "LilouZoëGabin";
    if (code === CORRECT_CODE) {
      sessionStorage.setItem("authorized", code);
      router.push("/galerie");
    } else {
      setError("Code invalide");
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundImage: "url('/floral.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/85 p-8 rounded-3xl shadow-xl max-w-md w-full text-center backdrop-blur-sm border border-amber-200">
        <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Entrez le code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="p-3 rounded-lg border"
          />
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="bg-amber-500 text-white py-2 rounded-xl hover:scale-105 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
