import supabaseServer from "@/lib/supabaseServerClient"; // <-- sans accolades

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    const { error } = await supabaseServer
      .storage
      .from("photos")
      .upload(file.name, file);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify({ message: "Upload réussi !" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
