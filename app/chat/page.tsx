'use client';
import { Suspense, useEffect,useState } from 'react';
import { useChat } from 'ai/react';
import { signOut as signOutAction } from '@/app/actions/signOut';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LoadingSkeleton from './LoadingSkeleton';
interface ChatMessage {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string; // Use Date if you are working with Date objects
    tool_invocations: any; // Replace 'any' with a more specific type if available
  }
export default function Chat() {
    
    const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);
    const [isloading, setLoading] = useState<boolean>(true);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });
  
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
          setLoading(false)
        }
      }
    };
  
    fetchChatHistory();
  }, [supabase]);
  const allMessages = [...initialMessages, ...messages];
  if(isloading){
    return(
      <LoadingSkeleton/>
    )
  }
  return (
    <div className="flex flex-col w-full  mx-auto ">
      {/* Chat Messages */}
      
      <div className="overflow-auto mx-auto p-4">
      <div className="ml-60 mr-60 space-y-4">
  {allMessages.map(m => (
    <div
      key={m.id}
      className={`whitespace-pre-wrap ${m.role === 'assistant' ? 'text-left' : 'text-right'} flex justify-${m.role === 'assistant' ? 'start' : 'end'}`}
    >
      <div
        className={`p-2 rounded ${m.role === 'assistant' ? 'bg-gray-300' : 'bg-blue-300'}`}
      >
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
  <div className='h-5'></div>
</div>
        
      </div>

      {/* Message Input */}
      <div className='flex justify-center pb-10  '>
      <form onSubmit={handleSubmit} className="  fixed z-50 bottom-0 w-full   p-2  border border-gray-300 rounded shadow-xl bg-white">
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