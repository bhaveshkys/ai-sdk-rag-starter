import { openai } from '@ai-sdk/openai';
import { createResource } from '@/lib/actions/resources';
import { convertToCoreMessages, streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';
import { saveAssistantMessage, saveUserMessage,getID } from '@/app/actions/saveMessages';
import { NextRequest, NextResponse } from 'next/server';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const userID=await getID(req)
  
  const { messages } = await req.json();
  const lastUserMessage = [...messages].reverse().find(message => message.role === 'user');

  if (lastUserMessage) {
    // Save the last user message
    await saveUserMessage(userID as string,lastUserMessage.content);
  }
  console.log([...messages].reverse().find(message => message.role === 'user'))
  const result = await streamText({
    model: openai('gpt-4o'),
    system: `You are a helpful assistant. You Just cooking recipes acccording to the users input. check your knowledge base if user has told any items he's allergic to or dont want
     and dont include does items in your recipes`,
    messages: convertToCoreMessages(messages),
    tools: {
        addResource: tool({
          description: `add a resource to your knowledge base.
            If the user provides information about food or items they dont like or are allergic to , use this tool without asking for confirmation.`,
          parameters: z.object({
            content: z
              .string()
              .describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => createResource({ content }),
        }),
        getInformation: tool({
            description: `get information from your knowledge base to view what items user is allergic to or dont like. if user asks for a recipe then use this tool without asking for confirmation.`,
            parameters: z.object({
              question: z.string().describe('the users question'),
            }),
            execute: async ({ question }) => findRelevantContent(question),
          }),
      },
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        
        await saveAssistantMessage(userID as string, text);

      },
  });

  return result.toAIStreamResponse();
}