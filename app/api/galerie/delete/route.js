import supabaseServer from "@/lib/supabaseServerClient"; // <-- sans accolades

export const DELETE = async (req) => {
  try {
    const { filename } = await req.json();
    const { error } = await supabaseServer.storage.from("photos").remove([filename]);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: "Suppression réussie !" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
