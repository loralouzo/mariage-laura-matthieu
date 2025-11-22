"use client";
import { useState, useEffect } from "react";

export default function Galerie() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Veuillez choisir un fichier");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/galerie/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.error || data.message);
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
      <form
        onSubmit={handleUpload}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          borderRadius: "24px",
          padding: "3rem",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          border: "1px solid rgba(200,170,120,0.4)",
          display: "grid",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem" }}>
          Galerie photos
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            padding: "0.7rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0.9rem 2.2rem",
            background: "#c89a4a",
            color: "#fff",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          Ajouter la photo
        </button>

        {message && <p style={{ color: message.includes("erreur") ? "red" : "green" }}>{message}</p>}
      </form>
    </main>
  );
}
