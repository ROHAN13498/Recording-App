import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#00439C' }}>
      <Tabs.Screen
        name="audio"
        options={{
          title:"",
          headerShown:false,
          tabBarIcon: ({ color }) => <Ionicons name="musical-note-outline" size={30} color={color} />
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title:"",
          headerShown:false,
          tabBarIcon: ({ color }) => <Feather name="upload" size={30} color={color} />,
        }}
      />
      <Tabs.Screen name="audio/record" options={{href:null}}/>
    </Tabs>
  );
}
