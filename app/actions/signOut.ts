'use server';

import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
    redirect("/login")

  // Optionally, you can return some data or handle post-sign-out logic here
  
}