import { NativeBaseProvider, StatusBar } from "native-base";

// Importando as Screens
import { Routes } from './src/routes';
// Importando componentes
import { Loading } from './src/components/Loading';
// Importando os temas customizados
import { THEME } from './src/styles/theme'
// Importando as fontes externas
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {
  // Garantindo que a fonte foi carregada pelo dispositivo
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })


  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        
        {
          // Verificando se as fontes já foram carregadas. Caso seja true = exibir a screen SignIn, caso seja false = carregar o componente de Loading
          fontsLoaded ? <Routes /> : <Loading />
        }  
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
