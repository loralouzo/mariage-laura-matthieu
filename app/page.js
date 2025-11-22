"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authorized = sessionStorage.getItem("authorized");
    if (!authorized) {
      router.replace("/login");
    }
  }, [router]);

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
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          border: "1px solid rgba(200,170,120,0.4)",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "2.5rem",
            marginBottom: "1rem",
          }}
        >
          Laura & Matthieu
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          Vous êtes invités à célébrer notre mariage
        </p>

        <Link
          href="/rsvp"
          style={{
            display: "inline-block",
            padding: "0.9rem 2.2rem",
            background: "#c89a4a",
            color: "#fff",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            marginBottom: "1rem",
          }}
        >
          Répondre à l’invitation
        </Link>

        <br />

        <Link
          href="/galerie"
          style={{
            display: "inline-block",
            padding: "0.9rem 2.2rem",
            background: "#c89a4a",
            color: "#fff",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: "1.1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          Galerie photos
        </Link>
      </div>
    </main>
  );
}
