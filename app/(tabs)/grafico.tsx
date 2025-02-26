import { View, TextInput, Text, Button, FlatList, Platform, Alert, Image, ActivityIndicator } from 'react-native';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/utils';
import BubbleMessage from '@/components/BubbleMessage';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from 'react';

export default function Tabimage() {
  const { messages, error, input, setInput, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/image'),
    onError: (error) => console.error(error, 'ERROR'),
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para almacenar la URL de la imagen
  const [isGenerating, setIsGenerating] = useState(false); // Estado para indicar si se está generando la imagen

  const handleGenerateImage = async () => {
    setIsGenerating(true); // Comenzar a generar la imagen
    try {
      // Enviar el prompt al backend para generar una imagen
      const response = await fetch(generateAPIUrl('/api/image'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Error al generar la imagen');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl); // Guardar la URL de la imagen generada
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo generar la imagen');
    } finally {
      setIsGenerating(false); // Finalizar la generación de la imagen
    }
  };

  return (
    <View className="flex flex-col h-full p-4">
      
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <BubbleMessage message={item.content} type={item.role} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      
      {imageUrl && (
        <View className="mt-4">
          <Image
            source={{ uri: imageUrl }}
            style={{ width: '100%', height: 300, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>
      )}

     
      <View className="flex flex-row w-full items-center space-x-2 mt-4">
        <TextInput
          className="flex-1 border p-2 rounded-md"
          placeholder="Describe la imagen que deseas generar..."
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={handleGenerateImage}
          multiline
        />
        {isGenerating ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button title="Generar" onPress={handleGenerateImage} />
        )}
      </View>
    </View>
  );
}

