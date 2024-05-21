import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Auth from './src/navigations/Auth';

function App(): React.JSX.Element {
  // TODO: Use Root.tsx
  // TODO: Think about using navigation.replace when you're using `Root.tsx`
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}

export default App;
