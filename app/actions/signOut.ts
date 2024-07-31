'use server';

import { createClient } from '@/lib/supabaseServer';

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Error signing out: ${error.message}`);
  }

  // Optionally, you can return some data or handle post-sign-out logic here
  return { message: 'Signed out successfully' };
}