// app/api/rsvp/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nom, prenom, presence, adultes, enfants, message } = body;

    // Basic validation
    if (!nom || !prenom) {
      return NextResponse.json(
        { error: "Données incomplètes" },
        { status: 400 }
      );
    }

    // Load Supabase service keys
    const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPA_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (SUPA_URL && SUPA_SERVICE) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(SUPA_URL, SUPA_SERVICE);

      const { error } = await supabase.from("reponses_mariage").insert([
        {
          nom,
          prenom,
          presence,
          adultes,
          enfants,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: "Erreur Supabase" }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Mock mode if no credentials
    console.warn("SUPABASE key missing — running in mock mode.");
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
