import { supabaseServer } from "@/lib/supabaseClient";

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "Fichier manquant" }), { status: 400 });
    }

    const { data: fileData, error } = await supabaseServer
      .storage
      .from("galerie") // Nom du bucket
      .upload(`photos/${file.name}`, file.stream(), { upsert: true });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data: fileData }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
