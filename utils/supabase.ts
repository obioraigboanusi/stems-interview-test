import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

let supabase: SupabaseClient;

if (process.env.NODE_ENV === "production") {
  console.log("PROD");
  supabase = createClient(supabaseURL, supabaseKey);
} else {
  console.log("DEV");
  if (!global.prisma) {
    global.supabase = createClient(supabaseURL, supabaseKey);
  }
  supabase = global.supabase;
}

export default supabase;
