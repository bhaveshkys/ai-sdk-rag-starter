'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { supabase } from '@/lib/supabaseClient';
import { generateEmbeddings } from '../ai/embedding';
import { embeddings as embeddingsTable } from '../db/schema/embeddings';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    const { data: resource, error: insertError } = await supabase
    .from('resources')
    .insert([{ content }])
    .select()
    .single();

    if (insertError) {
      console.log(insertError.message)
      throw new Error(insertError.message);
    }

    const embeddings = await generateEmbeddings(content);
    const { error: embeddingsError } = await supabase
      .from('embeddings')
      .insert(
        embeddings.map(embedding => ({
          resource_id: resource.id,
          ...embedding,
        })),
      );

      if (embeddingsError) {
        console.log(embeddingsError.message)
        throw new Error(embeddingsError.message);
      }
    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};