import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req) {
  try {
    const body = await req.json();
    const adminCode = req.headers.get("x-admin-code");
    const { path } = body;

    const CORRECT_CODE = "LilouZoëGabin";
    if (!adminCode || adminCode !== CORRECT_CODE) return NextResponse.json({ error: "Code invalide" }, { status: 403 });
    if (!path) return NextResponse.json({ error: "Aucun fichier spécifié" }, { status: 400 });

    const { error } = await supabaseServer.storage.from("galerie").remove([path]);
    if (error) return NextResponse.json({ error: "Erreur Supabase lors de la suppression" }, { status: 500 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
