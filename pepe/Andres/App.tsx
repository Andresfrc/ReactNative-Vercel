import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from "./componentes/Inicio";
import Tablero from './componentes/Tablero';
import Registro from './componentes/Registro';
import { enableScreens } from 'react-native-screens';

enableScreens()

export type RootStackParamList={
    Inicio:undefined
    Registro: undefined;
    Tablero:undefined
    
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Tablero" component={Tablero} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
