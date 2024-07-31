'use client';
import { useEffect,useState } from 'react';
import { useChat } from 'ai/react';
import { signOut as signOutAction } from '@/app/actions/signOut';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
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
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">recipe bot</div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

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
        </div>
      </div>

      {/* Message Input */}
      <div className='flex justify-center'>
      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md  p-2 mb-8 border border-gray-300 rounded shadow-xl bg-white">
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