"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Galerie() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const BUCKET = "galerie";

  useEffect(() => {
    const authorized = sessionStorage.getItem("authorized");
    if (!authorized) router.push("/login");
  }, [router]);

  async function fetchFiles() {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

      if (error) return console.error(error);

      const mapped = data.map((item) => {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(item.name);
        return { name: item.name, url: urlData.publicUrl, path: item.name };
      });

      setFiles(mapped);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { fetchFiles(); }, []);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (uploadError) alert("Erreur lors de l'upload");
      else await fetchFiles();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(path) {
    if (!confirm("Supprimer cette photo ?")) return;
    setLoading(true);
    try {
      const adminCode = sessionStorage.getItem("authorized");
      const res = await fetch("/api/galerie/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-code": adminCode || "" },
        body: JSON.stringify({ path }),
      });
      const data = await res.json();
      if (!res.ok) alert("Suppression impossible : " + (data?.error || ""));
      else await fetchFiles();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center text-center p-8"
      style={{
        backgroundImage: "url('/floral.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="backdrop-blur-sm bg-white/85 p-6 rounded-3xl shadow-xl max-w-5xl w-full mt-8 border border-amber-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Galerie Photos 📸</h1>
        <p className="text-gray-600 mb-6">Ajoutez vos photos et découvrez celles des autres invités ✨</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <label className="px-4 py-2 bg-white rounded-lg shadow-sm border cursor-pointer">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <span className="text-sm font-medium">Ajouter une photo</span>
          </label>

          <button
            className="px-6 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white rounded-2xl shadow-lg hover:scale-105 transition"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
          >
            {loading ? "Traitement..." : "Sélectionner une photo"}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.length === 0 && <div className="col-span-full text-gray-500">Aucune photo pour l'instant</div>}
          {files.map((f) => (
            <div key={f.path} className="relative group rounded-lg overflow-hidden shadow-md">
              <img src={f.url} alt={f.name} className="object-cover w-full h-48" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-2">
                <a href={f.url} download className="bg-white/90 text-sm px-2 py-1 rounded-md mr-2">Télécharger</a>
                <button className="bg-red-600 text-white text-sm px-2 py-1 rounded-md" onClick={() => handleDelete(f.path)}>Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
