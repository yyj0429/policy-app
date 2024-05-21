import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardList from '../screens/CardList';
import Chatbot from '../screens/Chatbot';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CardListScreen"
        component={CardList}
        options={{ header: () => null, title: 'AI 챗봇 추천' }}
      />
      <Tab.Screen
        name="ChatbotScreen"
        component={Chatbot}
        options={{ header: () => null, title: '맞춤 정책' }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={Settings}
        options={{ header: () => null, title: '신규 정책' }}
      />
    </Tab.Navigator>
  );
}
