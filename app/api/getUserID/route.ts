import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/middleware';
import { getID } from '@/app/actions/saveMessages';

export async function POST(req: NextRequest) {
    const { supabase, response } = createClient(req);
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
      }
      
      return NextResponse.json({ userId: user?.id || null });
    } catch (err) {
      console.error('Server error:', err);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }