import '../global.css';
import  {GestureHandlerRootView} from 'react-native-gesture-handler'; 
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { ReactNode } from 'react';
import { ThemeContext, ThemeProvider } from '@react-navigation/native';
import theme from '~/core/theme/use-theme-config';
import { APIProvider } from '~/core/api/api-provider';
import { Toaster } from 'sonner-native';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const Providers = ({children}:{children:ReactNode})=>{
  return (
    <GestureHandlerRootView style={{flex:1}} >
       <APIProvider>

       
      <ThemeProvider value={theme}>
        <BottomSheetModalProvider>
          <ThemeContext.Provider value={theme}>
            {children}
          </ThemeContext.Provider>
        </BottomSheetModalProvider>
      
      </ThemeProvider>
      </APIProvider>


      <Toaster/>
      
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <Providers>

   
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="properties/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />

    </Stack>
    </Providers>
  );
}
