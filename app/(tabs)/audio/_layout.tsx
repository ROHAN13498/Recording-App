import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

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
          headerLeft: BackButton,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
