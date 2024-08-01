
import { signOut as signOutAction } from '@/app/actions/signOut';
import Link from "next/link";
import { redirect } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    async function handleSignOut() {
        'use server'
        try {
          await signOutAction();
        } catch (error) {
          console.error('Error signing out:', error);
        }
        finally{
            redirect("/")
        }
      }
  return (
    <div className=''>
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center text-white text-xl font-semibold">
              <svg className="h-5 w-5 md:h-8 md:w-8 mr-2 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2C6.47 2 2 6.47 2 12c0 5.53 4.47 10 10 10 5.53 0 10-4.47 10-10 0-5.53-4.47-10-10-10zm4.68 17.36c-.17.37-.52.64-.94.64h-7.48c-.42 0-.77-.27-.94-.64-1.88-4.16-.41-7.28 2.51-9.36 1.95-1.55 4.17-1.8 6.15-.95.83.39 1.44 1.18 1.59 2.09.18.98-.12 1.97-.78 2.71-.6.68-1.47 1.08-2.41 1.08h-2.61c-.55 0-1-.45-1-1s.45-1 1-1h2.6c.51 0 .95-.34 1.1-.83.34-.78.19-1.67-.37-2.31-.6-.68-1.47-1.08-2.41-1.08-1.27 0-2.28 1.01-2.28 2.28s1.01 2.28 2.28 2.28h2.61c1.02 0 1.9-.68 2.19-1.64.18-.5.63-.9 1.17-1.05 1.2-.28 2.21.6 2.21 1.77 0 .97-.75 1.75-1.71 1.86z"/>
              </svg>
              <div className='text-sm md:text-base'>
              RecipeBot
              </div>
            </div>
          </Link>
        </div>
        
        {/* Sign in with GitHub button on the right */}
        <div>
        <form action={handleSignOut}>    
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Sign out
        </button>
        </form>
          
        </div>
      </div>
    </nav>
    {children}
    </div>
  );
}
