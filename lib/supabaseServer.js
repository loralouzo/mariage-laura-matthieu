// lib/supabaseServer.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ Clé Service Role côté serveur uniquement
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
