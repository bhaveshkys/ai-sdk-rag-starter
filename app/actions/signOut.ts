'use server';

import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export async function signOut() {
  const supabase = createClient();
  try{
  await supabase.auth.signOut();

  }catch(error){
    console.log(error)
  }
  finally{
    redirect("/")
  }

  // Optionally, you can return some data or handle post-sign-out logic here
  
}