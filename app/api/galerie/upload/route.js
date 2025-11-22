import supabaseServer from "@/lib/supabaseServerClient";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(
        JSON.stringify({ error: "Aucun fichier fourni" }),
        { status: 400 }
      );
    }

    const fileName = file.name;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseServer
      .storage
      .from("galerie") // nom exact du bucket
      .upload(fileName, fileBuffer, { cacheControl: "3600", upsert: false });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Upload réussi !" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
