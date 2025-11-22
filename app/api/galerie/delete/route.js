import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();
    const adminCode = req.headers.get("x-admin-code"); // vient du navigateur
    const { path } = body;

    // ❗ Le même code que pour l’invitation
    const CORRECT_CODE = "LilouZoëGabin";

    if (!adminCode || adminCode !== CORRECT_CODE) {
      return NextResponse.json(
        { error: "Code invalide — suppression refusée" },
        { status: 403 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: "Aucun fichier spécifié" },
        { status: 400 }
      );
    }

    // ⚙️ Connexion Supabase côté serveur
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY // clé privée sécurisée
    );

    // 🗑️ Suppression du fichier dans le bucket
    const { error } = await supabase.storage
      .from("galerie")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { error: "Erreur Supabase lors de la suppression" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
