"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Confirmation() {
  const searchParams = useSearchParams();
  const presence = searchParams.get("presence");
  const isPresent = presence === "oui";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
        backgroundImage: "url('/floral.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          textAlign: "center",
          padding: "2rem 2.5rem",
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "24px",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(200, 170, 120, 0.4)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* TITRE */}
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "2.3rem",
            marginBottom: "1rem",
            color: "#4a4a4a",
          }}
        >
          {isPresent
            ? "Merci pour ta réponse 🤍✨"
            : "Merci d’avoir répondu 💛"}
        </h2>

        {/* MESSAGE */}
        <p
          style={{
            color: "#5b5b5b",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          {isPresent ? (
            <>
              Nous sommes <strong>impatients de célébrer cette journée avec toi</strong> 🤍  
              Le grand jour approche… et nous avons tellement hâte  
              de partager ce beau moment ensemble ✨
            </>
          ) : (
            <>
              Tu ne pourras pas être présent(e), et on le comprend parfaitement 💛  
              Tu vas nous manquer le jour J, mais on sait que tu seras  
              avec nous par la pensée.  
              On t’enverra des nouvelles et quelques beaux souvenirs ✨
            </>
          )}
        </p>

        {/* BOUTON */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.8rem 1.5rem",
            background: "#c89a4a",
            color: "#fff",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
