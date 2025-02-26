/*import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    
  });

  return result.toDataStreamResponse();
}
*/

/*
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Asegúrate de que el modelo y los mensajes estén bien formateados
  const result = await generateText({
    model: openai('gpt-4'),  // Usar un nombre de modelo válido
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...messages,  // Asegúrate de que los mensajes enviados sean un arreglo correcto
    ],
  });

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}*/


import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  // ✅ Mensaje de sistema para que el chatbot actúe como juez
  const systemMessage = {
    role: 'system',
    content: 'eres un chat inteligente que me da un resumen sobre quien podria ganar las elecciones 2025 en Ecuador'
     
  };

  // ✅ Asegura que el primer mensaje sea siempre el del juez
  const updatedMessages = [systemMessage, ...messages];

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: updatedMessages,
  });

  return result.toDataStreamResponse();
}


