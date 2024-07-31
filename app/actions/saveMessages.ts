'use server';
import { supabase } from '@/lib/supabaseClient';
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '../../lib/middleware'

export async function getID(request: NextRequest){
    const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id
}

export async function saveUserMessage(userID:string,text:string) {
    
  const { data, error } = await supabase
    .from('chat_history')
    .insert([
      { content:text, role: 'user', timestamp: new Date().toISOString(), user_id:userID }
    ]);

  if (error) {
    console.error('Error saving user message:', error);
  } else {
    console.log('User message saved successfully:', data);
  }
}



export async function saveAssistantMessage(userID:string, text:string ) {
 
  const { data, error } = await supabase
    .from('chat_history')
    .insert([
      { content:text, role: 'assistant', timestamp: new Date().toISOString(),user_id:userID }
    ]);

  if (error) {
    console.error('Error saving assistant message:', error);
  } else {
    console.log('Assistant message saved successfully:', data);
  }
}