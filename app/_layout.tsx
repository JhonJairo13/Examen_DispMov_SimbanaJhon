/*import { View, Text, StatusBar,   } from 'react-native'
import React  from 'react'
import { Slot, Stack} from 'expo-router'
// Import your global CSS file
import "../global.css";
import 'core-js/actual/structured-clone';

const RootLayout = () => {
  return (
    <View className='flex-auto' >
      <StatusBar barStyle={'dark-content'}/>
      <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
      </Stack>
    </View>
  )
}

export default RootLayout*/
import { View, Text, StatusBar } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // Importa expo-splash-screen
import "../global.css";
import 'core-js/actual/structured-clone';

// Evita que el Splash Screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simula una carga (por ejemplo, cargar fuentes, hacer llamadas API, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos
      } catch (e) {
        console.warn(e);
      } finally {
        // Indica que la aplicación está lista
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Oculta el Splash Screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Muestra el Splash Screen mientras la aplicación se carga
  }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView} // Llama a onLayoutRootView cuando el layout esté listo
    >
      <StatusBar barStyle={'dark-content'} />
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default RootLayout;