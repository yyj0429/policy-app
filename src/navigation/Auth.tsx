import { createStackNavigator } from '@react-navigation/stack';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Tabs from './Tabs';

const Stack = createStackNavigator();

export default function Auth() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(auth => {
      if (auth && !auth.isAnonymous && auth.email) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabsScreen' }],
        });
      }
    });

    return subscriber;
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="TabsScreen"
        component={Tabs}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
