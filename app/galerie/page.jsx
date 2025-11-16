"use client";

export default function Galerie() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#faf7f2",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontWeight: 700,
          color: "#4a4a4a",
        }}
      >
        Galerie Photos 📸
      </h1>

      <p style={{ color: "#5b5b5b", fontSize: "1.2rem", marginBottom: "2rem" }}>
        Ajoutez vos photos et découvrez celles des autres invités ✨
      </p>

      {/* Ici on ajoutera ensuite :
          - upload de photos
          - mur de photos
      */}
    </main>
  );
}
