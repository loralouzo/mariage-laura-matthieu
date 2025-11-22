"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient"; // <-- sans accolades

export default function Galerie() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.from("photos").select("*");
      if (error) console.error(error);
      else setPhotos(data);
    };
    fetchPhotos();
  }, []);

  return (
    <div>
      {/* ton code JSX pour afficher les photos et le style */}
    </div>
  );
}
