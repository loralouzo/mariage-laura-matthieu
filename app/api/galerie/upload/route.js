import { supabaseServer } from "@/lib/supabaseServerClient";

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get("file");

    const { data: uploadData, error } = await supabaseServer.storage
      .from("ton_bucket") // remplace par le nom de ton bucket
      .upload(`photos/${file.name}`, file);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    const url = supabaseServer.storage.from("ton_bucket").getPublicUrl(uploadData.path).publicUrl;

    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
