"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Galerie() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Charger les photos existantes
  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase.storage.from("galerie").list("photos");
      if (error) {
        console.error("Erreur récupération photos:", error.message);
      } else {
        const urls = await Promise.all(
          data.map(async (item) => {
            const { publicUrl } = supabase.storage.from("galerie").getPublicUrl(`photos/${item.name}`);
            return publicUrl;
          })
        );
        setPhotos(urls);
      }
    }
    fetchPhotos();
  }, []);

  // Upload du fichier
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/galerie/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (result.error) {
      alert("Erreur upload: " + result.error);
    } else {
      alert("Upload réussi !");
      setPhotos((prev) => [...prev, supabase.storage.from("galerie").getPublicUrl(`photos/${file.name}`).publicUrl]);
    }
    setFile(null);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Galerie photos</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} disabled={loading || !file}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {photos.map((url, idx) => (
          <img key={idx} src={url} alt={`Photo ${idx}`} style={{ width: "200px", borderRadius: "8px" }} />
        ))}
      </div>
    </div>
  );
}
