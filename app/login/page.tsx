import Image from 'next/image';
import { createClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function LoginForm() {
  const signIn = async () => {
    'use server';

    // 1. Create a Supabase client
    const supabase = createClient();
    const origin = headers().get('origin');
    // 2. Sign in with GitHub
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `https://ragchatbot-defenderwarrior69gmailcoms-projects.vercel.app/auth/callback`,
      },
    });

    if (error) {
      console.log('error',error);
    } else {
      return redirect(data.url);
    }
    // 3. Redirect to landing page
  };

  return (
    <div className=''>
        <div className='flex justify-center mt-10'>ask the bot recipes you want to make. tell the bot what things you do not like or are allergic to so bot can avoid items in the recipe</div>
    <form
      action={signIn}
      className="flex-1 flex min-h-screen justify-center items-center"
    >
      <button className="hover:bg-gray-800 p-8 rounded-xl">
      <Image
          className="mx-auto mb-3"
          src="/github-mark-white.png"
          width={100}
          height={100}
          alt="GitHub logo"
        />
        Sign in with GitHub
      </button>
    </form>
    </div>
  );
}