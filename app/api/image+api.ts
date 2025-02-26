import dotenv from 'dotenv';
import OpenAI from 'openai';

// Cargar variables de entorno desde .env
dotenv.config();

// Configurar la API Key de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Usar la API Key desde .env
});

export async function POST(req: Request) {
  const { prompt } = await req.json(); // Recibir el prompt desde el frontend

  try {
    // Generar una imagen con DALL-E
    const response = await openai.images.generate({
      model: 'dall-e-3', // Usar DALL-E 3
      prompt: prompt, // El prompt que describe la imagen
      size: '1024x1024', // Tamaño de la imagen
      quality: 'standard', // Calidad de la imagen
      n: 1, // Número de imágenes a generar
    });

    // Obtener la URL de la imagen generada
    const imageUrl = response.data[0].url;

    // Devolver la URL de la imagen como JSON
    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al generar la imagen:', error);

    // Devolver un mensaje de error como JSON
    return new Response(JSON.stringify({ error: 'Error al generar la imagen' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}