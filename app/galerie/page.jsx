"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function Galerie() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("photos") // ton table ou bucket
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setPhotos(data);
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h1>Galerie photos</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt="photo" width={200} />
        ))}
      </div>
    </div>
  );
}
