import { View, TextInput, Text, Button, FlatList, Platform, Alert } from 'react-native';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import { generateAPIUrl } from '@/utils/utils';
import BubbleMessage from '@/components/BubbleMessage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabChat() {
  const { messages, error, input, setInput, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: (error) => console.error(error, 'ERROR'),
  });

  // ✅ Función para subir un archivo TXT
  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
        copyToCacheDirectory: true,
      });

      if (file.canceled || !file.assets || file.assets.length === 0) {
        console.log('Selección de archivo cancelada o inválida.');
        return;
      }

      const fileUri = file.assets[0].uri;
      console.log('Archivo seleccionado:', fileUri);

      let fileContent = '';

      if (Platform.OS === 'web') {
        const response = await fetch(fileUri);
        fileContent = await response.text();
      } else {
        fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
      }

      console.log('Contenido del archivo:', fileContent);
      Alert.alert('Contenido del archivo:', fileContent);
      if (!fileContent.trim()) {
        alert('El archivo está vacío.');
        return;
      }

      // ✅ Agrega el contexto de "caso legal" antes de enviarlo
      const caseText = `Entiende el contexto, y dime cual seria el posible ganador entre noboa y luisa y nulo:\n\n${fileContent}`;

      setInput(caseText);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeño delay para actualizar el estado
      handleSubmit();
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };

  if (error) return <Text>{error.message}</Text>;

  return (
    <View className="flex flex-col h-full p-4">
      
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <BubbleMessage message={item.content} type={item.role} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      
      <View className="flex flex-row w-full items-center space-x-2 ">
        <TextInput
          className="flex-1 border p-2 rounded-md"
          placeholder="Escribe un mensaje..."
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={() => handleSubmit()}
          multiline
        />
        <View className="border p-2 content-center bg-blue-400 rounded-md">
        <FontAwesome5 name="folder-open" size={22} color="white" onPress={() => handleFileUpload()} />
        </View>
        <Button title="Enviar" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
}
