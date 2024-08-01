'use client';
import { useEffect,useState } from 'react';
import { useChat } from 'ai/react';
import { signOut as signOutAction } from '@/app/actions/signOut';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import Link from 'next/link';
interface ChatMessage {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string; // Use Date if you are working with Date objects
    tool_invocations: any; // Replace 'any' with a more specific type if available
  }
export default function Chat() {
    
    const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });
  async function handleSignOut() {
    try {
      const response= await signOutAction();
        redirect("/login")
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  useEffect(() => {
    
    const fetchChatHistory = async () => {
    const response = await fetch('/api/getUserID', { method: 'POST' });
        
    const userData = await response.json();
    const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userData.userId) // Filter by user_id
    .order('timestamp', { ascending: true });
  
      if (error) {
        console.error('Error fetching chat history:', error);
      } else {
        console.log('Fetched chat history:', data); // Log the data
        if (data) {
          setInitialMessages(data as ChatMessage[]); // Set messages only if data is valid
        }
      }
    };
  
    fetchChatHistory();
  }, [supabase]);
  const allMessages = [...initialMessages, ...messages];
  return (
    <div className="flex flex-col w-full  mx-auto h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
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
            
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
          
        </div>
      </div>
    </nav>

      {/* Chat Messages */}
      <div className="flex overflow-auto mx-auto p-4">
        <div className="space-y-4">
          {allMessages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>
                  {m.content.length > 0 ? (
                    m.content
                  ) : (
                    <span className="italic font-light mt-20 bg-orange-700">
                      {'calling tool: '}
                    </span>
                  )}
                </p>
              </div>
              
            </div>
            
          ))}
          <div className='h-5 '> </div>
        </div>
        
      </div>

      {/* Message Input */}
      <div className='flex justify-center px-10'>
      <form onSubmit={handleSubmit} className=" bottom-0 w-full   p-2 mb-8 border border-gray-300 rounded shadow-xl bg-white">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
      </div>
      
    </div>
  );
}