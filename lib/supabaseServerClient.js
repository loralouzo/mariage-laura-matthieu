// lib/supabaseServerClient.js
import { createClient } from "@supabase/supabase-js";

// Clé service role pour les actions serveur (upload, delete, etc.)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment variables");
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);
