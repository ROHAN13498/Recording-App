import BackButton from "@/components/BackButton";
import { router, Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Your Library",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerLeft:()=>{return(<></>)}
        }}
      />
      <Stack.Screen
        name="record"
        options={{
          headerTitle: "Record Audio",
          headerLeft: BackButton,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="preview"
        options={{
          headerTitle: "Preview Audio",
          headerLeft: ()=>{return(<></>)},
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerRight:()=>{return (<AntDesign onPress={()=>router.push("/audio")} name="close" size={24} color="black" />)}
        }}
      />
    </Stack>
  );
};

export default _layout;
