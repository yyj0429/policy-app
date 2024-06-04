import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CardList from '../screens/CardList';
import Chatbot from '../screens/Chatbot';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CardListScreen"
        component={Chatbot}
        options={{
          header: () => null,
          title: 'AI 챗봇 추천',
          tabBarIcon: ({ color }) => {
            return <Icon name="robot" size={16} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="ChatbotScreen"
        component={CardList}
        options={{
          header: () => null,
          title: '맞춤 정책',
          tabBarIcon: ({ color }) => {
            return <Icon name="book-open" size={16} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={Settings}
        options={{
          header: () => null,
          title: '신규 정책',
          tabBarIcon: ({ color }) => {
            return <Icon name="bolt" size={16} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
}
