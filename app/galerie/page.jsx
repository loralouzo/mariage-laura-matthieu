"use client";
import { useEffect, useState } from "react";
import supabaseServer from "@/lib/supabaseServerClient"; // <-- clé service role

export default function Galerie() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabaseServer
          .storage
          .from("galerie") // le nom de ton bucket
          .list("", { limit: 100, offset: 0 });

        if (error) throw error;

        // Créer les URLs publiques pour chaque photo
        const urls = data.map((file) =>
          supabaseServer.storage.from("galerie").getPublicUrl(file.name).publicUrl
        );

        setPhotos(urls);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
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
          padding: "2rem",
          maxWidth: "900px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          border: "1px solid rgba(200,170,120,0.4)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", marginBottom: "1rem" }}>
          Galerie photos
        </h1>

        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
        {loading ? (
          <p>Chargement des photos...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Photo ${i + 1}`}
                style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
