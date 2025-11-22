"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Galerie() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const BUCKET = "galerie";

  useEffect(() => {
    const authorized = sessionStorage.getItem("authorized");
    if (!authorized) router.replace("/login");
  }, [router]);

  async function fetchFiles() {
    try {
      const { data, error } = await supabase.storage.from(BUCKET).list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });
      if (error) {
        console.error("List error:", error);
        return;
      }
      const mapped = data.map((item) => {
        const { publicURL } = supabase.storage.from(BUCKET).getPublicUrl(item.name);
        return { name: item.name, url: publicURL, path: item.name };
      });
      setFiles(mapped);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (uploadError) {
        console.error("Upload Error:", uploadError);
        alert("Erreur lors de l'upload");
      } else {
        await fetchFiles();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(path) {
    if (!confirm("Supprimer cette photo ? Cette action est irréversible.")) return;
    setLoading(true);
    try {
      const adminCode = sessionStorage.getItem("authorized");
      const res = await fetch("/api/galerie/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-code": adminCode || "" },
        body: JSON.stringify({ path }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Delete failed:", data);
        alert("Suppression impossible : " + (data?.error || ""));
      } else {
        await fetchFiles();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem",
        backgroundImage: "url('/floral.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          borderRadius: "24px",
          padding: "2rem",
          marginTop: "2rem",
          border: "1px solid rgba(200,170,120,0.4)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "2rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Galerie Photos 📸
        </h1>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Ajoutez vos photos et découvrez celles des autres invités ✨
        </p>

        {/* Boutons d’upload */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          <label
            style={{
              padding: "0.6rem 1rem",
              background: "#fff",
              borderRadius: "12px",
              cursor: "pointer",
              border: "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleUpload} style={{ display: "none" }} />
            Ajouter une photo
          </label>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            style={{
              padding: "0.6rem 1rem",
              background: "#c89a4a",
              color: "#fff",
              borderRadius: 999,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(1.05)";
              if (!loading) e.currentTarget.style.background = "#b38940";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(1)";
              if (!loading) e.currentTarget.style.background = "#c89a4a";
            }}
          >
            {loading ? "Traitement…" : "Sélectionner une photo"}
          </button>
        </div>

        {files.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>Aucune photo pour l'instant</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {files.map((f) => (
              <div
                key={f.path}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <img src={f.url} alt={f.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.3)",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "0.5rem",
                  }}
                  className="hover:opacity-100"
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                  <a
                    href={f.url}
                    download
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Télécharger
                  </a>
                  <button
                    onClick={() => handleDelete(f.path)}
                    style={{
                      background: "#e3342f",
                      color: "#fff",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
