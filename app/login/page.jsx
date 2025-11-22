"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const CORRECT_CODE = "LilouZoëGabin";

    if (code === CORRECT_CODE) {
      sessionStorage.setItem("authorized", code);
      router.push("/"); // redirige vers l’accueil
    } else {
      setError("Code incorrect");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/floral.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          borderRadius: "24px",
          padding: "3rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          border: "1px solid rgba(200,170,120,0.4)",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Connexion Admin
        </h1>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Code admin"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: "100%",
              padding: "0.8rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem 2rem",
              background: "#c89a4a",
              color: "#fff",
              borderRadius: 999,
              fontWeight: 700,
              width: "100%",
            }}
          >
            Valider
          </button>
        </form>
      </div>
    </main>
  );
}
