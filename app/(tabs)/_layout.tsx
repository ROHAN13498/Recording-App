import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#00439C' }}>
      <Tabs.Screen
        name="audio"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="musical-note-outline" size={30} color={color} />,
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="files/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Feather name="upload" size={30} color={color} />,
          headerShown:false
        }}
      />
      <Tabs.Screen name="audio/record" options={{href:null}}/>
    </Tabs>
  );
}
